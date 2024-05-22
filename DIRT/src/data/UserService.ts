import http from '../http-common';

const create = (data: any) => {
	return http.post('/users', data);
};

const upsert = (data: any) => {
	return http.post('/users', data);
};

export default {
	create,
	upsert,
};
