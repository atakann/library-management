const { Book, UserBook, User } = require("../models");

const getBookById = async (bookId) => {
	const book = await Book.findByPk(bookId, {
		attributes: ["id", "name"],
	});

	if (!book) {
		return null;
	}

	return {
		id: book.id,
		name: book.name,
	};
};

const getAllBooks = async () => {
	return await Book.findAll({
		attributes: ["id", "name"],
	});
};

const createBook = async (bookData) => {
	return await Book.create(bookData);
};

module.exports = {
	getAllBooks,
	getBookById,
	createBook,
};
