const db = require('../database');

exports.all = async (req, res) => {
	const reviews = await db.review.findAll();

	res.json(reviews);
};

// Create a review in the database.
exports.create = async (req, res) => {
	const review = await db.review.create({
		description: req.body.description,
		rating: req.body.rating,
		date: req.body.date,
		userUuid: req.body.userUuid,
		itemId: req.body.itemId,
	});

	res.json(review);
};

// Update a review in the database.
exports.updateReview = async (req, res) => {
	const review = await db.review.findByPk(req.body.id);

	if (review !== null) {
		review.description = req.body.description;
		review.rating = req.body.rating;
		await review.save();
	}

	res.json(review);
};

// Get reviews made by a certain user
exports.getByUUID = async (req, res) => {
	const review = await db.review.findAll({
		where: { userUuid: req.params.uuid },
	});

	res.json(review);
};

// Get reviews on a certain item
exports.getByItemId = async (req, res) => {
	const review = await db.review.findAll({
		where: { itemId: req.params.itemId },
	});

	res.json(review);
};

// Remove reviews from the table made by a user
exports.destroy = async (req, res) => {
	const review = await db.review.destroy({
		where: { userUuid: req.body.uuid },
	});

	res.json(review);
};

// Remove a specific review based on it's own id
exports.destroyOne = async (req, res) => {
	const review = await db.review.destroy({
		where: { id: req.body.id },
	});

	res.json(review);
};
