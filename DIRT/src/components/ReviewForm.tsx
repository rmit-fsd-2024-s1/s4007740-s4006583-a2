import React, { useState } from 'react';

interface ReviewFormProps {
	onSubmit: (review: { description: string; rating: number }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
	const [description, setDescription] = useState('');
	const [rating, setRating] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!description) {
			setError('Description is required.');
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
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="description">Description:</label>
				<textarea
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="rating">Rating:</label>
				<select
					id="rating"
					value={rating ?? ''}
					onChange={(e) => setRating(Number(e.target.value))}
				>
					<option value="">Select a rating</option>
					{[1, 2, 3, 4, 5].map((num) => (
						<option
							key={num}
							value={num}
						>
							{num}
						</option>
					))}
				</select>
			</div>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			<button type="submit">Submit Review</button>
		</form>
	);
};

export default ReviewForm;
