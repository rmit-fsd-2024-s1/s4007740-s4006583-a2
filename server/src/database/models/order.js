module.exports = (sequelize, DataTypes) =>
	sequelize.define(
		'order',
		{
			order: {
				type: DataTypes.STRING(250),
			},
		},
		{
			// Don't add the timestamp attributes (updatedAt, createdAt).
			timestamps: false,
		}
	);
