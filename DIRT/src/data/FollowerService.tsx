import axios from 'axios';

const API_HOST = 'http://localhost:4000';

async function create(following: { followerId: string; followeeId: string }) {
	const response = await axios.post(
		API_HOST + '/api/following/create',
		following
	);

	return response.data;
}

export default {
	create,
};
