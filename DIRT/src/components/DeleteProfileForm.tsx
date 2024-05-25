import { CSSProperties } from 'react';
import Popup from './Popup';
import '../styles/LoginForm.css';
import CloseButton from './CloseButton';
import { getUser, removeUser } from '../data/repository';

interface Props {
	onExitClick?: () => void;
	visible?: boolean;
}

export default function DeleteProfileForm({
	onExitClick = () => {},
	visible = false,
}: Props) {
	const handleSubmit = () => {
		const uuid = getUser();
		if (uuid !== null) {
			removeUser();
			window.location.assign('/');
		}
	};

	const style: CSSProperties = {
		visibility: visible ? 'visible' : 'hidden',
		opacity: visible ? 1.0 : 0.0,
	};
	return (
		<Popup style={style}>
			<div className="LoginForm">
				<CloseButton onClick={onExitClick} />
				<div className="delete-form-container">
					<div>
						<h1>Delete User</h1>
						<h2>Are you sure?</h2>
						<h4>This cannot be undone!!!</h4>
					</div>
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
			</div>
		</Popup>
	);
}
