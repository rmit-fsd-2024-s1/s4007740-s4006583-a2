const db = require('../database');
const argon2 = require('argon2');

// Select all items from the database.
exports.all = async (req, res) => {
	const items = await db.item.findAll();

	res.json(items);
};

// Select one item from the database using an item's id
exports.one = async (req, res) => {
	const item = await db.item.findByPk(req.params.id);
	if (item) {
		res.json(item);
	} else {
		res.status(404).send('Item not found');
	}
};

// Select item from the database using an item's category
exports.getByCategory = async (req, res) => {
	console.log('catfgwbufwqbeuh');
	const items = await db.item.findAll({ where: { cat: req.query.test } });

	res.json(items);
};
