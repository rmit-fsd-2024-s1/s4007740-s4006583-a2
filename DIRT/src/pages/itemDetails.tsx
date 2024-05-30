// frontend/src/pages/ItemDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemService from '../data/ItemService';
import axios from 'axios';
import ReviewForm from '../components/ReviewForm';

interface Item {
	id: string;
	name: string;
	desc: string;
	cost: number;
	cat: string;
	special: boolean;
}

const ItemDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [item, setItem] = useState<Item | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const itemData = await ItemService.getOne(id!);
				setItem(itemData);
				setLoading(false);
				// const response = await axios.get<Item>(
				// 	`http://localhost:4000/api/items/${id}`
				// );
				// setItem(response.data);
				// setLoading(false);
			} catch (err) {
				setError('Failed to fetch item');
				setLoading(false);
			}
		};

		fetchItem();
	}, [id]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!item) {
		return <div>No item found</div>;
	}

	return (
		<div>
			<h1>hi hi</h1>
			<h1>hi hi</h1>
			<h1>hi hi</h1>
			console.log({item.name})<h1>{item.name}</h1>
			<p>{item.desc}</p>
			<p>Category: {item.cat}</p>
			<p>Price: ${item.cost.toFixed(2)}</p>
			<p>Special: {item.special ? 'Yes' : 'No'}</p>
			<h2>Leave a Review</h2>
			<ReviewForm onSubmit={handleReviewSubmit} />
		</div>
	);
};

export default ItemDetails;
