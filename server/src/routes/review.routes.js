module.exports = (express, app) => {
	const itemController = require('../controllers/item.controller.js');
	const reviewController = require('../controllers/review.controller.js');
	const router = express.Router();

	// Existing routes...
	router.get('/api/items', itemController.all);
	router.get('/api/items/:id', itemController.one);
	router.get('/api/items/category/:cat', itemController.getByCategory);
	router.post('/api/items', itemController.create);
	router.put('/api/items/:id', itemController.upsert);

	// Add review route
	router.post('/api/reviews', reviewController.createReview);

	// Add routes to server.
	app.use('/', router);
};
