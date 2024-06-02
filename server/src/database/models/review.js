module.exports = (sequelize, DataTypes) =>
	sequelize.define(
		'review',
		{
			id: {
				// the reviews id
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			description: {
				// the reviews description
				type: DataTypes.STRING(700),
				allowNull: false,
			},
			rating: {
				// the reviews rating
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			date: {
				// the date the review was made
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
