module.exports = (sequelize, DataTypes) =>
	sequelize.define(
		'item',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(32),
				primaryKey: true,
			},
			desc: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			cost: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			cat: {
				type: DataTypes.STRING(40),
				allowNull: false,
			},
			special: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			// Don't add the timestamp attributes (updatedAt, createdAt).
			timestamps: false,
		}
	);
