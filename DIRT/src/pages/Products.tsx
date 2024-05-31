import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/Products.css';
import { BrowserRouter } from 'react-router-dom';
import ShopItem from '../components/ShopItem';
import Footer from '../components/Footer';
import ItemService from '../data/ItemService';

export default function products() {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [products, setProducts] = useState<
		{
			id: number;
			name: string;
			desc: string;
			cat: string;
			cost: number;
			special: boolean;
		}[]
	>([]);

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

	useEffect(() => {
		async function loadProducts() {
			const currProducts = await ItemService.getAll();

			setProducts(currProducts);
		}

		loadProducts();
	}, []);

	const filteredProducts =
		selectedCategories.length > 0
			? products.filter((products) => selectedCategories.includes(products.cat))
			: products;

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
						item_id={String(product.id)}
						item_name={product.name}
						item_desc={product.desc}
						category={product.cat}
						cost={product.cost}
						special={product.special}
					/>
				))}
			</div>
			{/* <div>
				<Footer />
			</div> */}
		</>
	);
}
