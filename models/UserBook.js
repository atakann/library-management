module.exports = (sequelize, DataTypes) => {
	const UserBook = sequelize.define(
		"UserBook",
		{
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: "User",
					key: "id",
				},
			},
			bookId: {
				type: DataTypes.INTEGER,
				references: {
					model: "Book",
					key: "id",
				},
			},
			borrowDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			returnDate: {
				type: DataTypes.DATE,
			},
			userScore: {
				type: DataTypes.INTEGER,
			},
		},
		{
			timestamps: false,
		}
	);

    UserBook.associate = function(models) {
        UserBook.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'User'
        });
        UserBook.belongsTo(models.Book, {
            foreignKey: 'bookId',
            as: 'Book'
        });
    };

	return UserBook;
};
