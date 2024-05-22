import axios from 'axios';

const API_HOST = 'http://localhost:4000';

async function getAll() {
	const response = await axios.get(API_HOST + '/api/items');

	return response.data;
}

export default {
	getAll,
};
