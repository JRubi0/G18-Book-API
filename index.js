const express = require('express');       // pulling in express installed in .json
const bodyParser = require('body-parser') // pulling in body-parser from json
const app = express();                    // initialize app\

const dotenv = require('dotenv');
require('dotenv').config();
dotenv.config({ path: './.env' });// Set path to .env file

const port = 3000

const search = require("./features/search.js")       // feature #1 Book Browsing and Search
const users = require("./features/users.js")         // feature #2 Profile Management
const cart = require("./features/cart.js")           // feature #3 Shopping Cart
const book = require("./features/book.js")               // feature #4 Book Details
const review = require("./features/reviews.js")      // feature #5 Book Rating and Commenting
const wishlist = require("./features/wishlist.js")   // feature #6 Wish List Management

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
app.get('/author', book.getAuthors) // gets all authors
app.get('/book/author/:author_id', book.getAuthorsBooks) // gets book by ISBN
app.post('/book/add/:title&:isbn&:desc&:genre&:copiessold&:author&:publisher&:publishdateymd', book.createBook) //creates new book, author, & publisher
app.post('/book/author/add/:author&:bio&:publisher', book.createAuthor) //creates new author


//-------------------SEARCH ROUTES----------------------
app.get('/search/all/:page&:per_page', search.getBooks) // Diplays all books, one page at a time, 20 books per page
app.get('/search/genre/:genre', search.getBooksByGenre) // Diplays all books of the specified genre
app.get('/search/top/:number', search.getBooksTopSellers) // Diplays the top sellers. Takes in a variable for how many to display, in order by copies sold
app.get('/search/rating/:rating', search.getBooksAboveRating) // Diplays all books with an average rating above the specified number 

//-------------------USER ROUTES----------------------
app.post('/user/:email&:password', users.createNewUser) // create user with email and password
app.post('/user/:email&:password&:street_number&:street_name&:city&:country_id', users.createNewUser1) // create user with everything
app.put('/user/:email&:first_name&:last_name', users.updateUser) // update first and last name for user
app.get('/user/:email', users.viewUserProfile) // view user info
app.get('/user/credit_card/:customer_id', users.getCreditCards) //Gets all credit cards for user specified by email address
app.post('/user/credit_card/:customer_id&:card_number&:exp_date&:code', users.updateCreditCards)

//-------------------CART ROUTES----------------------
app.post('/cart/:customer_id&:book_id', cart.addCartItem) // Creates new cart for customer_id with book and updates cart
app.get('/cart/:customer_id', cart.getCartItems)  // Lists all book(s) in cart
app.delete('/cart/:customer_id&:book_id', cart.deleteCartItem) // Deletes a book from cart
app.delete('/cart/:customer_id', cart.deleteAllItems) // Deletes cart

//-------------------REVIEW ROUTES----------------------
app.post('/review/Add/:book_id&:Review_comment&:customer_id', review.postComment) //Adds a review given a book_id and customer_id
app.post('/rating/Add/:book_id&:star_rating&:customer_id', review.postRating)
app.get('/review/all', review.getReviews)                 //Gets all Reviews and comments
app.get('/rating/:book_id', review.getRating)

//-------------------WISHLIST ROUTES----------------------
//app.post('/wishlist/new/:customer_id&:wishlist_name', wishlist.createNewWishlist) // Creates new wishlist for customer_id with unique name
//app.put('/wishlist/item/add', wishlist.addWishlistItem) // Add book(s) in wishlist 
//app.get('/wishlist/item', wishlist.getWishlistItems)  // call to list all book(s) in cart
//app.delete('/wishlist/item/delete', wishlist.deleteWishlistItem) // Remove a book from wishlist
//app.put('/wishlist/item/tocart', wishlist.wishlistToCart) // move a book from wishlist to cart.

// Start server
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })