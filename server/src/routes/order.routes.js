module.exports = (express, app) => {
	const controller = require('../controllers/order.controller.js');
	const router = express.Router();

	router.post('/create', controller.create);

	router.get('/selectUUID/:uuid', controller.getByUUID);

	app.use('/api/orders', router);
};
