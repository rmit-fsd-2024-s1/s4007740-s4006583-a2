module.exports = (sequelize, DataTypes) =>
	sequelize.define(
		'order',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			order: {
				// The details of the order
				type: DataTypes.STRING(250),
			},
		},
		{
			// Don't add the timestamp attributes (updatedAt, createdAt).
			timestamps: false,
		}
	);
