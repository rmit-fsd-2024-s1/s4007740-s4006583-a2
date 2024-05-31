// frontend/src/pages/ItemDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDataService from '../data/ItemService';
import UserDataService from '../data/UserService';
import ReviewDataService from '../data/ReviewService';
import axios from 'axios';
import Footer from '../components/Footer';
import ReviewForm from '../components/ReviewForm';
import '../styles/ItemDetails.css';
import { getUser, removeUser } from '../data/repository';

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
				const itemData = await ItemDataService.getOne(id!);
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
		// Handle the review submission (e.g., send to server)
		async function submitReview() {
			const userInfo = getUser();
			if (userInfo !== null) {
				const user = await UserDataService.getUserFromUUID(userInfo);
				if (user !== null) {
					if (id !== undefined) {
						const today = new Date();
						const dd = String(today.getDate()).padStart(2, '0'); // Day (padded with leading zero if needed)
						const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month (January is 0, so we add 1)
						const yyyy = today.getFullYear(); // Year

						const dor = dd + '/' + mm + '/' + yyyy;
						console.log(review);
						console.log(id);
						await ReviewDataService.create({
							description: review.description,
							rating: review.rating,
							date: dor,
							userUuid: userInfo,
							itemId: id,
						});
					}
				} else {
					removeUser();
					location.assign('/');
				}
			} else {
				alert('You need to be logged in to leave a review');
			}
		}
		submitReview();
	};

	const backButton = () => {
		window.location.href = `/products`;
	};

	return (
		<>
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="50"
					height="50"
					fill="currentColor"
					className="back-arrow"
					viewBox="0 0 16 16"
					onClick={backButton}
				>
					<path
						fillRule="evenodd"
						d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
					/>
				</svg>
			</div>
			<div className="item-details-container">
				<img
					src={`/items/${item.name}.jpg`}
					alt={item.name}
					className="item-image"
				/>
				{item.special ? (
					<img
						className="specialDetails"
						src="/special.png"
						alt="React Image"
					/>
				) : null}
				<div className="reviewSec">
					<h2>Leave a Review</h2>
					<ReviewForm onSubmit={handleReviewSubmit} />
				</div>
			</div>
			<div className="item-order-container">
				<div className="item-info">
					<h1 className="item-name" style={{ textTransform: 'capitalize' }}>
						{item.name}
					</h1>
					<p className="item-category" style={{ textTransform: 'capitalize' }}>
						{item.cat}
					</p>
					<p className="item-desc" style={{ textTransform: 'capitalize' }}>
						{item.desc}
					</p>
				</div>
				<div className="price-container">
					<span className="item-price">${item.cost.toFixed(2)}</span>
					{item.special && (
						<span className="item-price-old">
							${(item.cost * 1.2).toFixed(2)}
						</span>
					)}
				</div>
				<button className="add-to-cart-btn">Add to Cart</button>
				<div className="viewReview">
					<h2>Reviews</h2>
				</div>
			</div>
			<div>
				<Footer />
			</div>
		</>
	);
};

export default ItemDetails;
