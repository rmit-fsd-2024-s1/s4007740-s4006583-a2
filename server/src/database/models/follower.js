module.exports = (sequelize, DataTypes) =>
	sequelize.define(
		'follower',
		{
			followerId: {
				// the uuid of the follower
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: 'user',
					key: 'uuid',
				},
			},
			followeeId: {
				// the uuid of the followee
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
