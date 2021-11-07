const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

// Creates a new Cart linked to customer_id with a book_id
// cart_id generated and user does not need to know.
const createNewCart = (req, res) => {
  pool.query(`INSERT INTO cart (customer_id, book_id) 
              VALUES ('${decodeURIComponent(req.params.customer_id)}', '${decodeURIComponent(req.params.book_id)}');
              `, (err, result) => {
    if (!err) {
      res.status(201).send(`Book ` + (req.params.book_id) + ` was succcessfully added to cart.`)
    }

  });
  pool.end;
}

// Add another book to cart
const addCartItem = (req, res) => {
  pool.query(`BEGIN;
              INSERT INTO cart (customer_id) VALUES ('${decodeURIComponent(req.params.customer_id)}');
              INSERT INTO cart (book_id) VALUES ('${decodeURIComponent(req.params.book_id)}');
              COMMIT;
              `, (err, result) => {
    if (!err) {
      res.status(201).send(`Book : ${result.cart_id}`) //  UPDATE "book_title added to cart"
    }

  });
  pool.end;
}

// Lists all the items in the cart.
// 
const getCartItems = (req, res) => 
{ 
  
  pool.query(`SELECT book_id FROM cart WHERE customer_id ='${req.params.customer_id}' AND book_id IS NOT NULL`, (err, result) => 
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

const deleteAllItems = (req, res) => {
  pool.query(`BEGIN;
              DELETE * FROM cart WHERE cart_id = '${req.params.cart_id}';
              COMMIT;
              `, (err, result) => {
    if (!err) {
      res.status(201).send(`Cart ID: ${result.cart_id}`) // UPDATE "book_title removed from shopping cart"
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
    createNewCart,
    addCartItem,
    getCartItems,
    deleteCartItem,
    deleteAllItems
  }