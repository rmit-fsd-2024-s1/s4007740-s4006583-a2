import axios from 'axios';

const API_HOST = 'http://localhost:4000';

async function getAll() {
	const response = await axios.get(API_HOST + '/api/items');

	return response.data;
}

async function getOne(id: string) {
	const response = await axios.get(API_HOST + '/api/items/' + id);

	return response.data;
}

// async function create(review: {
// 	id: string;
// 	desc: string;
// 	rating: number;
// 	date: string;
// 	userUuid: string;
// 	itemId: string;
// }) {
// 	const response = await axios.post(API_HOST + '/api/review/create', review);

// 	return response.data;
// }

export default {
	getAll,
	getOne,
};
