module.exports = (sequelize, DataTypes) => {
	const Book = sequelize.define(
		"Book",
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

	Book.associate = function (models) {
		Book.belongsToMany(models.User, {
			through: models.UserBook,
			as: "users",
			foreignKey: "bookId",
			otherKey: "userId",
		});
	};

	return Book;
};
