// frontend/src/pages/ItemDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemService from '../data/ItemService';
import axios from 'axios';
import ReviewForm from '../components/ReviewForm';
import '../styles/ItemDetails.css';

interface Item {
	id: string;
	name: string;
	desc: string;
	cost: number;
	cat: string;
	special: boolean;
}

const ItemDetails: React.FC<{ userId: string }> = () => {
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

	const handleReviewSubmit = (review: {
		description: string;
		rating: number;
	}) => {
		console.log('Review submitted:', review);
		// Handle the review submission (e.g., send to server)
	};

	const backButton = () => {
		window.location.href = `/products`;
	};

	return (
		<>
			<div>
				<button onClick={backButton}>Back</button>
			</div>
			<div className="item-details-container">
				<img
					src={`/items/${item.name}.jpg`}
					alt={item.name}
					className="item-image"
				/>
				{item.special && <div className="special-indicator">Special</div>}
				<div>
					<h2>Leave a Review</h2>
					<ReviewForm onSubmit={handleReviewSubmit} />
				</div>
			</div>
			<div className="item-order-container">
				<div className="item-info">
					<h1 className="item-name">{item.name}</h1>
					<p className="item-category">{item.cat}</p>
					<p className="item-desc">{item.desc}</p>
				</div>
				<div className="price-container">
					<span className="item-price">${item.cost.toFixed(2)}</span>
					{item.special && (
						<span className="item-price-old">
							${(item.cost * 1.2).toFixed(2)}
						</span>
					)}
					<button className="add-to-cart-btn">Add to Cart</button>
				</div>
			</div>
		</>
	);
};

export default ItemDetails;
