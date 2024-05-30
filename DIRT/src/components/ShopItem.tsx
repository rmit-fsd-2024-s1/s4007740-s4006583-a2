import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, editOrder, readAndGetOrder } from '../data/repository';
import UserDataService from '../data/UserService';
import '../styles/ShopItem.css';
import SignUpForm from './SignupForm';

interface Props {
	item_id: string;
	item_name: string;
	item_desc: string;
	cost: number;
	category: string;
	special: boolean;
}

export default function ShopItem({
	item_id = '',
	item_name = '',
	item_desc = '',
	cost = 0,
	category = '',
	special = false,
}: Props) {
	const [fields, setFields] = useState({ quantity: '' });
	const [showSignIn, setShowSignIn] = useState(false);

	const handleInputChange = (event) => {
		const quantity: 'quantity' = event.target.name;
		const value = event.target.value;

		const temp = { quantity: fields.quantity };

		if (+value <= 0) {
			temp[quantity] = '1';
		} else {
			temp[quantity] = value;
		}

		setFields(temp);
	};

	async function addToCart() {
		const userInfo = getUser();
		if (userInfo !== null) {
			const user = await UserDataService.getUserFromUUID(userInfo);
			if (user !== null) {
				await UserDataService.updateCart({
					uuid: userInfo,
					cart: editOrder(user.cart, item_id, fields.quantity),
				});
			}
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		if (getUser() === null) {
			setShowSignIn(true);
			alert('log in first');
			return;
		} else {
			addToCart();
		}
	};

	const changePage = () => {
		window.location.href = `/products/item/${item_id}`;
	};

	const [buyHover, setBuyHover] = useState(false);

	return (
		<>
			<div
				className="card"
				style={
					special
						? { backgroundColor: '#FDFD96' }
						: { backgroundColor: 'white' }
				}
			>
				{special ? (
					<img
						className="specialIcon"
						src="/special.png"
						alt="React Image"
					/>
				) : null}
				<img
					className="card-img-top"
					src={'/items/' + item_name + '.jpg'}
					alt="Card image cap"
					onClick={changePage}
				></img>
				<div className="card-body">
					<h5 className="card-title">{item_name.toUpperCase()}</h5>
					<h6 className="card-text">{category.toUpperCase()}</h6>
					<p className="card-text">{item_desc}</p>
					<div className="price-container">
						<p className="card-price">${cost.toFixed(2)}</p>
						{special ? (
							<p className="card-price-old">
								${(1.2 * parseFloat(cost.toFixed(2))).toFixed(2)}
							</p>
						) : null}
					</div>
					<div
						className="buy-section btn"
						onMouseEnter={() => {
							setBuyHover(true);
						}}
						onMouseLeave={() => {
							setBuyHover(false);
						}}
					>
						<button
							onClick={handleSubmit}
							className="buy-button"
						>
							Add to cart
						</button>
						{buyHover === true ? (
							<input
								type="number"
								name="quantity"
								style={{ maxWidth: '3rem' }}
								value={fields.quantity}
								onChange={handleInputChange}
								placeholder="Qty"
							></input>
						) : null}
					</div>
				</div>
			</div>
		</>
	);
}
