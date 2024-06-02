module.exports = (sequelize, DataTypes) =>
	sequelize.define(
		'follower',
		{
			followerId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: 'user',
					key: 'uuid',
				},
			},
			followeeId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: 'user',
					key: 'uuid',
				},
			},
		},
		{
			// Don't add the timestamp attributes (updatedAt, createdAt).
			timestamps: false,
		}
	);
