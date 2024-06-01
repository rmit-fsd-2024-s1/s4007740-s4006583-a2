import { HorizontalCenter, ScreenCenter } from './Center';
import '../styles/ProfilePage.css';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
	children?: ReactNode;
	FocusPage?: 'My Profile' | 'Order History' | 'Custom Diets';
}

{
	/*Order history and diet plan not yet implemented*/
}

export default function ProfilePage({
	children = <div></div>,
	FocusPage = 'My Profile',
}: Props) {
	return (
		<>
			<div className="background-img">
				<img src="/egg-basket.jpg"></img>
			</div>
			<div className="ProfileScreen">
				<div className="TopTitle">
					<h1>{FocusPage}</h1>
				</div>
				<div className="BottomPart">
					<div className="LeftNavBar">
						<Link to="/Profile/EditProfile" className="LeftNavBar-Button">
							<button className="LeftNavBar-Button">My Profile</button>
						</Link>
						<Link to="/Profile/OrderHistory" className="LeftNavBar-Button">
							<button className="LeftNavBar-Button">Order History</button>
						</Link>
					</div>
					<div className="MainFocus">{children}</div>
				</div>
			</div>
		</>
	);
}
