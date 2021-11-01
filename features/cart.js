const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

/*
app.post('/cart/new'), db.createNewCart) // call to create new cart
app.put('/cart/items/add', db.addCartItem) // call to update book(s) in cart 
app.get('/cart/items', db.getCartItems)  // call to list all book(s) in cart
app.delete('/cart/items/delete', db.deleteCartItem) // call to delete a book from cart 
*/
/*
const createNewCart = (req, res) => 
{
  pool.query(`BEGIN;
              INSERT INTO publisher (publisher_name) VALUES ('${decodeURIComponent(req.params.publisher)}');
              INSERT INTO author (author_name) VALUES ('${decodeURIComponent(req.params.author)}');
              INSERT INTO book (publisher_id, title, isbn13, descr, genre, copies_sold, publication_date) VALUES ((currval(pg_get_serial_sequence('publisher','publisher_id'))), '${decodeURIComponent(req.params.title)}', '${decodeURIComponent(req.params.isbn)}', '${decodeURIComponent(req.params.desc)}', '${decodeURIComponent(req.params.genre)}', '${decodeURIComponent(req.params.copiessold)}', '${decodeURIComponent(req.params.publishdateymd)}');
              INSERT INTO book_author (book_id, author_id) VALUES ((currval(pg_get_serial_sequence('book','book_id'))), (currval(pg_get_serial_sequence('author','author_id')))) RETURNING book_id AS resultid;
              COMMIT;
              `, (err, result) => 
  {
    if(!err)
    { 
      res.status(201).send(`Book added with ID: ${result.insertid}`)
    }

  });
  pool.end; 
}*/






/*
function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])")
}*/

/*
//Preliminary queries for cart    --Bryan
//Create shopping cart
//Without specifying a cart_id it will automatically create a new one using the last cart_id + 1
	INSERT INTO cart (customer_id ) VALUES
	($customer_id);

//Add book to cart
	INSERT INTO cart (customer_id, book_id, cart_id) VALUES
	($customer_id, $book_id, $cart_id);

//Get cart
	SELECT * FROM cart WHERE cart_id = $cart_id;

//Remove book from cart
	DELETE FROM cart WHERE cart_id = $cart_id AND book_id = $book_id;

*/

module.exports = {
  //createNewCart,
  //addCartItem,
  //getCartItems,
  //deleteCartItem
  }