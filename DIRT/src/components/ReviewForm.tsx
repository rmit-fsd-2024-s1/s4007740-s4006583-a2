import React, { useState, useEffect } from 'react';
import '../styles/ReviewForm.css';
import { FaStar } from 'react-icons/fa';

interface ReviewFormProps {
	onSubmit: (review: { description: string; rating: number }) => void;
	reset: boolean;
	initialData?: { description: string; rating: number } | null;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
	onSubmit,
	reset,
	initialData,
}) => {
	const [description, setDescription] = useState('');
	const [rating, setRating] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (initialData) {
			setDescription(initialData.description);
			setRating(initialData.rating);
		} else {
			setDescription('');
			setRating(0);
		}
	}, [initialData, reset]);

	useEffect(() => {
		if (reset) {
			setDescription('');
			setRating(null);
		}
	}, [reset]);

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
					style={{ height: '200px' }}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="rating">Rating:</label>
				<div className="stars">
					{[1, 2, 3, 4, 5].map((star) => (
						<FaStar
							key={star}
							style={{
								cursor: 'pointer',
								fontSize: '35px',
								color: star <= (rating || 0) ? '#ff9c1a' : '#e6e6e6',
							}}
							onClick={() => setRating(star)}
						/>
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
