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
db.item = require('./models/item.js')(db.sequelize, DataTypes);

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
	// if (count > 0) return;

	const argon2 = require('argon2');

	hash = await argon2.hash('s4006583', { type: argon2.argon2id });
	await db.user.upsert({
		uuid: '1',
		name: 'Vika',
		email: 's4006583@student.rmit.edu.au',
		password_hash: hash,
	});

	// await db.user.destroy({
	// 	where: { uuid: '2', password_hash: hash },
	// });

	await db.item.upsert({
		id: 1,
		name: 'watermelon',
		desc: 'Red watermelon cut quarter',
		cost: 4.95,
		cat: 'fruit',
		special: true,
	});

	await db.item.bulkCreate(
		[
			{
				id: 2,
				name: 'apple',
				desc: 'Red Apple',
				cost: 5.0,
				cat: 'fruit',
				special: false,
			},
			{
				id: 3,
				name: 'apple',
				desc: 'Red Apple',
				cost: 5.0,
				cat: 'fruit',
				special: false,
			},
			{
				id: 4,
				name: 'apple',
				desc: 'Red Apple',
				cost: 5.0,
				cat: 'fruit',
				special: false,
			},
			{
				id: 5,
				name: 'apple',
				desc: 'Red Apple',
				cost: 5.0,
				cat: 'fruit',
				special: true,
			},
			{
				id: 6,
				name: 'apple',
				desc: 'Red Apple',
				cost: 5.0,
				cat: 'fruit',
				special: false,
			},
			{
				id: 7,
				name: 'apple',
				desc: 'Green Apple',
				cost: 5.0,
				cat: 'fruit',
				special: false,
			},
		],
		{ updateOnDuplicate: ['name', 'cost', 'desc', 'cat', 'special'] }
	);
}

module.exports = db;
