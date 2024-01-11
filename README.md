# Library Management System API

## Overview

This project is a RESTful API for a Library Management System, designed to manage books and user interactions in a library context. It allows for operations such as listing books and users, checking out and returning books, and managing user information.

## Features

- List all users and books
- Retrieve individual user and book details
- Create new users and books
- Borrow and return books, with user rating capability
- Calculate and display average book ratings  (The only functionality missing, GET books do not display ratings, only get user by id does)

## Technologies

- Node.js with Express for the server framework
- PostgreSQL as the database
- Sequelize ORM for database interaction
- Express Validator for request validation

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- A PostgreSQL client like [pgAdmin](https://www.pgadmin.org/)

### Installation

1. **Clone the Repository**

   ```bash
   git clone [your-repo-link]
   cd [your-project-directory]
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Database Setup**

   - Ensure PostgreSQL is installed and running on your system.
   - Create a new PostgreSQL database for the project.
   - Configure the database settings in `config/config.json`.

4. **Run Database Migrations**


   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Start the Server**

   ```bash
   node server.js
   ```

   The server should now be running and accessible at `http://localhost:3000`.

### Usage

The API supports the following endpoints:

- `GET /users`: List all users
- `GET /users/:id`: Get details of a specific user
- `POST /users`: Create a new user
- `GET /books`: List all books
- `GET /books/:id`: Get details of a specific book
- `POST /books`: Create a new book
- `POST /users/:userId/borrow/:bookId`: Borrow a book
- `POST /users/:userId/return/:bookId`: Return a book
