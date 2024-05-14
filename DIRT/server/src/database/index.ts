import { Post } from './entity/post';
import { User } from './entity/user';
import { AppDataSource } from './config';

AppDataSource.initialize()
	.then(async () => {
		const category1 = new User();
		category1.name = 'TypeScript';
		await AppDataSource.manager.save(category1);

		const category2 = new User();
		category2.name = 'Programming';
		await AppDataSource.manager.save(category2);

		const post = new Post();
		post.title = 'TypeScript';
		post.text = `TypeScript is Awesome!`;
		post.categories = [category1, category2];

		await AppDataSource.manager.save(post);

		console.log('Post has been saved: ', post);
	})
	.catch((error) => console.log('Error: ', error));
