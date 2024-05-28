module.exports = (sequelize, DataTypes) =>
	sequelize.define(
		'user',
		{
			uuid: {
				type: DataTypes.STRING(36),
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(32),
				primaryKey: false,
			},
			email: {
				type: DataTypes.STRING(40),
				allowNull: false,
			},
			password_hash: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			doj: {
				type: DataTypes.STRING(40),
			},
			admin: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			cart: {
				type: DataTypes.STRING(250),
			},
		},
		{
			// Don't add the timestamp attributes (updatedAt, createdAt).
			timestamps: false,
		}
	);
