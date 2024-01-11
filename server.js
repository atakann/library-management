const express = require("express");
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRoutes);
app.use("/books", bookRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Library Management System");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
