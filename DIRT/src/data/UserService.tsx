import axios from 'axios';

const API_HOST = 'http://localhost:4000';

async function create(user: any) {
	const response = await axios.post(API_HOST + '/api/users/create', user);

	return response.data;
}

export default {
	create,
};
