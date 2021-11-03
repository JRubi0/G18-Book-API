const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
/* CODE is base i complete.


// Creates a new Cart linked to customer_id
// cart_id generated and user does not need to know.
const createNewCart = (req, res) => {
  pool.query(`BEGIN;
              INSERT INTO cart (customer_id) VALUES ('${decodeURIComponent(req.params.customer_id)}');
              COMMIT;
              `, (err, result) => {
    if (!err) {
      res.status(201).send(`Cart ID: ${result.cart_id}`) // UPDATE "customer_firstname created shopping cart"
    }

  });
  pool.end;
}

// Updates cart with a book
// See how to add multiple books under same customer_id after cart has already been added. 
// See about changing to INSERT INTO ... VALUES ... ON CONFLICT.... UPDATE SET ....
const addCartItem = (req, res) => {
  pool.query(`BEGIN;
              UPDATE cart (customer_id) VALUES ('${decodeURIComponent(req.params.customer_id)}');
              UPDATE cart (book_id) VALUES ('${decodeURIComponent(req.params.book_id)}');
              COMMIT;
              `, (err, result) => {
    if (!err) {
      res.status(201).send(`Cart ID: ${result.cart_id}`) //  UPDATE "book_title added to cart"
    }

  });
  pool.end;
}

// Lists all the items in the cart.
// 
const getCartItems = (req, res) => 
{ 
  
  pool.query(`SELECT * FROM cart WHERE cart_id ='${req.params.cart_id}'`, (err, result) => 
  {
    if(!err)
    {
      res.status(200).json(result.rows);
    }
  });
  pool.end;
}

const deleteCartItem = (req, res) => {
  pool.query(`BEGIN;
              DELETE FROM cart WHERE cart_id = '${req.params.cart_id}' AND book_id = '${req.params.book_id}';
              COMMIT;
              `, (err, result) => {
    if (!err) {
      res.status(201).send(`Cart ID: ${result.cart_id}`) // UPDATE "book_title removed from shopping cart"
    }

  });
  pool.end;
}
*/

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