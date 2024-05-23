import axios from 'axios';

const API_HOST = 'http://localhost:4000';

async function getAll() {
	const response = await axios.get(API_HOST + '/api/users');

	return response.data;
}

async function getUserFromUUID(uuid: string) {
	const response = await axios.get(API_HOST + '/api/users/select/' + uuid);

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

export default {
	create,
	getAll,
	getUserFromUUID,
};
