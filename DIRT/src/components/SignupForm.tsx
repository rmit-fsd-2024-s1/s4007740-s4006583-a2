import { CSSProperties, useState } from 'react';
import '../styles/LoginForm.css';
import CloseButton from './CloseButton';
import Popup from './Popup';
import {
	loginUser,
	addUser,
	initUsers,
	testEmail,
	testPassword,
} from '../data/repository';

interface Props {
	onExitClick?: () => void;
	visible?: boolean;
}

export default function SignUpForm({
	onExitClick = () => {},
	visible = false,
}: Props) {
	const [fields, setFields] = useState({
		name: '',
		username: '',
		password: '',
	});

	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);

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

	const handleSubmit = (event) => {
		event.preventDefault();

		initUsers();

		if (!testEmail(fields.username)) {
			setEmailError('Enter valid email address');
			setPasswordError(null);
			return;
		}

		if (!testPassword(fields.password)) {
			setPasswordError(
				'Ensure password contains 8 characters, lowercase, uppercase, and numerical value'
			);
			setEmailError(null);
			return;
		}

		addUser(fields.name, crypto.randomUUID(), fields.username, fields.password);

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
				<h1>SIGNUP</h1>
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
					{emailError && (
						<p
							className="error"
							style={{ color: 'red' }}
						>
							{emailError}
						</p>
					)}
					<input
						type="text"
						className="Username"
						name="username"
						value={fields.username}
						onChange={handleInputChange}
						placeholder="Email"
					/>
					<p>PASSWORD</p>
					{passwordError && (
						<p
							className="error"
							style={{ color: 'red' }}
						>
							{passwordError}
						</p>
					)}
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
						value="SIGNUP"
						onClick={handleSubmit}
					></input>
				</div>
			</div>
		</Popup>
	);
}
