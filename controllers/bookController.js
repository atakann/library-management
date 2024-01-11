const bookService = require("../services/bookService");

const getAllBooks = async (req, res) => {
	try {
		const books = await bookService.getAllBooks();
		res.status(200).json(books);
	} catch (error) {
		console.error(error); // Log the error for debugging
		res.status(500).json({
			message: "Internal Server Error while fetching books",
		});
	}
};

const getBook = async (req, res) => {
	const bookId = parseInt(req.params.id);
	const book = await bookService.getBookById(bookId);

	if (!book) {
		return res.status(404).json({ message: "Book not found" });
	}

	const response = {
		id: book.id,
		name: book.name,
		score: book.averageScore,
	};

	res.status(200).json(response);
};

const createBook = async (req, res) => {
	try {
		const newBook = await bookService.createBook(req.body);
		res.status(201).json(newBook);
	} catch (error) {
		console.error(error); // Log the error for debugging
		if (error.name === "SequelizeUniqueConstraintError") {
			return res
				.status(400)
				.json({ message: "Book already exists with the same name." });
		}
		res.status(500).json({
			message: "Internal Server Error while creating book",
		});
	}
};

module.exports = {
	getAllBooks,
	getBook,
	createBook,
};
