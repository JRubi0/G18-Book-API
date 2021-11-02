const express = require('express');       // pulling in express installed in .json
const bodyParser = require('body-parser') // pulling in body-parser from json
const app = express();                    // initialize app\

const dotenv = require('dotenv');
require('dotenv').config();
dotenv.config({ path: './.env' });// Set path to .env file

const port = 3000

const book = require("./book/book.js")
const search = require("./features/search.js")
const users = require("./features/users.js")
const review = require("./features/reviews.js")

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
app.get('/book/isbn/:isbn13', book.getBookByISBN) // gets book by ISBN
app.get('/author/:author_id', book.getAuthorsBooks, book.getAuthorsBooks) // gets book by ISBN
app.post('/book/add/:title&:isbn&:desc&:genre&:copiessold&:author&:publisher&:publishdateymd', book.createBook) 
app.post('/author/add/:author&:bio&:publisher', book.createAuthor)
//app.put('/books/:id', book.updateBook)
//app.delete('/books/:id', book.deleteBook)


//-------------------SEARCH ROUTES----------------------
app.get('/search/all/:page&:per_page', search.getBooks) // Diplays all books, one page at a time, 20 books per page
app.get('/search/genre/:genre', search.getBooksByGenre) // Diplays all books of the specified genre
app.get('/search/top/:number', search.getBooksTopSellers) // Diplays the top sellers. Takes in a variable for how many to display, in order by copies sold
app.get('/search/rating/:rating', search.getBooksAboveRating) // Diplays all books with an average rating above the specified number 

//-------------------USER ROUTES----------------------
//app.post('/user/update/:field&:newValue&:username', users.Updateuser)
app.get('/user/credit_card/:email', users.GetCreditCards) //Gets all credit cards for user specified by email address

//-------------------CART ROUTES----------------------
// app.post('/cart/new'), db.createNewCart) // call to create new cart
// app.put('/cart/items/add', db.addCartItem) // call to update book(s) in cart 
// app.get('/cart/items', db.getCartItems)  // call to list all book(s) in cart
// app.delete('/cart/items/delete', db.deleteCartItem) // call to delete a book from cart 

//-------------------REVIEW ROUTES----------------------
app.post('/review/Add/:book_id&:Review_comment&:customer_id', review.postComment)
app.post('/rating/Add/:book_id&:star_rating&:customer_id', review.postRating)
app.get('/review/all', review.GetReviews)                 //Gets all Reviews and comments
app.get('/rating/:book_id', review.getRating)

// Start server
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })