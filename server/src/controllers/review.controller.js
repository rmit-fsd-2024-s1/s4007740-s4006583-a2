const db = require('../database');

exports.all = async (req, res) => {
	const reviews = await db.review.findAll();

	res.json(reviews);
};

// Create a review in the database.
exports.create = async (req, res) => {
	console.log(req.body);
	const review = await db.review.create({
		id: (await db.review.count()) + 1,
		description: req.body.description,
		rating: req.body.rating,
		date: req.body.date,
		userUuid: req.body.userUuid,
		itemId: req.body.itemId,
	});

	res.json(review);
};

exports.getByUUID = async (req, res) => {
	const review = await db.review.findAll({
		where: { userUuid: req.params.uuid },
	});

	res.json(review);
};

exports.getByItemId = async (req, res) => {
	const review = await db.review.findAll({
		where: { itemId: req.params.itemId },
	});

	res.json(review);
};

exports.destroy = async (req, res) => {
	const review = await db.review.destroy({
		where: { userUuid: req.body.uuid },
	});

	res.json(review);
};

exports.destroyOne = async (req, res) => {
	const review = await db.review.destroy({
		where: { id: req.body.id },
	});

	res.json(review);
};
