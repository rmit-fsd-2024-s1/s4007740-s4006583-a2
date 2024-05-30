const db = require('../database');
const argon2 = require('argon2');

// Select all items from the database.
exports.all = async (req, res) => {
	const items = await db.item.findAll();

	res.json(items);
};

// Select one user from the database.
exports.one = async (req, res) => {
	const item = await db.item.findByPk(req.params.id);

	res.json(item);
};

// Select item from the database using cat.
exports.getByCategory = async (req, res) => {
	const item = await db.item.findAll({ where: { cat: req.params.cat } });

	res.json(item);
};

// Create a user in the database.
exports.create = async (req, res) => {
	const item = await db.item.create({
		id: req.body.id,
		name: req.body.name,
		desc: req.body.desc,
		cost: req.body.cost,
		cat: req.body.cat,
		special: req.body.special,
	});

	res.json(item);
};

exports.upsert = async (req, res) => {
	const item = await db.item.upsert({
		id: req.body.id,
		name: req.body.name,
		desc: req.body.desc,
		cost: req.body.cost,
		cat: req.body.cat,
		special: req.body.special,
	});

	res.json(item);
};
