const { sequelize } = require('..');

module.exports = (sequelize, DataTypes) =>
	sequelize.define('order', {
		id: {
			type: DataTypes.NUMBER,
			primaryKey: true,
		},
		uuid: {
			type: DataTypes.STRING(36),
			allowNull: false,
			references: {
				model: 'users',
				key: 'uuid',
			},
		},
		order: {
			type: DataTypes.STRING(250),
		},
	});
