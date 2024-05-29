import { editOrder, getUser, readAndGetOrder } from '../data/repository';
import ItemDataService from '../data/ItemService';
import UserDataService from '../data/UserService';
import '../styles/ShoppingCart.css';
import 'bootstrap/dist/css/bootstrap.css';
import Footer from '../components/Footer';
import { useCallback, useEffect, useState } from 'react';

export default function ShoppingCart() {
	const [fields, setFields] = useState({
		number: '',
		dateMonth: '',
		dateYear: '',
		cvc: '',
	});

	const [total, setTotal] = useState(0);

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
		}
	};

	async function getCart() {
		const userInfo = getUser();
		if (userInfo !== null) {
			const user = await UserDataService.getUserFromUUID(userInfo);
			if (user !== null) {
				const cart = [];
				const readCart = readAndGetOrder(user.cart);
				let tempTotal = 0;
				for (const item of readCart) {
					if (item.id !== '') {
						const i = await ItemDataService.getOne(item.id);
						if (i !== null) {
							cart.push({
								id: String(i.id),
								name: i.name,
								price: Number(i.cost),
								quantity: item.quantity,
							});
							tempTotal += Number(i.cost) * Number(item.quantity);
						}
					}
				}
				setTotal(tempTotal);
				setCart(cart);
			}
		}
	}
	useEffect(() => {
		getCart();
	}, []);

	const [cart, setCart] = useState<
		{
			id: string;
			name: string;
			price: number;
			quantity: string;
		}[]
	>([]);

	async function incrementQuantity(id: string, newQuantity: string) {
		const userInfo = getUser();
		if (userInfo !== null) {
			const user = await UserDataService.getUserFromUUID(userInfo);
			if (user !== null) {
				await UserDataService.updateCart({
					uuid: userInfo,
					cart: editOrder(user.cart, id, newQuantity),
				});
			}
		}
		await getCart();
	}

	return (
		<>
			<div className="cart-container">
				<div className="cart-container-left">
					<h1>Cart</h1>
					{cart.length === 0 ? (
						<p style={{ minWidth: '25rem' }}>CART EMPTY</p>
					) : (
						cart.map((item) => {
							return (
								<div className="cart-item">
									<div style={{ minWidth: '5rem' }}>
										{item.name.toUpperCase()}
									</div>
									<div style={{ minWidth: '5rem' }}>Qty: {item.quantity}</div>
									<div className="qty-change">
										<button
											style={{
												borderTopLeftRadius: '5px',
												borderBottomLeftRadius: '5px',
												borderLeft: '1px solid rgba(0, 0, 0, 0.175)',
											}}
											onClick={() => {
												incrementQuantity(item.id, String(-1));
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
												incrementQuantity(item.id, String(1));
											}}
										>
											+
										</button>
									</div>
									<div style={{ minWidth: '5rem' }}>
										<button
											className="remove-button"
											onClick={() => {
												incrementQuantity(item.id, 'remove');
											}}
										>
											REMOVE
										</button>
									</div>
								</div>
							);
						})
					)}
					<div className="cart-item">Total price: ${total.toFixed(2)}</div>
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
							<button className="btn btn-success" onClick={handleSubmit}>
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
