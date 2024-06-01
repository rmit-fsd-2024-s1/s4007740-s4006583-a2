module.exports = (express, app) => {
	const controller = require('../controllers/order.controller.js');
	const router = express.Router();

	router.get('/', controller.all);

	router.post('/create', controller.create);

	router.get('/selectUUID/:uuid', controller.getByUUID);

	router.post('/destroy', controller.destroy);

	// Add routes to server
	app.use('/api/orders', router);
};
