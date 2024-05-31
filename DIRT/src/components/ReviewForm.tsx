import React, { useState } from 'react';
import '../styles/ReviewForm.css';

interface ReviewFormProps {
	onSubmit: (review: { description: string; rating: number }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
	const [description, setDescription] = useState('');
	const [rating, setRating] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);

	//Added checks to ensure both description and rating exist, and description length is valid
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!description) {
			setError('Description is required.');
			return;
		}

		if (description.length < 5) {
			setError('Description is too short');
			return;
		}

		if (description.length > 200) {
			setError('Description is too long');
			return;
		}

		if (rating === null || rating < 1 || rating > 5) {
			setError('Rating must be between 1 and 5.');
			return;
		}

		onSubmit({ description, rating });
		setDescription('');
		setRating(null);
		setError(null);
	};
	//FIX stars to reset after submission
	// const handleStarClick = (index: number) => {
	// 	setRating(index + 1);
	// };
	const stars = document.querySelectorAll('.stars i');
	stars.forEach((star, index1) => {
		star.addEventListener('click', () => {
			stars.forEach((star, index2) => {
				index1 >= index2
					? star.classList.add('active')
					: star.classList.remove('active');
			});
		});
	});

	return (
		<form
			className="review-form"
			onSubmit={handleSubmit}
		>
			<div className="form-group">
				<label htmlFor="description">Description:</label>
				<textarea
					id="description"
					className="form-control"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="rating">Rating:</label>
				<div className="stars">
					{[1, 2, 3, 4, 5].map((num) => (
						<i
							key={num}
							className="fa-solid fa-star"
							data-value={num}
							onClick={() => setRating(num)}
						></i>
					))}
				</div>
			</div>
			{error && <div className="error-message">{error}</div>}
			<button
				className="submit-button"
				type="submit"
			>
				Submit Review
			</button>
		</form>
	);
};

export default ReviewForm;
