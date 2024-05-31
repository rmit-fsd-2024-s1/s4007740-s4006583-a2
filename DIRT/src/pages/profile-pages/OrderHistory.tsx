import '../../styles/OrderHistory.css';
import OrderDataService from '../../data/OrderService';
import UserDataService from '../../data/UserService';
import ItemDataService from '../../data/ItemService';
import '../../styles/ShoppingCart.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { getUser, readAndGetOrder } from '../../data/repository';

export default function OrderHistory() {
	const [orders, setOrders] = useState<
		{
			id: string;
			order: string;
			userUuid: string;
		}[]
	>([]);
	const [items, setItems] = useState<
		{
			id: string;
			name: string;
			cost: number;
			quantity: string;
		}[]
	>([]);
	const [total, setTotal] = useState(0);

	async function getOrders() {
		const userInfo = getUser();
		if (userInfo !== null) {
			const user = await UserDataService.getUserFromUUID(userInfo);
			if (user !== null) {
				const o = await OrderDataService.getByUUID(userInfo);
				if (o !== null) {
					setOrders(o);
				}
			}
		}
	}

	useEffect(() => {
		getOrders();
	}, []);

	return (
		<div className="Container">
			{orders.map((order, index) => {
				async function readOrder() {
					const ord = [];
					const rOrder = readAndGetOrder(order.order);
					let tempTotal = 0;
					for (const item of rOrder) {
						if (item.id !== '') {
							const i = await ItemDataService.getOne(item.id);
							if (i !== null) {
								ord.push({
									id: String(i.id),
									name: i.name,
									cost: Number(i.cost),
									quantity: item.quantity,
								});
								tempTotal += Number(i.cost) * Number(item.quantity);
							}
						}
					}
					setTotal(tempTotal);
					setItems(ord);
				}
				readOrder();
				return (
					<div
						className="cart-container"
						style={{ justifyContent: 'space-around' }}
					>
						<div
							className="cart-container-left"
							style={{
								border: 'none',
								borderBottom: '1px solid rgba(0, 0, 0, 0.175)',
							}}
						>
							<h1>Order {index + 1}</h1>
							{items.map((item) => {
								return (
									<div className="cart-item">
										<div style={{ minWidth: '5rem' }}>
											{item.name.toUpperCase()}
										</div>
										<div style={{ minWidth: '5rem' }}>Qty: {item.quantity}</div>
									</div>
								);
							})}
							<div className="cart-item">Total price: ${total.toFixed(2)}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
