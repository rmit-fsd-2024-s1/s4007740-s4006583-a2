const db = require('../database');
const argon2 = require('argon2');

// Select all users from the database.
exports.all = async (req, res) => {
	const users = await db.user.findAll();

	res.json(users);
};

// Select one user from the database using uuid.
exports.getByUUID = async (req, res) => {
	const user = await db.user.findByPk(req.params.uuid);

	res.json(user);
};

// Select one user from the database using email.
exports.getByEmail = async (req, res) => {
	const user = await db.user.findOne({ where: { email: req.params.email } });

	res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
	const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

	const today = new Date();
	const dd = String(today.getDate()).padStart(2, '0'); // Day (padded with leading zero if needed)
	const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month (January is 0, so we add 1)
	const yyyy = today.getFullYear(); // Year

	const doj = dd + '/' + mm + '/' + yyyy;

	const user = await db.user.create({
		uuid: req.body.uuid,
		name: req.body.name,
		email: req.body.email,
		password_hash: hash,
		doj: doj,
		admin: false,
		cart: '',
	});

	res.json(user);
};

exports.findOrCreate = async (req, res) => {
	const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

	const today = new Date();
	const dd = String(today.getDate()).padStart(2, '0'); // Day (padded with leading zero if needed)
	const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month (January is 0, so we add 1)
	const yyyy = today.getFullYear(); // Year

	const doj = dd + '/' + mm + '/' + yyyy;

	const [user, created] = await db.user.findOrCreate({
		where: { email: req.body.email },
		defaults: {
			uuid: req.body.uuid,
			name: req.body.name,
			password_hash: hash,
			doj: doj,
			admin: false,
			cart: '',
		},
	});

	if (created) {
		res.json(user);
	} else {
		res.json(null);
	}
};

exports.upsert = async (req, res) => {
	const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

	let doj = '';
	let admin = false;
	let cart = '';

	let user = await db.user.findByPk(req.body.uuid);

	if (user !== null) {
		doj = user.doj;
		admin = user.admin;
		cart = user.cart;
	}

	user = await db.user.upsert({
		uuid: req.body.uuid,
		name: req.body.name,
		email: req.body.email,
		password_hash: hash,
		doj: doj,
		admin: admin,
		cart: cart,
	});

	res.json(user);
};

exports.updateCart = async (req, res) => {
	const user = await db.user.findByPk(req.body.uuid);

	if (user !== null) {
		user.cart = req.body.cart;
		await user.save();
	}

	res.json(user);
};

exports.destroy = async (req, res) => {
	const hash = await argon2.hash(req.body.password, { type: argon2.argon2d });

	const user = await db.user.destroy({
		where: {
			uuid: req.body.uuid,
			password_hash: hash,
		},
	});

	res.json(user);
};

// Select one user from the database if email and password are a match.
exports.login = async (req, res) => {
	const user = await db.user.findOne({ where: { email: req.query.email } });

	if (
		user === null ||
		(await argon2.verify(user.password_hash, req.query.password)) === false
	)
		// Login failed.
		res.json(null);
	else res.json(user);
};
