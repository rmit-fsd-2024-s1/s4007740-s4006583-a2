import axios from 'axios';

const API_HOST = 'http://localhost:4000';

async function create(order: { uuid: string; order: string }) {
	const response = await axios.post(API_HOST + '/api/orders/create', order);

	return response.data;
}

async function getByUUID(uuid: string) {
	const response = await axios.get(API_HOST + '/api/orders/selectUUID/' + uuid);

	return response.data;
}

async function destroy(order: { uuid: string }) {
	const response = await axios.post(API_HOST + '/api/orders/destroy', order);

	return response.data;
}

export default {
	create,
	getByUUID,
	destroy,
};
