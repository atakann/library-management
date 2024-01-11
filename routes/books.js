const express = require("express");
const { body, param, validationResult } = require("express-validator");
const bookController = require("../controllers/bookController");

const router = express.Router();

// Validation logic for creating a new book
const bookCreationValidationRules = [
	body("name").notEmpty().withMessage("Book name is required"),
];

// Error handling middleware
const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

// Get all books
router.get("/", bookController.getAllBooks);

// Get a single book by ID
router.get(
	"/:id",
	param("id").isInt().withMessage("Book ID must be an integer"),
	validate,
	bookController.getBook
);

// Create a new book
router.post(
	"/",
	bookCreationValidationRules,
	validate,
	bookController.createBook
);

module.exports = router;
