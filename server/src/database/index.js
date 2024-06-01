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
db.order = require('./models/order.js')(db.sequelize, DataTypes);
db.review = require('./models/review.js')(db.sequelize, DataTypes);

// Relate review with item and user.
db.review.belongsTo(db.user, {
	foreignKey: { userUuid: 'uuid', allowNull: false },
});
db.user.hasMany(db.review, {
	hooks: true,
	foreignKey: { userUuid: 'uuid', allowNull: false },
});

db.review.belongsTo(db.item, {
	foreignKey: { itemId: 'id', allowNull: false },
});
db.item.hasMany(db.review, {
	hooks: true,
	foreignKey: { itemId: 'id', allowNull: false },
});

db.order.belongsTo(db.user, {
	foreignKey: { userUuid: 'uuid', allowNull: false },
});

db.user.hasMany(db.order, {
	hooks: true,
	foreignKey: { userUuid: 'uuid', allowNull: false },
});

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

	const product_list = [
		{
			id: 1,
			name: 'apples',
			desc: 'Pink Lady',
			cost: 0.79,
			cat: 'fruit',
			special: true,
		},
		{
			id: 2,
			name: 'bananas',
			desc: 'Cavendish ',
			cost: 0.72,
			cat: 'fruit',
			special: false,
		},
		{
			id: 3,
			name: 'oranges',
			desc: 'Navel',
			cost: 1.78,
			cat: 'fruit',
			special: false,
		},
		{
			id: 4,
			name: 'strawberries',
			desc: '250g Punnet',
			cost: 4.0,
			cat: 'fruit',
			special: false,
		},
		{
			id: 5,
			name: 'watermelon',
			desc: 'Red watermelon cut quarter',
			cost: 4.84,
			cat: 'fruit',
			special: true,
		},
		{
			id: 6,
			name: 'kiwis',
			desc: 'Kiwi Fruit Green',
			cost: 0.79,
			cat: 'fruit',
			special: false,
		},
		{
			id: 7,
			name: 'grapes',
			desc: 'White Seedless Grapes',
			cost: 5.23,
			cat: 'fruit',
			special: true,
		},
		{
			id: 8,
			name: 'carrots',
			desc: 'Fresh Carrots',
			cost: 0.35,
			cat: 'veg',
			special: true,
		},
		{
			id: 9,
			name: 'capsicum',
			desc: 'Red Capsicum',
			cost: 2.38,
			cat: 'veg',
			special: false,
		},
		{
			id: 10,
			name: 'broccoli',
			desc: 'Fresh Broccoli Crown',
			cost: 2.15,
			cat: 'veg',
			special: true,
		},
		{
			id: 11,
			name: 'onions',
			desc: 'Brown Onion',
			cost: 0.59,
			cat: 'veg',
			special: true,
		},
		{
			id: 12,
			name: 'tomato',
			desc: 'Fresh Tomato',
			cost: 0.76,
			cat: 'veg',
			special: false,
		},
		{
			id: 13,
			name: 'potatoes',
			desc: 'White Potato Washed',
			cost: 0.81,
			cat: 'veg',
			special: true,
		},
		{
			id: 14,
			name: 'sage seeds',
			desc: "Mr Fothergill's Sage Seeds",
			cost: 4.88,
			cat: 'seeds',
			special: false,
		},
		{
			id: 15,
			name: 'parsley seeds',
			desc: 'Garden Starters Parsel Curled',
			cost: 1.29,
			cat: 'seeds',
			special: false,
		},
		{
			id: 16,
			name: 'thyme seeds',
			desc: "Mr Fothergill's Thyme Seed Mat",
			cost: 4.88,
			cat: 'seeds',
			special: false,
		},
		{
			id: 17,
			name: 'basil seeds',
			desc: "Mr Fothergill's Basil Seed Mat",
			cost: 4.88,
			cat: 'seeds',
			special: false,
		},
		{
			id: 18,
			name: 'tomato seeds',
			desc: 'Johnsons Marmande Tomato Vegetable Seeds',
			cost: 4.6,
			cat: 'seeds',
			special: false,
		},
		{
			id: 19,
			name: 'rocket seeds',
			desc: "Mr Fothergill's Rocket Vegetable Seeds",
			cost: 4.6,
			cat: 'seeds',
			special: false,
		},
		{
			id: 20,
			name: 'butternut pumkin seeds',
			desc: "Mr Fothergill's Butternut Pumkin Vegetable Seeds",
			cost: 3.2,
			cat: 'seeds',
			special: false,
		},
	];

	await db.item.bulkCreate(product_list, {
		updateOnDuplicate: ['name', 'desc', 'cost', 'cat', 'special'],
	});
}

module.exports = db;
