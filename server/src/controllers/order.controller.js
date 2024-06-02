const db = require('../database');
const argon2 = require('argon2');

// get all placed orders
exports.all = async (req, res) => {
	const orders = await db.order.findAll();

	res.json(orders);
};

// add placed order into table
exports.create = async (req, res) => {
	console.log(req.body.uuid);
	const order = await db.order.create({
		order: req.body.order,
		userUuid: req.body.uuid,
	});

	res.json(order);
};

// get all placed orders by a specific user
exports.getByUUID = async (req, res) => {
	const order = await db.order.findAll({
		where: { userUuid: req.params.uuid },
	});

	res.json(order);
};

// remove a placed order from table, based on a specific user
exports.destroy = async (req, res) => {
	const order = await db.order.destroy({
		where: { userUuid: req.body.uuid },
	});

	res.json(order);
};
