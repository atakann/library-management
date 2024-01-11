module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);

	User.associate = function (models) {
		User.belongsToMany(models.Book, {
			through: models.UserBook,
			as: "books",
			foreignKey: "userId",
			otherKey: "bookId",
		});
	};

	return User;
};
