module.exports = (express, app) => {
	const controller = require('../controllers/review.controller.js');
	const router = express.Router();

	router.get('/', controller.all);

	router.get('/selectUUID/:uuid', controller.getByUUID);

	router.get('/selectItemId/:itemId', controller.getByItemId);

	router.post('/create', controller.create);

	router.post('/updateReview', controller.updateReview);

	router.post('/destroy', controller.destroy);

	router.post('/destroyOne', controller.destroyOne);

	// Add routes to server.
	app.use('/api/reviews', router);
};
