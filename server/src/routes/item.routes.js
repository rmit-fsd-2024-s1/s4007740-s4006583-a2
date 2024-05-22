module.exports = (express, app) => {
	const controller = require('../controllers/item.controller.js');
	const router = express.Router();

	// Select all items.
	router.get('/', controller.all);

	// Select specific item with id
	router.get('/select/:id', controller.one);

	// Add routes to server.
	app.use('/api/items', router);
};
