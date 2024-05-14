import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

@Entity()
export class Post {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column('text')
	text: string;

	@ManyToMany((type) => User)
	@JoinTable()
	categories: User[];
}
