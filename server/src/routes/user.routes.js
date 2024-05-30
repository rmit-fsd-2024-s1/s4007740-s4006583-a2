module.exports = (express, app) => {
	const controller = require('../controllers/user.controller.js');
	const router = express.Router();

	// Select all users.
	router.get('/', controller.all);

	// Select a single user with uuid.
	router.get('/selectUUID/:uuid', controller.getByUUID);

	// Select a single user with email
	router.get('/selectEmail/:email', controller.getByEmail);

	// Verify login
	router.get('/login', controller.login);

	// Create a new user.
	router.post('/create', controller.create);

	// Find or create a user based on email.
	router.post('/findOrCreate', controller.findOrCreate);

	// Update an existing user or add user if one doesn't exist
	router.post('/upsert', controller.upsert);

	router.post('/updateCart', controller.updateCart);

	// Delete a user
	router.post('/destroy', controller.destroy);

	// Add routes to server.
	app.use('/api/users', router);
};
