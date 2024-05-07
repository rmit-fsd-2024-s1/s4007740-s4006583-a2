import {
	getCart,
	initCart,
	removeCartItem,
	setCartItemQuantity,
	getTotalPrice,
} from '../data/repository';
import '../styles/ShoppingCart.css';
import 'bootstrap/dist/css/bootstrap.css';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function ShoppingCart() {
	const [fields, setFields] = useState({
		number: '',
		dateMonth: '',
		dateYear: '',
		cvc: '',
	});

	const handleInputChange = (event) => {
		const name: 'number' | 'dateMonth' | 'dateYear' | 'cvc' = event.target.name;
		let value = event.target.value;

		const temp = {
			number: fields.number,
			dateMonth: fields.dateMonth,
			dateYear: fields.dateYear,
			cvc: fields.cvc,
		};

		if (name === 'dateMonth') {
			if (value <= 0) {
				value = '01';
			} else if (value > 12) {
				value = '12';
			}
		}
		temp[name] = value;
		setFields(temp);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (cart.length != 0) {
			if (
				fields.number.length === 16 &&
				!isNaN(+fields.number) &&
				fields.cvc.length === 3 &&
				!isNaN(+fields.cvc)
			) {
				alert('Payment successful');
			} else {
				alert('Incorrect payment information');
				return;
			}
			for (const item of cart) {
				removeCartItem(item.item_name);
			}
			initCart();
			setCart(getCart());
		}
	};

	const [cart, setCart] = useState<
		{
			item_name: string;
			item_desc: string;
			cost: number;
			category: string;
			quantity: number;
		}[]
	>(getCart());

	const incrementQuantity = (
		cartItem: {
			item_name: string;
			item_desc: string;
			cost: number;
			category: string;
			quantity: number;
		},
		incrementAmount: number
	) => {
		if (cartItem.quantity + incrementAmount >= 1) {
			setCartItemQuantity({
				item_name: cartItem.item_name,
				item_desc: cartItem.item_desc,
				cost: cartItem.cost,
				category: cartItem.category,
				quantity: cartItem.quantity + incrementAmount,
			});
			setCart(getCart());
		}
	};

	if (cart.length === 0) {
		initCart();
	}

	return (
		<>
			<div className="cart-container">
				<div className="cart-container-left">
					<h1>Cart</h1>
					{cart.length === 0 ? (
						<p style={{ minWidth: '25rem' }}>CART EMPTY</p>
					) : (
						cart.map((cartItem) => {
							return (
								<div className="cart-item">
									<div style={{ minWidth: '5rem' }}>
										{cartItem.item_name.toUpperCase()}
									</div>
									<div style={{ minWidth: '5rem' }}>
										Qty: {cartItem.quantity}
									</div>
									<div className="qty-change">
										<button
											style={{
												borderTopLeftRadius: '5px',
												borderBottomLeftRadius: '5px',
												borderLeft: '1px solid rgba(0, 0, 0, 0.175)',
											}}
											onClick={() => {
												incrementQuantity(cartItem, -1);
											}}
										>
											-
										</button>
										<button
											style={{
												borderTopRightRadius: '5px',
												borderBottomRightRadius: '5px',
												borderRight: '1px solid rgba(0, 0, 0, 0.175)',
											}}
											onClick={() => {
												incrementQuantity(cartItem, 1);
											}}
										>
											+
										</button>
									</div>
									<div style={{ minWidth: '5rem' }}>
										<button
											className="remove-button"
											onClick={() => {
												removeCartItem(cartItem.item_name);
												setCart(getCart());
											}}
										>
											REMOVE
										</button>
									</div>
								</div>
							);
						})
					)}
					<div className="cart-item">
						Total price: ${getTotalPrice().toFixed(2)}
					</div>
				</div>
				<div className="cart-container-right">
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						<div>
							<label>Card Number</label>
							<input
								placeholder="Card Number"
								name="number"
								onChange={handleInputChange}
								value={fields.number}
							></input>
						</div>
						<div>
							<label>Expiry Date</label>
							<select
								style={{
									cursor: 'pointer',
									minWidth: '3rem',
									border: 'none',
									borderTop: '1px solid rgba(0, 0, 0, 0.175)',
									borderBottom: '1px solid rgba(0, 0, 0, 0.175)',
									borderLeft: '1px solid rgba(0, 0, 0, 0.175)',
									borderRight: 'none',
									borderTopLeftRadius: '5px',
									borderBottomLeftRadius: '5px',
								}}
							>
								<option>01</option>
								<option>02</option>
								<option>03</option>
								<option>04</option>
								<option>05</option>
								<option>06</option>
								<option>07</option>
								<option>08</option>
								<option>09</option>
								<option>10</option>
								<option>11</option>
								<option>12</option>
							</select>
							<select
								style={{
									cursor: 'pointer',
									minWidth: '3rem',
									border: 'none',
									borderTop: '1px solid rgba(0, 0, 0, 0.175)',
									borderBottom: '1px solid rgba(0, 0, 0, 0.175)',
									borderRight: '1px solid rgba(0, 0, 0, 0.175)',
									borderLeft: 'none',
									borderTopRightRadius: '5px',
									borderBottomRightRadius: '5px',
								}}
							>
								<option>2024</option>
								<option>2025</option>
								<option>2026</option>
								<option>2027</option>
								<option>2028</option>
								<option>2029</option>
								<option>2030</option>
								<option>2031</option>
								<option>2032</option>
								<option>2033</option>
								<option>2034</option>
								<option>2035</option>
								<option>2036</option>
								<option>2037</option>
								<option>2038</option>
								<option>2039</option>
								<option>2040</option>
							</select>
						</div>
						<div>
							<label>CVC</label>
							<input
								placeholder="123"
								name="cvc"
								onChange={handleInputChange}
								value={fields.cvc}
							></input>
						</div>
						<div>
							<button
								className="btn btn-success"
								onClick={handleSubmit}
							>
								Pay
							</button>
						</div>
					</div>
				</div>
			</div>
			<div>
				<Footer />
			</div>
		</>
	);
}
