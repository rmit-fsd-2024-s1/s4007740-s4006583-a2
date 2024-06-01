import { CSSProperties, useState } from 'react';
import Popup from './Popup';
import '../styles/LoginForm.css';
import CloseButton from './CloseButton';
import { getUser } from '../data/repository';
import UserDataService from '../data/UserService';
import ReviewDataService from '../data/ReviewService';
import OrderDataService from '../data/OrderService';

interface Props {
	onExitClick?: () => void;
	visible?: boolean;
}

export default function DeleteProfileForm({
	onExitClick = () => {},
	visible = false,
}: Props) {
	const [fields, setFields] = useState({
		password: '',
		confirmPassword: '',
	});

	const handleInputChange = (event) => {
		const name: 'password' | 'confirmPassword' = event.target.name;
		const value = event.target.value;

		const temp = {
			password: fields.password,
			confirmPassword: fields.confirmPassword,
		};

		temp[name] = value;
		setFields(temp);
	};

	const handleSubmit = () => {
		async function deleteUser() {
			const userInfo = getUser();
			if (userInfo !== null) {
				const user = await UserDataService.getUserFromUUID(userInfo);
				if (fields.password === fields.confirmPassword && user !== null) {
					const verify = await UserDataService.verify(
						user.uuid,
						fields.password
					);
					if (verify !== null) {
						const orderReturn = await OrderDataService.destroy({
							uuid: user.uuid,
						});
						if (orderReturn !== null) {
							const reviewReturn = await ReviewDataService.destroy({
								uuid: user.uuid,
							});
							if (reviewReturn !== null) {
								const userReturn = await UserDataService.destroy({
									uuid: user.uuid,
								});
							}
						}
					}
					location.assign('/');
				}
			}
		}
		deleteUser();
	};

	const style: CSSProperties = {
		visibility: visible ? 'visible' : 'hidden',
		opacity: visible ? 1.0 : 0.0,
	};
	return (
		<Popup style={style}>
			<div className="LoginForm">
				<CloseButton onClick={onExitClick} />
				<div>
					<h1>Delete User</h1>
					<h2>Are you sure?</h2>
					<h4>This cannot be undone!!!</h4>
				</div>
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
				<div className="confirmation-buttons">
					<button
						style={{
							borderTopLeftRadius: '5px',
							borderBottomLeftRadius: '5px',
						}}
						onClick={handleSubmit}
					>
						Yes
					</button>
					<button
						style={{
							borderTopRightRadius: '5px',
							borderBottomRightRadius: '5px',
						}}
						onClick={onExitClick}
					>
						No
					</button>
				</div>
			</div>
		</Popup>
	);
}
