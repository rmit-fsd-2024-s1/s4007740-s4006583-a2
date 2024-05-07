import 'bootstrap/dist/css/bootstrap.css';
import '../styles/GorgeousGarden.css';
import Footer from '../components/Footer';

export default function GorgeousGarden() {
	return (
		<>
			<div className="page">
				<div>
					<div
						className="header"
						style={{
							backgroundImage:
								'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5)), url(/garden.jpg)',
							width: '100%',
							backgroundSize: 'cover',
						}}
					>
						<h1>Welcome Fellow Gardeners</h1>
						<p className="intro">
							Gardening is a delightful journey that allows you to nurture and
							witness the beauty of nature right in your own<br></br> backyard.
							Whether you're a seasoned gardener or just starting out, creating
							a gorgeous garden is within your <br></br>reach. Here, we'll guide
							you through the basics, from preparing your plot of land to
							harvesting your bountiful crops.
						</p>
					</div>
					<h2 className="titlePoints">Benefits of self gardening</h2>
					<div className="points">
						<div>
							<img
								className="pointsLogo"
								src="/air.png"
								alt="React Image"
								style={{ margin: '1rem' }}
							/>
							<p>
								Improves indoor air quality by absorbing pollutants and
								releasing oxygen.
							</p>
						</div>
						<div>
							<img
								className="pointsLogo"
								src="/mind.png"
								alt="React Image"
								style={{ margin: '1rem' }}
							/>
							<p>
								Enhances mood and reduces stress through nurturing plants and
								observing growth.
							</p>
						</div>
						<div>
							<img
								className="pointsLogo"
								src="/fresh.png"
								alt="React Image"
								style={{ margin: '1rem' }}
							/>
							<p>
								Provides a convenient source of fresh herbs, vegetables, and
								fruits year-round.
							</p>
						</div>
						<div>
							<img
								className="pointsLogo"
								src="/aesthetic.png"
								alt="React Image"
								style={{ margin: '1rem' }}
							/>
							<p>
								Adds aesthetic appeal to indoor spaces, creating a calming and
								inviting atmosphere.
							</p>
						</div>
					</div>
				</div>
				<div
					className="soilSec"
					style={{
						backgroundImage:
							'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5)), url(/soil.jpg)',
						backgroundPosition: 'center',
						width: '100%',
						backgroundSize: 'cover',
					}}
				>
					<h2>Creating a beautiful garden</h2>
					<p>
						A beautiful garden begins with a good plot of land. Choose a sunny
						spot in your backyard with well-draining soil. <br></br>Clear any
						weeds or debris and loosen the soil with a garden fork or tiller to
						ensure proper root growth.
					</p>
				</div>
				<div className="seedSec">
					<div className="seedText">
						<h2>Growing from a seed</h2>
						<p>
							Starting from seeds is a rewarding way to watch your garden
							flourish from the very beginning. Begin by selecting high-quality
							seeds suited to your climate and preferences. Plant them according
							to the instructions on the seed packet, ensuring they receive
							adequate sunlight and water.
						</p>
					</div>
					<img
						src="/seed.jpg"
						alt="React Image"
						style={{ width: '50%', height: '100%' }}
					/>
				</div>
				<div className="saplingSec">
					<img
						src="/sapling.jpg"
						alt="React Image"
						style={{ width: '50%', height: 'auto' }}
					/>
					<div className="saplingText">
						<h2>Growing from a sprout</h2>
						<p>
							For those seeking a head start, growing from sprouts or seedlings
							is a convenient option. Purchase healthy young plants from your
							local nursery or garden center. Transplant them into your garden
							after the last frost, following spacing guidelines for each plant
							type.
						</p>
					</div>
				</div>
				<div className="maintainSec">
					<img
						src="/maintanance.jpg"
						alt="React Image"
						style={{ width: '25%', height: 'auto' }}
					/>
					<div className="maintainText">
						<h2>Maintanance and harvest</h2>
						<p>
							Keeping your garden thriving requires a little TLC. Regular
							watering, weeding, and mulching help maintain soil moisture and
							keep pests at bay. Monitor your plants for signs of disease or
							nutrient deficiencies, and address any issues promptly.
						</p>
					</div>
					<img
						src="/harvest.jpg"
						alt="React Image"
						style={{ width: '25%', height: 'auto' }}
					/>
				</div>
			</div>
			<div>
				<Footer />
			</div>
		</>
	);
}
