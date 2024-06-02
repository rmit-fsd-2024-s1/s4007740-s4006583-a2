import axios from 'axios';

const API_HOST = 'http://localhost:4000';

async function create(following: { followerId: string; followeeId: string }) {
	const response = await axios.post(
		API_HOST + '/api/following/create',
		following
	);

	return response.data;
}

async function deleteFollowRelationship(follwing: {
	followerId: string;
	followeeId: string;
}) {
	const response = await axios.post(
		API_HOST + '/api/following/deleteFollowRelationship',
		follwing
	);

	return response.data;
}

async function isFollowing(followerId: string, followeeId: string) {
	const response = await axios.get(
		`${API_HOST}/api/following/status/${followerId}/${followeeId}`
	);
	return response.data.isFollowing;
}

export default {
	create,
	deleteFollowRelationship,
	isFollowing,
};
