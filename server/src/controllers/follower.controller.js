const db = require('../database');

// Select all followers from the database.
exports.all = async (req, res) => {
	try {
		const followers = await db.follower.findAll();
		res.json(followers);
	} catch (error) {
		console.error('Error fetching followers:', error);
		res.status(500).json({ success: false, message: 'Internal server error' });
	}
};

// Create a follower in the database.
exports.create = async (req, res) => {
	try {
		const { followerId, followeeId } = req.body;
		const following = await db.follower.create({ followerId, followeeId });
		res.status(201).json(following);
	} catch (error) {
		console.error('Error creating follow relationship:', error);
		res.status(500).json({ success: false, message: 'Internal server error' });
	}
};

// Check if a user is following another user
exports.isFollowing = async (req, res) => {
	try {
		const { followerId, followeeId } = req.params;
		const following = await db.follower.findOne({
			where: {
				followerId,
				followeeId,
			},
		});

		if (following) {
			res.json({ isFollowing: true });
		} else {
			res.json({ isFollowing: false });
		}
	} catch (error) {
		console.error('Error checking following status:', error);
		res.status(500).json({ success: false, message: 'Internal server error' });
	}
};
