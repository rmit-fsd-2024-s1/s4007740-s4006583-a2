module.exports = (sequelize, DataTypes) =>
	sequelize.define(
		'item',
		{
			id: {
				// the item's id
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			name: {
				// the item's name
				type: DataTypes.STRING(32),
				primaryKey: false,
				allowNull: false,
			},
			desc: {
				// a brief description of the item
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			cost: {
				// the cost of the item
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			cat: {
				// the category the item belongs to
				type: DataTypes.STRING(40),
				allowNull: false,
			},
			special: {
				// whether the item is on special
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			// Don't add the timestamp attributes (updatedAt, createdAt).
			timestamps: false,
		}
	);
