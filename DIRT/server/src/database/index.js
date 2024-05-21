const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config.js');

const db = {
	Op: Sequelize.Op,
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.DIALECT,
});

// Include models.
db.user = require('./models/user.js')(db.sequelize, DataTypes);
db.post = require('./models/item.js')(db.sequelize, DataTypes);

// Relate post and user.
// db.post.belongsTo(db.user, {
// 	foreignKey: { name: 'username', allowNull: false },
// });

// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
db.sync = async () => {
	// Sync schema.
	await db.sequelize.sync();

	// Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
	// await db.sequelize.sync({ force: true });

	await seedData();
};

async function seedData() {
	const count = await db.user.count();

	// Only seed data if necessary.
	if (count > 0) return;

	const argon2 = require('argon2');

	hash = await argon2.hash('s4006583', { type: argon2.argon2id });
	await db.user.create({
		id: 1,
		username: 'Vika',
		password_hash: hash,
		email: 's4006583@student.rmit.edu.au',
		admin: true,
	});

	hash = await argon2.hash('s4007740', { type: argon2.argon2id });
	await db.user.create({
		id: 2,
		username: 'Ethan',
		password_hash: hash,
		email: 's4007740@student.rmit.edu.au',
		admin: true,
	});

	await db.item.create({
		id: 1,
		name: 'watermelon',
		desc: 'Red watermelon cut quater',
		cost: 4.84,
		cat: 'fruit',
		special: true,
	});
}

module.exports = db;
