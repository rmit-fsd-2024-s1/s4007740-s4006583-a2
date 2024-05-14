import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Post } from './entity/post';
import { User } from './entity/user';

export const AppDataSource = new DataSource({
	type: 'mysql',
	host: 'rmit.australiaeast.cloudapp.azure.com',
	port: 5432,
	username: 's4006583_fsd_a2',
	password: 'GreenFrog2005!',
	database: 'SOIL_a2',
	synchronize: true,
	logging: true,
	entities: [Post, User],
	subscribers: [],
	migrations: [],
});

// module.exports = {
// 	HOST: 'rmit.australiaeast.cloudapp.azure.com',
// 	USER: 's4006583_fsd_a2',
// 	PASSWORD: 'GreenFrog2005!',
// 	DB: 'SOIL_a2',
// 	DIALECT: 'mysql',
// };
