const db = require('../database');
const argon2 = require('argon2');

exports.all = async (req, res) => {
	const orders = await db.order.findAll();

	res.json(orders);
};

exports.create = async (req, res) => {
	console.log(req.body.uuid);
	const order = await db.order.create({
		id: (await db.order.count()) + 1,
		order: req.body.order,
		userUuid: req.body.uuid,
	});

	res.json(order);
};

exports.getByUUID = async (req, res) => {
	const order = await db.order.findAll({
		where: { userUuid: req.params.uuid },
	});

	res.json(order);
};

exports.destroy = async (req, res) => {
	const order = await db.order.destroy({
		where: { userUuid: req.body.uuid },
	});

	res.json(order);
};
