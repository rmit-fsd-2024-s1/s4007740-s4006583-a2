module.exports = (express, app) => {
	const controller = require('../controllers/user.controller.js');
	const router = express.Router();

	// Select all users.
	router.get('/', controller.all);

	// Select a single user with id.
	router.get('/select/:id', controller.one);

	// Select one user from the database if username and password are a match.
	router.get('/login', controller.login);

	// Create a new user.
	router.post('/create', controller.create);

	// Update an existing user or add user if one doesn't exist
	router.post('/upsert', controller.upsert);

	// Delete a user
	router.post('/destroy', controller.destroy);

	// Add routes to server.
	app.use('/api/users', router);
};
