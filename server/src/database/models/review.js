module.exports = (sequelize, DataTypes) =>
	sequelize.define(
		'review',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			desc: {
				type: DataTypes.STRING(700),
				primaryKey: false,
				allowNull: false,
			},
			rating: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			date: {
				type: DataTypes.STRING(40),
				allowNull: false,
			},
			// customer_id: {
			// 	type: DataTypes.STRING(36),
			// 	allowNull: false,
			// 	references: {
			// 		model: 'users',
			// 		key: 'uuid',
			// 	},
			// },
			// item_id: {
			// 	type: DataTypes.INTEGER,
			// 	allowNull: false,
			// 	references: {
			// 		model: 'items',
			// 		key: 'id',
			// 	},
			// },
		},
		{
			// Don't add the timestamp attributes (updatedAt, createdAt).
			timestamps: false,
		}
	);
