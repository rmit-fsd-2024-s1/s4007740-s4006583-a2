module.exports = (express, app) => {
	const controller = require('../controllers/item.controller.js');
	const router = express.Router();

	// Select all posts.
	router.get('/', controller.all);

	// Select specific item with id
	router.get('/select/:id', controller.one);

	// Create a new post.
	router.post('/', controller.create);

	// Update an existing item or add item if one doesn't exist
	router.post('/', controller.upsert);

	// Add routes to server.
	app.use('/api/items', router);
};
