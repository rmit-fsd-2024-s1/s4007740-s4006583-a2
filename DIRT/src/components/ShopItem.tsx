import { useState } from 'react';
import {
	addCartItem,
	getCart,
	getCartItem,
	getUser,
	initCart,
	findSpecials,
	setCartItemQuantity,
} from '../data/repository';
import '../styles/ShopItem.css';
import SignUpForm from './SignupForm';

interface Props {
	item_name: string;
	item_desc: string;
	cost: number;
	category: string;
}

export default function ShopItem({
	item_name = '',
	item_desc = '',
	cost = 0,
	category = '',
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

	const handleSubmit = (event) => {
		event.preventDefault();

		if (getUser() === null) {
			setShowSignIn(true);
			alert('log in first');
			return;
		}

		initCart();
		if (getCartItem(item_name) !== -1) {
			setCartItemQuantity({
				item_name: item_name,
				item_desc: item_desc,
				cost: cost,
				category: category,
				quantity:
					fields.quantity === ''
						? 1 + getCart()[getCartItem(item_name)].quantity
						: +fields.quantity + getCart()[getCartItem(item_name)].quantity,
			});
		} else {
			addCartItem(item_name, item_desc, cost, category);
			setCartItemQuantity({
				item_name: item_name,
				item_desc: item_desc,
				cost: cost,
				category: category,
				quantity: fields.quantity === '' ? 1 : +fields.quantity,
			});
		}
	};

	const [buyHover, setBuyHover] = useState(false);

	const isSpecial = findSpecials(item_name);

	return (
		<>
			<div
				className="card"
				style={
					isSpecial
						? { backgroundColor: '#FDFD96' }
						: { backgroundColor: 'white' }
				}
			>
				{isSpecial ? (
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
				></img>
				<div className="card-body">
					<h5 className="card-title">{item_name.toUpperCase()}</h5>
					<h6 className="card-text">{category.toUpperCase()}</h6>
					<p className="card-text">{item_desc}</p>
					<div className="price-container">
						<p className="card-price">${cost.toFixed(2)}</p>
						{isSpecial ? (
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
