module.exports = (express, app) => {
	const controller = require('../controllers/order.controller.js');
	const router = express.Router();

	// Get all orders
	router.get('/', controller.all);

	// Add an order to the table
	router.post('/create', controller.create);

	// Get orders made by a specific user
	router.get('/selectUUID/:uuid', controller.getByUUID);

	// Destroy orders made by a specific user
	router.post('/destroy', controller.destroy);

	// Add routes to server
	app.use('/api/orders', router);
};
