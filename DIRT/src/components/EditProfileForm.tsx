import { CSSProperties, useState } from 'react';
import '../styles/LoginForm.css';
import CloseButton from './CloseButton';
import Popup from './Popup';
import {
	loginUser,
	initUsers,
	testEmail,
	testPassword,
	editUser,
	getUser,
} from '../data/repository';

interface Props {
	onExitClick?: () => void;
	visible?: boolean;
}

export default function EditProfileForm({
	onExitClick = () => {},
	visible = false,
}: Props) {
	{
		/*Components of user information*/
	}
	const [fields, setFields] = useState({
		name: '',
		username: '',
		password: '',
	});

	const handleInputChange = (event) => {
		const name: 'username' | 'password' = event.target.name;
		const value = event.target.value;

		const temp = {
			name: fields.name,
			username: fields.username,
			password: fields.password,
		};

		temp[name] = value;
		setFields(temp);
	};
	{
		/*Allows submission only when requirements are met*/
	}
	const handleSubmit = (event) => {
		event.preventDefault();

		initUsers();

		const uuid = getUser() !== null ? getUser() : '';
		if (uuid !== null) {
			editUser(fields.name, uuid, fields.username, fields.password);
		}

		if (!testEmail(fields.username)) {
			return;
		}

		if (!testPassword(fields.password)) {
			return;
		}

		const verified = loginUser(fields.username, fields.password);

		if (verified) {
			setFields({ name: '', username: '', password: '' });
		}

		location.reload();
	};

	const style: CSSProperties = {
		visibility: visible ? 'visible' : 'hidden',
		opacity: visible ? 1.0 : 0.0,
	};

	return (
		<Popup style={style}>
			<div className="LoginForm">
				<CloseButton onClick={onExitClick} />
				<h1>EDIT USER</h1>
				<div>
					<p>NAME</p>
					<input
						type="text"
						className="Username"
						name="name"
						value={fields.name}
						onChange={handleInputChange}
						placeholder="Name"
					/>
					<p>EMAIL</p>
					<input
						type="text"
						className="Username"
						name="username"
						value={fields.username}
						onChange={handleInputChange}
						placeholder="Email"
					/>
					<p>PASSWORD</p>
					<input
						type="password"
						name="password"
						className="Password"
						value={fields.password}
						onChange={handleInputChange}
						placeholder="Password"
					/>
					<br />
					<br />
					<input
						type="submit"
						className="Submit"
						value="CONFIRM"
						onClick={handleSubmit}
					></input>
				</div>
			</div>
		</Popup>
	);
}
