import { render } from '@testing-library/react';
import ShoppingCart from '../src/components/ShopItem';

test('demo', () => {
	expect(true).toBe(true);
});

test('Renders the shopping cart', () => {
	render(
		<ShoppingCart
			item_id={''}
			item_name={''}
			item_desc={''}
			cost={0}
			category={''}
			special={false}
		/>
	);
	expect(true).toBeTruthy();
});
