import { useState, useEffect } from 'react';
import '../styles/Carousel.css';
import ShopItem from '../components/ShopItem';

interface Props {
	items: {
		id: number;
		name: string;
		desc: string;
		cat: string;
		cost: number;
		special: boolean;
	}[];
}

{
	/*Allows users to operate carousel by clicking arrow buttons and dragging on the carousel*/
}
export default function Carousel({ items = [] }: Props) {
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		const handleDragging = (e: MouseEvent) => {
			if (!isDragging) return;
			e.preventDefault();
			const carousel = document.querySelector('.carousel') as HTMLElement;
			if (carousel) {
				carousel.scrollLeft -= e.movementX;
			}
		};

		document.addEventListener('mousemove', handleDragging);

		return () => {
			document.removeEventListener('mousemove', handleDragging);
		};
	}, [isDragging]);

	const handleMouseDown = () => {
		setIsDragging(true);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};
	{
		/*Arrows*/
	}
	const handleArrowClick = (direction: 'left' | 'right') => {
		const carousel = document.querySelector('.carousel') as HTMLElement;
		if (!carousel) return;

		const scrollAmount = (23 * window.innerWidth) / 100;
		carousel.scrollBy({
			left: direction === 'left' ? -scrollAmount : scrollAmount,
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div className="wrapper">
			<div
				className="carousel"
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
			>
				{/*Map used to reference item and item information with item name as the key */}
				{items.map((item) => {
					return (
						<div
							className="carousel_item"
							key={item.name}
						>
							<ShopItem
								item_id={String(item.id)}
								item_name={item.name}
								item_desc={item.desc}
								cost={item.cost}
								category={item.cat}
								special={item.special}
							></ShopItem>
						</div>
					);
				})}
			</div>
			{/*Imported arrows*/}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-arrow-left"
				viewBox="0 0 16 16"
				onClick={() => handleArrowClick('left')}
			>
				<path
					fillRule="evenodd"
					d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
				/>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-arrow-right"
				viewBox="0 0 16 16"
				onClick={() => handleArrowClick('right')}
			>
				<path
					fillRule="evenodd"
					d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
				/>
			</svg>
		</div>
	);
}
