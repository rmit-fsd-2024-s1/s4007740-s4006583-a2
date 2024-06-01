import axios from 'axios';
import { setUser } from './repository';

const API_HOST = 'http://localhost:4000';

async function getAll() {
	const response = await axios.get(API_HOST + '/api/users');

	return response.data;
}

async function getUserFromUUID(uuid: string) {
	const response = await axios.get(API_HOST + '/api/users/selectUUID/' + uuid);

	return response.data;
}

async function getUserFromEmail(email: string) {
	const response = await axios.get(
		API_HOST + '/api/users/selectEmail/' + email
	);

	return response.data;
}

async function create(user: {
	uuid: string;
	name: string;
	email: string;
	password: string;
}) {
	const response = await axios.post(API_HOST + '/api/users/create', user);

	return response.data;
}

async function upsert(user: {
	uuid: string;
	name: string;
	email: string;
	password: string;
}) {
	const response = await axios.post(API_HOST + '/api/users/upsert', user);

	return response.data;
}

async function updateCart(user: { uuid: string; cart: string }) {
	const response = await axios.post(API_HOST + '/api/users/updateCart', user);

	return response.data;
}

async function findOrCreate(user: {
	uuid: string;
	name: string;
	email: string;
	password: string;
}) {
	const response = await axios.post(API_HOST + '/api/users/findOrCreate', user);

	return response.data;
}

async function login(email: string, password: string) {
	const response = await axios.get(API_HOST + '/api/users/login', {
		params: { email, password },
	});

	const user = response.data;

	if (user !== null) {
		setUser(user.uuid);
	}

	return user;
}

async function destroy(user: { uuid: string }) {
	const response = await axios.post(API_HOST + '/api/users/destroy', user);

	return response.data;
}

async function verify(uuid: string, password: string) {
	const response = await axios.get(API_HOST + '/api/users/verify', {
		params: { uuid, password },
	});

	return response.data;
}

export default {
	create,
	upsert,
	updateCart,
	findOrCreate,
	login,
	getAll,
	getUserFromUUID,
	getUserFromEmail,
	destroy,
	verify,
};
