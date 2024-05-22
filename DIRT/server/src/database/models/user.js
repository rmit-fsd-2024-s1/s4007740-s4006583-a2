module.exports = (sequelize, DataTypes) =>
	sequelize.define(
		'user',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: false,
			},
			uuid: {
				type: DataTypes.STRING(36),
				primaryKey: true,
			},
			username: {
				type: DataTypes.STRING(32),
				primaryKey: false,
			},
			password_hash: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(40),
				allowNull: false,
			},
			doj: {
				type: DataTypes.STRING(40),
			},
			profile_Img: {
				type: DataTypes.STRING(40),
			},
			admin: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			// Don't add the timestamp attributes (updatedAt, createdAt).
			timestamps: false,
		}
	);
