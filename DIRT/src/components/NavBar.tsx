import '../styles/NavBar.css';
import { Link, NavLink, useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';
import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { removeUser, getUser } from '../data/repository';
import UserDataService from '../data/UserService';
import Headroom from 'react-headroom';
import { HorizontalCenter } from './Center';

export default function NavBar() {
	const [username, setUsername] = useState('');
	const [loginVisible, setLoginVisible] = useState(false);
	const [signupVisible, setSignupVisible] = useState(false);
	const [cartEmpty, setCartEmpty] = useState(true);
	const [cart, setCart] = useState([]);

	useEffect(() => {}, []);

	useEffect(() => {
		async function getUserInfo() {
			const userInfo = getUser();
			if (userInfo !== null) {
				const user = await UserDataService.getUserFromUUID(userInfo);
				if (user !== null) {
					setUsername(user.name);
				}
			}
		}
		getUserInfo();
	}, []);

	return (
		<>
			<Headroom>
				<nav className="navbar navbar-light shadow">
					<div className="container-left">
						<Link
							to={'/'}
							className="title"
						>
							SOIL
						</Link>
						<ul>
							<li style={{ margin: '1rem' }}>
								<Link to={'/products'}>
									<img
										className="navIcons"
										src="/shopping.png"
										alt="React Image"
									/>
									Browse Products
								</Link>
							</li>
						</ul>
					</div>
					<div className="container-right">
						<ul style={{ padding: '1rem' }}>
							<li>
								<Dropdown>
									<Dropdown.Toggle
										variant="none"
										id="dropdown-basic"
										className="dropdown-width dropdown-link"
									>
										{getUser() !== null ? 'Welcome ' + username : 'Account'}
									</Dropdown.Toggle>
									<Dropdown.Menu className="dropdown-width">
										{getUser() !== null ? (
											<>
												<Dropdown.Item
													className="dropdown-item"
													href="/Profile/EditProfile"
												>
													My Account
												</Dropdown.Item>
												<Dropdown.Item
													className="dropdown-item"
													onClick={() => {
														removeUser();
														location.assign('/');
													}}
												>
													Sign out
												</Dropdown.Item>
											</>
										) : (
											<>
												<Dropdown.Item
													className="dropdown-item"
													onClick={() => {
														setLoginVisible(true);
													}}
												>
													Login
												</Dropdown.Item>
												<Dropdown.Item
													className="dropdown-item"
													onClick={() => {
														setSignupVisible(true);
													}}
												>
													Sign up
												</Dropdown.Item>
											</>
										)}
									</Dropdown.Menu>
								</Dropdown>
							</li>
						</ul>
						<Link
							className="navCart"
							to={'/ShoppingCart'}
							style={{ minWidth: '10rem', borderRadius: '5px' }}
						>
							<HorizontalCenter>
								{cartEmpty ? (
									<img
										className="cart"
										src="/cart_empty.png"
										alt="React Image"
										style={{ margin: '1rem' }}
									/>
								) : (
									<img
										className="cart"
										src="/cart_full.png"
										alt="React Image"
										style={{ margin: '1rem' }}
									/>
								)}
							</HorizontalCenter>
							{/*Have to reload page to see update --- Sorry :) */}
							<div className="quantity">${}</div>
						</Link>
					</div>
				</nav>
			</Headroom>

			<LoginForm
				visible={loginVisible}
				onExitClick={() => {
					setLoginVisible(false);
				}}
			/>
			<SignUpForm
				visible={signupVisible}
				onExitClick={() => {
					setSignupVisible(false);
				}}
			/>
		</>
	);
}
