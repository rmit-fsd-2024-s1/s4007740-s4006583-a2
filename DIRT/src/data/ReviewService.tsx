import axios from 'axios';

const API_HOST = 'http://localhost:4000';

async function create(review: {
	description: string;
	rating: number;
	date: string;
	userUuid: string;
	itemId: string;
}) {
	const response = await axios.post(API_HOST + '/api/reviews/create', review);

	return response.data;
}

async function getByUUID(uuid: string) {
	const response = await axios.get(
		API_HOST + '/api/reviews/selectUUID/' + uuid
	);

	return response.data;
}

async function getByItemId(itemId: string) {
	const response = await axios.get(
		API_HOST + '/api/reviews/selectItemId/' + itemId
	);

	return response.data;
}

async function destroy(review: { uuid: string }) {
	const response = await axios.post(API_HOST + '/api/reviews/destroy', review);

	return response.data;
}

export default {
	create,
	getByUUID,
	getByItemId,
	destroy,
};
