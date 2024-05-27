import { CSSProperties, useEffect, useState } from 'react';
import '../styles/LoginForm.css';
import UserDataService from '../data/UserService';
import CloseButton from './CloseButton';
import Popup from './Popup';
import { testEmail, testPassword } from '../data/repository';

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
		confirmPassword: '',
	});

	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);

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

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!testEmail(fields.username)) {
			setEmailError('Enter valid email address');
			setPasswordError(null);
			return;
		} else {
			setEmailError(null);
			setPasswordError(null);
		}

		if (!testPassword(fields.password)) {
			setPasswordError(
				'Ensure password contains 8 characters, lowercase, uppercase, and numerical value'
			);
			setEmailError(null);
			return;
		} else {
			setEmailError(null);
			setPasswordError(null);
		}

		if (fields.password != fields.confirmPassword) {
			setPasswordError('Passwords do not match');
			setEmailError(null);
			return;
		} else {
			setEmailError(null);
			setPasswordError(null);
		}
		async function userCreated() {
			let user = await UserDataService.findOrCreate({
				uuid: crypto.randomUUID(),
				name: fields.name,
				password: fields.password,
				email: fields.username,
			}).catch((e) => {
				console.log(e);
			});

			if (user === null) {
				setEmailError('This email is already in use');
				setPasswordError(null);
				return;
			}

			user = await UserDataService.login(
				fields.username,
				fields.password
			).catch((e) => {
				console.log(e);
			});

			if (user !== null) {
				location.reload();
			}
		}

		userCreated();
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
						<p className="error" style={{ color: 'red' }}>
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
						<p className="error" style={{ color: 'red' }}>
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
						value="SIGNUP"
						onClick={handleSubmit}
					></input>
				</div>
			</div>
		</Popup>
	);
}
