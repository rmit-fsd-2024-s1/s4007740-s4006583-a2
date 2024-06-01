import '../../styles/OrderHistory.css';
import OrderDataService from '../../data/OrderService';
import UserDataService from '../../data/UserService';
import ItemDataService from '../../data/ItemService';
import '../../styles/ShoppingCart.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { getUser, readAndGetOrder, removeUser } from '../../data/repository';

export default function OrderHistory() {
	const [finalOrders, setFinalOrders] = useState<
		{
			order: {
				id: string;
				name: string;
				cost: number;
				quantity: string;
			}[];
			orderTotal: number;
		}[]
	>([]);

	const [total, setTotal] = useState(0);

	async function getOrders() {
		const userInfo = getUser();
		if (userInfo !== null) {
			const user = await UserDataService.getUserFromUUID(userInfo);
			if (user !== null) {
				const orders = await OrderDataService.getByUUID(userInfo);
				if (orders !== null) {
					const o: {
						order: {
							id: string;
							name: string;
							cost: number;
							quantity: string;
						}[];
						orderTotal: number;
					}[] = [];
					for (let i = 0; i < orders.length; i++) {
						const readOrder = readAndGetOrder(orders[i].order);
						const order = [];
						let total = 0;
						for (const item of readOrder) {
							if (item.id !== '') {
								const i = await ItemDataService.getOne(item.id);
								if (i !== null) {
									order.push({
										id: String(i.id),
										name: i.name,
										cost: Number(i.cost),
										quantity: item.quantity,
									});
									total += Number(i.cost) * Number(item.quantity);
								}
							}
						}
						o.push({ order: order, orderTotal: total });
					}
					setFinalOrders(o);
				}
			} else {
				alert('User no longer exists');
				removeUser();
				location.assign('/');
			}
		} else {
			alert('Must be logged in to use this page');
			location.assign('/');
		}
	}

	useEffect(() => {
		getOrders();
	}, []);

	return (
		<div className="Container">
			{finalOrders.map(
				(
					orders: {
						order: {
							id: string;
							name: string;
							cost: number;
							quantity: string;
						}[];
						orderTotal: number;
					},
					index
				) => {
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
								{orders.order.map((item) => {
									return (
										<div className="cart-item">
											<div style={{ minWidth: '5rem' }}>
												{item.name.toUpperCase()}
											</div>
											<div style={{ minWidth: '5rem' }}>
												Qty: {item.quantity}
											</div>
										</div>
									);
								})}
								<div
									className="cart-item"
									style={{ justifyContent: 'space-around' }}
								>
									Total price: ${orders.orderTotal.toFixed(2)}
								</div>
							</div>
						</div>
					);
				}
			)}
		</div>
	);
}
