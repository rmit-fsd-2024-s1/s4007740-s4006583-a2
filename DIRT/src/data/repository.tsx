const USERS_KEY = 'users';
const USER_KEY = 'user';
const CART_KEY = 'cart';
const SPECIALS_KEY = 'specials';

// Username is email

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

function initUsers() {
	// Will initialize the array for users in localStorage
	if (localStorage.getItem(USERS_KEY) !== null) return;
	setUsers([]);
}

function getUsers() {
	// Will retrieve users from localStorage
	const data = localStorage.getItem(USERS_KEY);

	if (data !== null) return JSON.parse(data);
}

function setUsers(
	// Will set the array for users in localStorage
	users: { name: string; uuid: string; username: string; password: string }[]
) {
	localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function addUser(
	newName: string,
	newUuid: string,
	newUsername: string,
	newPassword: string
) {
	// Will add a user to the array for users in localStorage
	if (localStorage.getItem(USERS_KEY) !== null) {
		if (checkUserExists(newUsername) === false) {
			const today = new Date();
			const dd = String(today.getDate()).padStart(2, '0'); // Day (padded with leading zero if needed)
			const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month (January is 0, so we add 1)
			const yyyy = today.getFullYear(); // Year
			const users = [
				{
					name: newName,
					uuid: newUuid,
					username: newUsername,
					password: newPassword,
					dateJoined: dd + '/' + mm + '/' + yyyy,
				},
			].concat(getUsers());
			setUsers(users);
		}
	}
}

function editUser(
	newName: string,
	uuid: string,
	newUsername: string,
	newPassword: string
) {
	// Will edit a users information
	if (localStorage.getItem(USERS_KEY) !== null) {
		if (findUserData(uuid) !== null && checkUserExists(newUsername) === false) {
			const users = [
				{
					name: newName,
					uuid: uuid,
					username: newUsername,
					password: newPassword,
					dateJoined: findUserData(uuid).dateJoined,
				},
			];
			for (const user of getUsers()) {
				if (user.uuid !== uuid) {
					users.push(user);
				}
			}
			setUsers(users);
		}
	}
}

function deleteUser(uuid: string) {
	if (findUserData(uuid) !== null) {
		const users: {
			name: string;
			uuid: string;
			username: string;
			password: string;
		}[] = [];
		for (const user of getUsers()) {
			if (user.uuid !== uuid) {
				users.push(user);
			}
		}
		setUsers(users);
	}
}

function setUser(uuid: string) {
	// Sets the current user
	localStorage.setItem(USER_KEY, uuid);
}

function getUser(): string | null {
	// Gets the current user
	return localStorage.getItem(USER_KEY);
}

function findUserData(uuid = '', username = '') {
	// Searches for a user
	const users = getUsers();
	for (const user of users) {
		if (user.uuid === uuid || user.username === username) {
			return user;
		}
	}
	return null;
}

function removeUser() {
	// Removes the current user
	localStorage.removeItem(USER_KEY);
}

function verifyUser(username: string, password: string): boolean {
	// Verifies the login information
	const users = getUsers();
	for (const user of users) {
		if (username === user.username && password === user.password) {
			return true;
		}
	}

	return false;
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
	if (verifyUser(username, password)) {
		setUser(findUserData('', username).uuid);
		return true;
	}

	return false;
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
	initUsers,
	verifyUser,
	loginUser,
	addUser,
	editUser,
	deleteUser,
	removeUser,
	getUser,
	findUserData,
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
