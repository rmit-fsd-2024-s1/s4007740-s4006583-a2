module.exports = (express, app) => {
	const controller = require('../controllers/review.controller.js');
	const router = express.Router();

	// Select all reviews
	router.get('/', controller.all);

	// Select all reviews made by a specific user
	router.get('/selectUUID/:uuid', controller.getByUUID);

	// Select all reviews made on a specific item
	router.get('/selectItemId/:itemId', controller.getByItemId);

	// Create a review in the table
	router.post('/create', controller.create);

	// Update a review in the table
	router.post('/updateReview', controller.updateReview);

	// Remove all reviews made by a specific user
	router.post('/destroy', controller.destroy);

	// Remove a specific review based on it's id
	router.post('/destroyOne', controller.destroyOne);

	// Add routes to server.
	app.use('/api/reviews', router);
};
