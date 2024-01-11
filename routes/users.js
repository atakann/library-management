const express = require("express");
const { body, param, validationResult } = require("express-validator");
const userController = require("../controllers/userController");

const router = express.Router();

// Validation logic for creating a new user
const userValidationRules = [
	body("name").notEmpty().withMessage("Name is required"),
];

// Validation logic for borrowing and returning books
const borrowReturnValidationRules = [
	param("userId").isInt().withMessage("User ID must be an integer"),
	param("bookId").isInt().withMessage("Book ID must be an integer"),
];

// Error handling middleware
const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

// Get all users
router.get("/", userController.getAllUsers);

// Get a single user by ID
router.get("/:id", userController.getUser);

// Create a new user
router.post("/", userValidationRules, validate, userController.createUser);

// User borrows a book
router.post(
	"/:userId/borrow/:bookId",
	borrowReturnValidationRules,
	validate,
	userController.borrowBook
);

// User returns a book
router.post(
	"/:userId/return/:bookId",
	borrowReturnValidationRules,
	validate,
	userController.returnBook
);

module.exports = router;
