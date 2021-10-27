const express = require('express');       // pulling in express installed in .json
const bodyParser = require('body-parser') // pulling in body-parser from json
const app = express();                    // initialize app\

const dotenv = require('dotenv');
require('dotenv').config();
dotenv.config({ path: './.env' });// Set path to .env file

const port = 3000

const book = require("./books/books.js")


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// base route that does nothing. just an example
app.get('/', (request, response) => {
    response.json({ info: 'You need to specify a path for a valid query!' })
  })

/* Public functions when to use
     * HTTP METHOD  |  REST API  |  SQL / POSTGRES
     *   GET        |   "Read"   |  SELECT
     *   POST       |  "Create"  |  INSERT
     *   PUT        |  "Update"  |  UPDATE
     *   DELETE     |  "Delete"  |  DELETE
     */

//-------------------BOOK ROUTES----------------------

app.get('/book', book.getBooks) // gets all books
app.get('/book/:book_id', book.getBookById) // gets book by ID number
app.get('/book/isbn/:isbn', book.getBookByISBN) // gets book by ISBN
//app.post('/books', book.createBook)
//app.put('/books/:id', book.updateBook)
//app.delete('/books/:id', book.deleteBook)

// cart routes that uses the book object for handling queries

//app.post('/cart', db.createNew) // call to create new cart CREATE_NEW
//app.put('/cart/items/add', db.updateTo)       // call to update book(s) in cart UPDATE_TO
//app.get('/cart/items', db.getData)     // call to list all book(s) in cart GET_DATA
//app.delete('/cart/items/delete', db.deleteCartItem) // call to delete a book from cart DELETE_THIS



// Start server
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })