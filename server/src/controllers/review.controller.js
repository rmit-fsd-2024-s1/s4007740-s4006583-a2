const db = require('../database');

// Create a review in the database.
exports.createReview = async (req, res) => {
	try {
		const review = await db.review.create({
			userId: req.body.userId,
			itemId: req.body.itemId,
			description: req.body.description,
			rating: req.body.rating,
			date: req.body.date,
		});
		res.status(201).json(review);
	} catch (error) {
		res.status(500).json({ message: 'Failed to create review', error });
	}
};
