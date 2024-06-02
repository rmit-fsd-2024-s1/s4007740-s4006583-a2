import { CSSProperties, useEffect, useState } from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

{
	/*Checks whether page content height is less than screen hight.
If screen height is greater than content, fotter is bottom of viewport.
If screen height is smaller than content, footer is bottom of content (relative)*/
}
export default function Footer() {
	const [pageBigger, setPageBigger] = useState(false);

	useEffect(() => {
		if (document.body.offsetHeight > window.innerHeight) {
			setPageBigger(true);
		} else {
			setPageBigger(false);
		}
	}, []);

	const footerStyle: CSSProperties = {
		position: pageBigger ? 'relative' : 'absolute',
	};

	return (
		<div
			className="footer"
			style={footerStyle}
		>
			<Link
				onClick={() => window.scrollTo({ top: 0 })}
				to={'/'}
				className="title"
			>
				SOIL
			</Link>
			<a
				onClick={() => window.scrollTo({ top: 0 })}
				className="btn btn-success"
			>
				<p>Go to top ↑</p>
			</a>
		</div>
	);
}
