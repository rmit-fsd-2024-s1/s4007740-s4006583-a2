const db = require('../database');
const argon2 = require('argon2');

exports.create = async (req, res) => {
	const order = await db.order.create({
		id: '1',
		order: req.body.order,
		userUUID: '759257dd-f044-47e3-ba84-fcdd7b2559a6',
	});

	res.json(order);
};

exports.getByUUID = async (req, res) => {
	const order = await db.order.findOne({
		where: { userUUID: req.params.uuid },
	});

	res.json(order);
};
