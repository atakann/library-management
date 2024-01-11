const { User, Book, UserBook } = require("../models");

const getAllUsers = async () => {
	return await User.findAll({
		attributes: ["id", "name"],
	});
};

const getUserById = async (userId) => {
	const user = await User.findByPk(userId, {
		include: [
			{
				model: Book,
				as: "books",
				attributes: ["id", "name"],
				through: {
					model: UserBook,
					as: "UserBooks",
					attributes: ["borrowDate", "returnDate", "userScore"],
				},
			},
		],
	});

	if (user) {
		const pastBooks = [];
		const presentBooks = [];

		user.books.forEach((book) => {
			const bookInfo = {
				name: book.name,
				userScore: book.UserBooks.userScore,
			};

			if (book.UserBooks.returnDate) {
				pastBooks.push(bookInfo);
			} else {
				presentBooks.push(bookInfo);
			}
		});

		const finalResponse = {
			id: user.id,
			name: user.name,
			books: {
				past: pastBooks,
				present: presentBooks,
			},
		};

		return finalResponse;
	}

	return user;
};

const createUser = async (userData) => {
	return await User.create(userData);
};

const borrowBook = async (userId, bookId, borrowDate) => {
	return await UserBook.create({
		userId,
		bookId,
		borrowDate,
	});
};

const returnBook = async (userId, bookId, returnDate, userScore) => {
	const record = await UserBook.findOne({
		where: {
			userId,
			bookId,
			returnDate: null,
		},
	});

	if (record) {
		record.returnDate = returnDate;
		record.userScore = userScore;
		await record.save();
	}

	return record;
};

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	borrowBook,
	returnBook,
};
