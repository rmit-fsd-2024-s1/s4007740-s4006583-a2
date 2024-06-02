module.exports = (express, app) => {
	const controller = require('../controllers/follower.controller.js');
	const router = express.Router();

	// Select all followers.
	router.get('/selectFollowerId/:followerId', controller.all);

	// Create a follower.
	router.post('/api/following/create', controller.create);

	app.use(router);
};
