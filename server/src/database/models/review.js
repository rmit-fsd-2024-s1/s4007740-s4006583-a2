module.exports = (sequelize, DataTypes) =>
	sequelize.define(
		'review',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			description: {
				type: DataTypes.STRING(700),
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

			//USE REACT QUILL TO GENERATE FORM
		},
		{
			// Don't add the timestamp attributes (updatedAt, createdAt).
			timestamps: false,
		}
	);
