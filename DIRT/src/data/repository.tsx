import { useEffect } from 'react';

const USER_KEY = 'user';
const CART_KEY = 'cart';

function initCart() {
	if (localStorage.getItem(CART_KEY) !== null) return;
	setCart([]);
}

function getCart() {
	const data = localStorage.getItem(CART_KEY);

	if (data !== null) return JSON.parse(data);
}

function setCart(
	cart: {
		item_name: string;
		item_desc: string;
		cost: number;
		category: string;
		quantity: number;
	}[]
) {
	localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCartItem(name: string) {
	const newCart = getCart();
	for (const cartItem of newCart) {
		if (cartItem.item_name == name) {
			return newCart.indexOf(cartItem);
		}
	}
	return -1;
}

function setCartItemQuantity(cartItem: {
	item_name: string;
	item_desc: string;
	cost: number;
	category: string;
	quantity: number;
}) {
	if (getCartItem(cartItem.item_name) !== -1) {
		const newCart = getCart();
		newCart[getCartItem(cartItem.item_name)] = {
			item_name: cartItem.item_name,
			item_desc: cartItem.item_desc,
			cost: cartItem.cost,
			category: cartItem.category,
			quantity: cartItem.quantity,
		};
		setCart(newCart);
	}
}

function addCartItem(
	newName: string,
	newDesc: string,
	newCost: number,
	newCategory: string
) {
	// Will add a user to the array for users in localStorage
	if (localStorage.getItem(CART_KEY) !== null) {
		if (getCartItem(newName) === -1) {
			const cart = [
				{
					item_name: newName,
					item_desc: newDesc,
					cost: newCost,
					category: newCategory,
					quantity: 1,
				},
			].concat(getCart());
			setCart(cart);
			return true;
		} else {
			setCartItemQuantity({
				item_name: newName,
				item_desc: newDesc,
				cost: newCost,
				category: newCategory,
				quantity: 1 + getCart()[getCartItem(newName)].quantity,
			});
		}
	}
	return false;
}

function removeCartItem(name: string) {
	if (getCartItem(name) !== -1) {
		const newCart = getCart();
		newCart.splice(getCartItem(name), 1);
		setCart(newCart);
	}
}

export const isCartEmpty = () => {
	const cart = JSON.parse(localStorage.getItem('cart') || '[]');
	return cart.length === 0;
};

function getUniqueItemCount() {
	const cart = getCart();
	if (!cart) return 0;

	const uniqueItems = new Set(
		cart.map((item: { item_name: any }) => item.item_name)
	);
	return uniqueItems.size;
}

function getTotalPrice(): number {
	const cart = getCart();
	if (!cart) return 0;

	let totalPrice = 0;

	for (const item of cart) {
		totalPrice += item.cost * item.quantity;
	}

	return totalPrice;
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

function checkUserExists(username: string): boolean {
	// Verify the given user exists in the array for users in the localStorage
	const users = getUsers();
	for (const user of users) {
		if (username === user.username) {
			return true;
		}
	}

	return false;
}

function loginUser(username: string, password: string): boolean {
	// Logs in the user
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
	loginUser,
	removeUser,
	getUser,
	checkUserExists,
	testEmail,
	testPassword,
	initCart,
	addCartItem,
	setCartItemQuantity,
	getCartItem,
	removeCartItem,
	getCart,
	getUniqueItemCount,
	getTotalPrice,
};
