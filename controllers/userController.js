const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error while fetching users" });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found with provided ID" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error while retrieving user details" });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error while creating user" });
    }
};

const borrowBook = async (req, res) => {
    try {
        const { userId, bookId } = req.params;
        await userService.borrowBook(userId, bookId, new Date());
        res.status(204).end();
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error while borrowing book" });
    }
};

const returnBook = async (req, res) => {
    try {
        const { userId, bookId } = req.params;
        const { score } = req.body;
        await userService.returnBook(userId, bookId, new Date(), score);
        res.status(204).end();
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error while returning book" });
    }
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    borrowBook,
    returnBook,
};
