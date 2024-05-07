import { SetStateAction, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/Products.css';
import { BrowserRouter } from 'react-router-dom';
import { getSpecials, initSpecials } from '../data/repository';
import ShopItem from '../components/ShopItem';
import Footer from '../components/Footer';

export default function products() {
	const product_list: {
		item_name: string;
		item_desc: string;
		cost: number;
		category: string;
	}[] = [
		{
			item_name: 'apples',
			item_desc: 'Pink Lady',
			cost: 0.79,
			category: 'fruit',
		},
		{
			item_name: 'bananas',
			item_desc: 'Cavendish ',
			cost: 0.72,
			category: 'fruit',
		},
		{ item_name: 'oranges', item_desc: 'Navel', cost: 1.78, category: 'fruit' },
		{
			item_name: 'strawberries',
			item_desc: '250g Punnet',
			cost: 4.0,
			category: 'fruit',
		},
		{
			item_name: 'watermelon',
			item_desc: 'Red watermelon cut quarter',
			cost: 4.84,
			category: 'fruit',
		},
		{
			item_name: 'kiwi',
			item_desc: 'Kiwi Fruit Green',
			cost: 0.79,
			category: 'fruit',
		},
		{
			item_name: 'grapes',
			item_desc: 'White Seedless Grapes',
			cost: 5.23,
			category: 'fruit',
		},
		{
			item_name: 'carrots',
			item_desc: 'Fresh Carrots',
			cost: 0.35,
			category: 'veg',
		},
		{
			item_name: 'capsicum',
			item_desc: 'Red Capsicum',
			cost: 2.38,
			category: 'veg',
		},
		{
			item_name: 'broccoli',
			item_desc: 'Fresh Broccoli Crown',
			cost: 2.15,
			category: 'veg',
		},
		{
			item_name: 'onion',
			item_desc: 'Brown Onion',
			cost: 0.59,
			category: 'veg',
		},
		{
			item_name: 'tomato',
			item_desc: 'Fresh Tomato',
			cost: 0.76,
			category: 'veg',
		},
		{
			item_name: 'potatoes',
			item_desc: 'White Potato Washed',
			cost: 0.81,
			category: 'veg',
		},
		{
			item_name: 'sage seeds',
			item_desc: "Mr Fothergill's Sage Seeds",
			cost: 4.88,
			category: 'seeds',
		},
		{
			item_name: 'parsley seeds',
			item_desc: 'Garden Starters Parsel Curled',
			cost: 1.29,
			category: 'seeds',
		},
		{
			item_name: 'thyme seeds',
			item_desc: "Mr Fothergill's Thyme Seed Mat",
			cost: 4.88,
			category: 'seeds',
		},
		{
			item_name: 'basil seeds',
			item_desc: "Mr Fothergill's Basil Seed Mat",
			cost: 4.88,
			category: 'seeds',
		},
		{
			item_name: 'tomato seeds',
			item_desc: 'Johnsons Marmande Tomato Vegetable Seeds',
			cost: 4.6,
			category: 'seeds',
		},
		{
			item_name: 'rocket seeds',
			item_desc: "Mr Fothergill's Rocket Vegetable Seeds",
			cost: 4.6,
			category: 'seeds',
		},
		{
			item_name: 'butternut pumkin seeds',
			item_desc: "Mr Fothergill's Butternut Pumkin Vegetable Seeds",
			cost: 3.2,
			category: 'seeds',
		},
	];

	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const handleFilter = (category: string) => {
		setSelectedCategories((prevCategories) => {
			if (prevCategories.includes(category)) {
				// If category already selected, remove it
				return prevCategories.filter((c) => c !== category);
			} else {
				// Otherwise, add it
				return [...prevCategories, category];
			}
		});
	};

	const filteredProducts =
		selectedCategories.length > 0
			? product_list.filter((product) =>
					selectedCategories.includes(product.category)
			  )
			: product_list;

	return (
		<>
			<div className="prodTitle">
				<h1>Products</h1>
			</div>
			<div className="selection">
				<ul>
					<li>
						<input
							className="checkbox"
							type="checkbox"
							value="fruit"
							onChange={() => handleFilter('fruit')}
							checked={selectedCategories.includes('fruit')}
						/>
						<label>Fruit</label>
					</li>
					<li>
						<input
							className="checkbox"
							type="checkbox"
							value="veg"
							onChange={() => handleFilter('veg')}
							checked={selectedCategories.includes('veg')}
						/>
						<label>Veg</label>
					</li>
					<li>
						<input
							className="checkbox"
							type="checkbox"
							value="seeds"
							onChange={() => handleFilter('seeds')}
							checked={selectedCategories.includes('seeds')}
						/>
						<label>Seeds</label>
					</li>
				</ul>
			</div>
			<div
				className="largeBody"
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				{filteredProducts.map((product, index) => (
					<ShopItem
						key={index}
						item_name={product.item_name}
						item_desc={product.item_desc}
						cost={product.cost}
						category={product.category}
					/>
				))}
			</div>
			<div>
				<Footer />
			</div>
		</>
	);
}
