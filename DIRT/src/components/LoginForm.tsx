import { CSSProperties, useState } from 'react';
import '../styles/LoginForm.css';
import CloseButton from './CloseButton';
import Popup from './Popup';
import UserDataService from '../data/UserService';

interface Props {
	onExitClick?: () => void;
	visible?: boolean;
}

export default function LoginForm({
	onExitClick = () => {},
	visible = false,
}: Props) {
	const [fields, setFields] = useState({ username: '', password: '' });

	const handleInputChange = (event) => {
		const name: 'username' | 'password' = event.target.name;
		const value = event.target.value;

		const temp = { username: fields.username, password: fields.password };

		temp[name] = value;
		setFields(temp);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		async function loginUser() {
			const user = await UserDataService.login(
				fields.username,
				fields.password
			).catch((e) => {
				console.log(e);
			});

			if (user !== null) {
				location.reload();
			} else {
				alert('Username or password are incorrect!');
			}
		}

		loginUser();
	};

	const style: CSSProperties = {
		visibility: visible ? 'visible' : 'hidden',
		opacity: visible ? 1.0 : 0.0,
	};

	return (
		<Popup style={style}>
			<div className="LoginForm">
				<CloseButton onClick={onExitClick} />
				<h1>LOGIN</h1>
				<div>
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
						value="LOGIN"
						onClick={handleSubmit}
					></input>
				</div>
			</div>
		</Popup>
	);
}
