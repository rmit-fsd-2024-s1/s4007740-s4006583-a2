import { useState } from 'react';
import { getUser, editOrder, removeUser } from '../data/repository';
import UserDataService from '../data/UserService';
import '../styles/ShopItem.css';

interface Props {
	item_id: string;
	item_name: string;
	item_desc: string;
	cost: number;
	category: string;
	special: boolean;
}

interface Fields {
	quantity: string;
}

export default function ShopItem({
	item_id = '',
	item_name = '',
	item_desc = '',
	cost = 0,
	category = '',
	special = false,
}: Props) {
	const [fields, setFields] = useState<Fields>({ quantity: '' });

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFields((prevFields) => ({
			...prevFields,
			[name]: value <= '0' ? '1' : value,
		}));
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
			} else {
				console.log('User no longer exists');
				removeUser();
				location.assign('/');
			}
		} else {
			alert('User must be logged in first');
		}
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addToCart();
	};

	const changePage = () => {
		window.location.href = `/products/item/${item_id}`;
	};

	const [buyHover, setBuyHover] = useState(false);

	return (
		<>
			<div
				className="card"
				style={{
					backgroundColor: special
						? 'rgba(255, 205, 70, 0.65)'
						: 'rgba(255, 255, 255, 1)',
				}}
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
					style={{ cursor: 'pointer' }}
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
						<form onSubmit={handleSubmit}>
							<button className="buy-button">Add to cart</button>
							{buyHover && (
								<input
									type="number"
									name="quantity"
									style={{ maxWidth: '3rem' }}
									value={fields.quantity}
									onChange={handleInputChange}
									placeholder="Qty"
								/>
							)}
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
