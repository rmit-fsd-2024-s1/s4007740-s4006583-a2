import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/Home.css';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import { getSpecials, initSpecials } from '../data/repository';
import { useEffect } from 'react';

export default function Home() {
	const [specials, setSpecials] = useState([]);

	if (specials.length === 0) {
		initSpecials();
		const spec = getSpecials();
		setSpecials(spec);
	}

	return (
		<>
			<div
				className="header"
				style={{
					backgroundImage: 'url(/home_bg.png)',
					height: '110vh',
					width: '100%',
					backgroundSize: 'cover',
				}}
			>
				<>
					<h1 className="mainTitle">SOIL</h1>
				</>
				<>
					<p>
						Your local food grocer, bringing premium, <br></br>organic fresh
						food to the community.
					</p>
				</>
			</div>
			<div className="middleSec">
				<div className="secCom">
					<img
						className="grid_item"
						src={'delivery.png'}
						alt="Card image cap"
					></img>
					<p className="grid_item">
						Fast delivery - within 4 hours of purchase
					</p>
				</div>
				<div className="secCom">
					<img
						className="grid_item"
						src={'organic.png'}
						alt="Card image cap"
					></img>
					<p className="grid_item">
						Providing only the freshest organic products, grown healthily and
						ethically.
					</p>
				</div>
				<div className="secCom">
					<img
						className="grid_item"
						src={'water.png'}
						alt="Card image cap"
					></img>
					<p className="grid_item">Learn to grow your own garden</p>
				</div>
				<div className="secCom">
					<img
						className="grid_item"
						src={'diet.png'}
						alt="Card image cap"
					></img>
					<p className="grid_item">
						Create a customized diet plan to help achieve your goals
					</p>
				</div>
				<div className="secCom">
					<img
						className="grid_item"
						src={'seminar.png'}
						alt="Card image cap"
					></img>
					<p className="grid_item">
						In-person seminars to educate about the correlation of food to
						health
					</p>
				</div>
			</div>
			<div className="prodTitle">
				<h2>Week specials</h2>
			</div>
			<div>
				<Carousel items={specials} />
			</div>
			<div>
				<Footer />
			</div>
		</>
	);
}
