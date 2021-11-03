const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
/*
createNewCart // call to create new cart
addCartItem // call to update book(s
getCartItems  // call to list all book(s) in cart
deleteCartItem // call to delete a book from cart 
*/

const createNewCart = (req, res) => {
  pool.query(`BEGIN;
              INSERT INTO cart (customer_id) VALUES ('${decodeURIComponent(req.params.customer_id)}');
              COMMIT;
              `, (err, result) => {
    if (!err) {
      res.status(201).send(`Cart ID: ${result.cart_id}`) // Update this later
    }

  });
  pool.end;
}

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
    createNewCart
  }