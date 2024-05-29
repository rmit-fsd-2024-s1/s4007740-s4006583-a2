import { useEffect } from 'react';

const USER_KEY = 'user';

function readAndGetOrder(orderString: string) {
	const orderCode = orderString.split(';');
	const order = [];
	for (const orderItem of orderCode) {
		let readingID = true;
		let itemID = '';
		let itemQuantity = '';
		for (let i = 0; i < orderItem.length; i++) {
			if (orderItem[i] === '$') {
				readingID = false;
			} else if (orderItem[i] !== '@' && readingID) {
				itemID += orderItem[i];
			} else if (orderItem[i] !== '@' && !readingID) {
				itemQuantity += orderItem[i];
			}
		}
		order.push({ id: itemID, quantity: itemQuantity });
	}

	return order;
}

function editOrder(orderString: string, itemID: string, itemQuantity: string) {
	const order = orderString === null ? [] : readAndGetOrder(orderString);
	const newOrder = [];
	let found = false;
	for (const item of order) {
		if (item.id === itemID) {
			itemQuantity === ''
				? newOrder.push({ id: itemID, quantity: 1 + Number(item.quantity) })
				: Number(itemQuantity) + Number(item.quantity) <= 0 ||
				  itemQuantity === 'remove'
				? null
				: newOrder.push({
						id: itemID,
						quantity: Number(itemQuantity) + Number(item.quantity),
				  });
			found = true;
		} else {
			newOrder.push({ id: item.id, quantity: item.quantity });
		}
	}
	if (!found) {
		itemQuantity === ''
			? newOrder.push({ id: itemID, quantity: 1 })
			: newOrder.push({ id: itemID, quantity: itemQuantity });
	}

	let newOrderDetails = '';

	for (const item of newOrder) {
		if (item.id !== '') {
			newOrderDetails += '@' + item.id + '$' + item.quantity + ';';
		}
	}

	return newOrderDetails;
}

function setUser(uuid: string) {
	// Sets the current user
	localStorage.setItem(USER_KEY, uuid);
}

function getUser(): string | null {
	// Gets the current user
	return localStorage.getItem(USER_KEY);
}

function removeUser() {
	// Removes the current user
	localStorage.removeItem(USER_KEY);
}

function testEmail(username: string): boolean {
	// Checks the given username is an email (username must be an email)
	const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

	return expression.test(username);
}

function hasNumbers(password: string) {
	for (const c of password) {
		if (c >= '0' && c <= '9') {
			return true;
		}
	}
	return false;
}

function hasLower(password: string) {
	for (const c of password) {
		if (c === c.toLowerCase()) {
			return true;
		}
	}
	return false;
}

function hasUpper(password: string) {
	for (const c of password) {
		if (c === c.toUpperCase()) {
			return true;
		}
	}
	return false;
}

function testPassword(password: string): boolean {
	// Checks the password is strong
	let passwordStrong = true;

	if (password.length < 8) {
		passwordStrong = false;
	}
	if (!(hasLower(password) && hasUpper(password) && hasNumbers(password))) {
		passwordStrong = false;
	}
	return passwordStrong;
}

export {
	removeUser,
	setUser,
	getUser,
	testEmail,
	testPassword,
	readAndGetOrder,
	editOrder,
};
