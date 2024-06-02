module.exports = (sequelize, DataTypes) =>
	sequelize.define(
		'user',
		{
			uuid: {
				// Universally Unique IDentifier
				type: DataTypes.STRING(36),
				primaryKey: true,
			},
			name: {
				// Users name
				type: DataTypes.STRING(32),
				primaryKey: false,
			},
			email: {
				// Users email (used for login)
				type: DataTypes.STRING(40),
				allowNull: false,
			},
			password_hash: {
				// Users hashed password (hashed for protection) (used for login verification)
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			doj: {
				// Date user joined the database/website
				type: DataTypes.STRING(40),
			},
			admin: {
				// Whether or not the user is an admin
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			cart: {
				// The users current cart
				type: DataTypes.STRING(250),
			},
		},
		{
			// Don't add the timestamp attributes (updatedAt, createdAt).
			timestamps: false,
		}
	);
