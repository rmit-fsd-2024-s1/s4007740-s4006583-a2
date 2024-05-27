import { CSSProperties, useEffect, useState } from 'react';
import '../styles/LoginForm.css';
import CloseButton from './CloseButton';
import Popup from './Popup';
import { testEmail, testPassword, getUser } from '../data/repository';
import UserDataService from '../data/UserService';

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
		confirmPassword: '',
	});

	const handleInputChange = (event) => {
		const name: 'username' | 'password' | 'confirmPassword' = event.target.name;
		const value = event.target.value;

		const temp = {
			name: fields.name,
			username: fields.username,
			password: fields.password,
			confirmPassword: fields.confirmPassword,
		};

		temp[name] = value;
		setFields(temp);
	};
	{
		/*Allows submission only when requirements are met*/
	}
	const handleSubmit = (event) => {
		event.preventDefault();

		if (!testEmail(fields.username)) {
			return;
		}

		if (!testPassword(fields.password)) {
			return;
		}

		if (fields.password != fields.confirmPassword) {
			return;
		}

		async function editUserDetails() {
			const userInfo = getUser();
			if (userInfo !== null) {
				console.log(userInfo);
				let user = await UserDataService.getUserFromUUID(userInfo);
				if (user !== null) {
					user = await UserDataService.upsert({
						uuid: userInfo,
						name: fields.name,
						email: fields.username,
						password: fields.password,
					});
				} else {
					return;
				}
			} else {
				return;
			}
		}

		editUserDetails();

		// location.reload();
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
					<p>CONFIRM PASSWORD</p>
					<input
						type="password"
						name="confirmPassword"
						className="Password"
						value={fields.confirmPassword}
						onChange={handleInputChange}
						placeholder="Confirm Password"
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
