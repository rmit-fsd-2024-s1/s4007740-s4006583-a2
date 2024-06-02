import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDataService from '../data/ItemService';
import UserDataService from '../data/UserService';
import ReviewDataService from '../data/ReviewService';
import FollowerDataService from '../data/FollowerService';
import Footer from '../components/Footer';
import ReviewForm from '../components/ReviewForm';
import '../styles/ItemDetails.css';
import { getUser, removeUser, editOrder } from '../data/repository';

interface Item {
	id: string;
	name: string;
	desc: string;
	cost: number;
	cat: string;
	special: boolean;
}

interface Review {
	id: string;
	description: string;
	rating: number;
	date: string;
	userUuid: string;
	userName?: string;
	itemId: string;
	isFollowing: boolean;
}

interface Following {
	followerId: string;
	followeeId: string;
}

const ItemDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>(); // Item Id
	const [item, setItem] = useState<Item | null>(null); // Current Item's Interface
	const [reviews, setReviews] = useState<Review[] | null>(null); // Reviews on Current Item (Interface)
	const [loading, setLoading] = useState<boolean>(true); // Status
	const [error, setError] = useState<string | null>(null); // Status
	const [successMessage, setSuccessMessage] = useState<string | null>(null); // Status
	const [resetReviewForm, setResetReviewForm] = useState<boolean>(false); // Whether to reset form or not
	const [editPopupVisible, setEditPopupVisible] = useState<boolean>(false); // Controls the edit review popup
	const [currentReview, setCurrentReview] = useState<Review | null>(null); // Get's the currently selected review
	const [userId, setUserId] = useState<string | null>(null); // Get's the currently logged in user (if logged in)
	const [fields, setFields] = useState({ quantity: '' }); // Input fields

	const handleInputChange = (event) => {
		// Handles the input change of fields
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
		// Will add the current item to the cart
		const userInfo = getUser(); // get's the current user's uuid
		if (userInfo !== null) {
			// checks if logged in
			const user = await UserDataService.getUserFromUUID(userInfo); // get's current user from database
			if (user !== null) {
				// checks if current user exists in database
				await UserDataService.updateCart({
					// updates the cart
					uuid: userInfo,
					cart: editOrder(user.cart, id!, fields.quantity),
				});
			} else {
				// logs user out as user no longer exists
				console.log('User no longer exists');
				removeUser();
				location.assign('/');
			}
		} else {
			// prompts user to login
			alert('User must be logged in first');
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		addToCart();
	};

	const [buyHover, setBuyHover] = useState(false); // check's if hovering over buy button

	async function fetchItem() {
		try {
			// try's to get current item from database
			const itemData = await ItemDataService.getOne(id!);
			setItem(itemData);

			const reviewData = await ReviewDataService.getByItemId(id!); // get's reviews for current item

			// Fetch usernames for each review
			const reviewsWithUsernames = await Promise.all(
				// Add's following data and the user who left the review's uuid
				reviewData.map(async (review: { userUuid: string }) => {
					const user = await UserDataService.getUserFromUUID(review.userUuid);
					const isFollowing = await FollowerDataService.isFollowing(
						getUser()!,
						review.userUuid
					);
					if (user !== null && isFollowing !== null) {
						return {
							...review,
							userName: user.name, // Assuming the user object has a name property
							isFollowing: isFollowing,
						};
					}
				})
			);

			setReviews(reviewsWithUsernames);
			setLoading(false);
		} catch (err) {
			setError('Failed to fetch item: ' + err);
			setLoading(false);
		}
	}

	useEffect(() => {
		// Will fetch the item data on refresh and on item id change
		fetchItem();
	}, [id]);

	useEffect(() => {
		// get's the current user
		async function getUserInfo() {
			const userInfo = getUser();
			if (userInfo !== null) {
				const user = await UserDataService.getUserFromUUID(userInfo);
				if (user !== null) {
					setUserId(user.uuid);
				}
			}
		}
		getUserInfo();
	}, []);

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
		// Add review to item
		description: string;
		rating: number;
	}) => {
		async function submitReview() {
			const userInfo = getUser();
			if (userInfo !== null) {
				const user = await UserDataService.getUserFromUUID(userInfo);
				if (user !== null) {
					if (id !== undefined) {
						const today = new Date();
						const dd = String(today.getDate()).padStart(2, '0');
						const mm = String(today.getMonth() + 1).padStart(2, '0');
						const yyyy = today.getFullYear();
						const dor = dd + '/' + mm + '/' + yyyy;

						const reviewSubmitted = await ReviewDataService.create({
							description: review.description,
							rating: review.rating,
							date: dor,
							userUuid: userInfo,
							itemId: id,
						});
						if (reviewSubmitted !== null) {
							setSuccessMessage('Review submitted successfully!');
							await fetchItem();
							setTimeout(() => {
								setSuccessMessage(null);
								setResetReviewForm(false);
							}, 3000);
						}
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

	const handleEditButtonClick = (review: Review) => {
		setCurrentReview(review);
		setEditPopupVisible(true);
	};

	const handleEditSubmit = (review: {
		description: string;
		rating: number;
	}) => {
		async function updateReview() {
			if (currentReview !== null && id !== undefined) {
				const reviewResponse = await ReviewDataService.updateReview({
					id: currentReview.id,
					description: review.description,
					rating: review.rating,
				});
				if (reviewResponse !== null) {
					setSuccessMessage('Review updated successfully!');
					setEditPopupVisible(false);
					fetchItem();
					setTimeout(() => {
						setSuccessMessage(null);
					}, 3000);
				}
			}
		}
		updateReview();
	};

	const handleDeleteButtonClick = (review: Review) => {
		async function deleteReview() {
			const result = await ReviewDataService.destroyOne({ id: review.id });

			if (result !== null) {
				setSuccessMessage('Review deleted successfully!');
				await fetchItem();
				setTimeout(() => {
					setSuccessMessage(null);
				}, 3000);
			} else {
				setError('Failed to delete review');
			}
		}
		deleteReview();
	};

	const handleFollowButtonClick = async (followeeId: string) => {
		const userInfo = getUser();
		if (userInfo !== null) {
			const followerId = userInfo;
			try {
				const followingResponse = await FollowerDataService.create({
					followerId,
					followeeId,
				});
				if (followingResponse !== null) {
					setSuccessMessage('User followed successfully!');
					fetchItem();
					setTimeout(() => {
						setSuccessMessage(null);
					}, 3000);
				}
			} catch (error) {
				setError('Failed to follow user');
			}
		} else {
			alert('You need to be logged in to follow a user');
		}
	};

	const handleUnfollowButtonClick = async (followeeId: string) => {
		const userInfo = getUser();
		if (userInfo !== null) {
			const followerId = userInfo;
			try {
				const followingResponse =
					await FollowerDataService.deleteFollowRelationship({
						followerId,
						followeeId,
					});
				if (followingResponse !== null) {
					setSuccessMessage('User unfollowed successfully!');
					fetchItem();
					setTimeout(() => {
						setSuccessMessage(null);
					}, 3000);
				}
			} catch (error) {
				setError('Failed to unfollow user');
			}
		} else {
			alert('You need to be logged in to unfollow a user');
		}
	};

	const reviewEndThingy = (review: Review, userId: string | null) => {
		if (review.userUuid === userId) {
			return (
				<>
					<button
						className="review-btn"
						style={{ borderColor: '#ff9c1a', color: '#ff9c1a' }}
						onClick={() => handleEditButtonClick(review)}
					>
						Edit
					</button>
					<button
						className="review-btn"
						style={{ borderColor: 'red', color: 'red' }}
						onClick={() => handleDeleteButtonClick(review)}
					>
						Delete
					</button>
				</>
			);
		}
		if (userId !== null) {
			if (review.isFollowing) {
				return (
					<button
						className="review-btn"
						style={{ borderColor: 'red', color: 'red' }}
						onClick={() => handleUnfollowButtonClick(review.userUuid)}
					>
						Unfollow
					</button>
				);
			}
			return (
				<button
					className="review-btn"
					style={{ borderColor: '#218838', color: '#218838' }}
					onClick={() => handleFollowButtonClick(review.userUuid)}
				>
					Follow User
				</button>
			);
		}
	};

	const backButton = () => {
		window.location.href = `/products`;
	};

	const leftParen = '(';
	const rightParen = ')';

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
			<div className="parent-container">
				<div className="item-details-container">
					<img
						src={`/items/${item.name}.jpg`}
						alt={item.name}
						className="item-image"
					/>
					{item.special && (
						<img
							className="specialDetails"
							src="/special.png"
							alt="Special Item"
						/>
					)}
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
					</div>
					<div
						className="add-to-cart-btn"
						onMouseEnter={() => {
							setBuyHover(true);
						}}
						onMouseLeave={() => {
							setBuyHover(false);
						}}
					>
						<button className="buy-section" onClick={handleSubmit}>
							Add to Cart
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
				<div className="item-order-container">
					<div className="reviewSec">
						<h2 style={{ fontWeight: 'bold', marginBottom: '2rem' }}>
							Leave a Review
						</h2>
						<ReviewForm onSubmit={handleReviewSubmit} reset={resetReviewForm} />
						{successMessage && (
							<div className="success-message">{successMessage}</div>
						)}
					</div>
				</div>
			</div>
			<div className="viewReview">
				<h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>Reviews</h2>
				<div className="reviewContainer">
					{reviews?.map((review, index) => (
						<div className="reviewItem" key={index}>
							<p className="userName">{review.userName}</p>
							<p className="reviewDesc">{review.description}</p>
							<p className="reviewRating">
								Stars: {leftParen}
								{review.rating}
								{rightParen}
							</p>
							{reviewEndThingy(review, userId)}
						</div>
					))}
				</div>
			</div>
			{editPopupVisible && (
				<div className="edit-popup">
					<div className="edit-popup-content">
						<h2>Edit Review</h2>
						<ReviewForm
							onSubmit={handleEditSubmit}
							reset={resetReviewForm}
							initialData={currentReview}
						/>
						<button
							onClick={() => setEditPopupVisible(false)}
							className="close-popup-btn"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default ItemDetails;
