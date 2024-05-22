import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProfilePage from './components/ProfilePage';
import OrderHistory from './pages/profile-pages/OrderHistory';
import EditProfile from './pages/profile-pages/EditProfile';
import Products from './pages/Products';
import GorgeousGarden from './pages/GorgeousGarden';
import NavBar from './components/NavBar';
import ShoppingCart from './pages/ShoppingCart';
import { useEffect, useState } from 'react';
import { getUniqueItemCount, isCartEmpty } from './data/repository';
import { Nav } from 'react-bootstrap';

export default function App() {
	const cartEmpty = isCartEmpty();

	return (
		<div>
			<Router>
				<main role="main">
					<div>
						<NavBar />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/Profile" element={<ProfilePage />} />
							<Route
								path="/Profile/EditProfile"
								element={
									<ProfilePage FocusPage="My Profile">
										<EditProfile />
									</ProfilePage>
								}
							/>
							<Route
								path="/Profile/OrderHistory"
								element={
									<ProfilePage FocusPage="Order History">
										<OrderHistory />
									</ProfilePage>
								}
							/>
							<Route
								path="/Profile/CustomDiets"
								element={
									<ProfilePage FocusPage="Custom Diets">
										<OrderHistory />
									</ProfilePage>
								}
							/>
							<Route path="/products" element={<Products />} />
							<Route path="/GorgeousGarden" element={<GorgeousGarden />} />
							<Route path="/ShoppingCart" element={<ShoppingCart />} />
						</Routes>
					</div>
				</main>
			</Router>
		</div>
	);
}
