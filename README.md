# Bookstore API

This is a simple Bookstore API built with Express and MongoDB. It supports basic CRUD operations for managing books in a bookstore.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Running Tests](#running-tests)
- [Environment Variables](#environment-variables)
- [Additional Resources](#additional-resources)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/rungene/bookstore-api.git
    cd bookstore-api
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the application:
    ```bash
    npm run dev
    ```

    The server will start on port 3000 by default. You can change the port by setting the `PORT` environment variable.

## API Endpoints

### Get all books
- **URL:** `/books`
- **Method:** `GET`
- **Query Parameters:**
  - `p`: Page number (optional, default is 0)
- **Response:** A list of books.

### Get a book by ID
- **URL:** `/books/:id`
- **Method:** `GET`
- **Response:** A book object.

### Create a new book
- **URL:** `/books`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
      "title": "Book Title",
      "author": "Author Name"
    }
    ```
- **Response:** The created book object.

### Delete a book by ID
- **URL:** `/books/:id`
- **Method:** `DELETE`
- **Response:** A success message.

### Update a book by ID
- **URL:** `/books/:id`
- **Method:** `PATCH`
- **Request Body:** Partial book object with fields to update.
- **Response:** The updated book object.

## Running Tests

1. Set the environment variables and run the tests:
    ```bash
    npm run test
    ```

    This will run the tests using Mocha and Chai. The test database will be used for running the tests.

## Environment Variables

The following environment variables are used in this project:

- `PORT`: The port on which the server runs (default is 3000).
- `LOCAL_URI`: The MongoDB connection URI for the local production database.
- `ATLAS_URI`: The MongoDB connection URI for the atlas production database.
- `LOCAL_TEST_URI`: The MongoDB connection URI for the test database.

Create a `.env` file in the root directory of your project to set these variables:

```env
PORT=3000
ATLAS_URI=mongodb+srv://username:password@cluster0.mongodb.net/bookstore?retryWrites=true&w=majority
LOCAL_TEST_URI=mongodb://localhost:27017/test_bookstore
```

## Additional Resources

- Complete MongoDB Tutorial by Net Ninja: https://www.youtube.com/watch?v=084rmLU1UgA&list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA&index=25

## License

[![GPL license](https://img.shields.io/badge/License-GPL-blue.svg)](http://perso.crans.org/besson/LICENSE.html)
