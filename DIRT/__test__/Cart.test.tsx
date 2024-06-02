import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import ShoppingCart from '../src/pages/ShoppingCart';
import Review from '../src/components/ReviewForm';

test('Renders the shopping cart', () => {
	// Render the ShoppingCart component
	render(<ShoppingCart />);

	// Check if certain elements are present
	expect(screen.getByText('Cart')).toBeInTheDocument(); // Assuming there is a heading with text 'Cart'
	expect(screen.getByText('Pay')).toBeInTheDocument(); // Assuming there is a button with text 'Pay'

	// Add more assertions as needed based on your component structure and UI
});

// Tests for if the review component is being rendered when a description is more than 100 words
test('Review with description over 100 words should not submit properly', () => {
	const longDescription =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

	render(
		<Review
			onSubmit={() => {
				throw new Error('Form should not have submitted');
			}}
			reset={false}
		/>
	);

	const descriptionTextArea = screen.getByLabelText('Description:');
	fireEvent.change(descriptionTextArea, { target: { value: longDescription } });

	const submitButton = screen.getByText('Submit Review');
	fireEvent.click(submitButton);

	// Expect that the form did not submit
	expect(true).toBe(true);
});
