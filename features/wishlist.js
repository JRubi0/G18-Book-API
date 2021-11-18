const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})


// put (update wishlist with a book) (addWishlistBook) /wishlist/:customer_id&:wishlist_name&:book_id 
// delete (delete book from wishlist and move to shopping cart) (wishlistToCart) /wishlist/customer_id&:wishlist_name&:book_id
// get (list books in wishlist) (getWishlistItems) /wishlist


// Creates new wishlist linked to customer_id with unique name.
// wishlist_id is generated in database but user does not need to know it.
const createNewWishlist = (req, res) => { 
    pool.query(`BEGIN;
                INSERT INTO wishlist (customer_id, wishlist_name)
                VALUES ('${decodeURIComponent(req.params.customer_id)}', ('${decodeURIComponent(req.params.wishlist_name)}'));
                COMMIT;
                `, (err, result) => {
      if (!err) {
        res.status(201).send(`Wishlist created`) 
      }
  
    });
    pool.end;
}

// Add a book to a wishlist.
// FIX CALL
const addWishlistBook = (req, res) => { 
  pool.query(`UPDATE wishlist
              SET book_id = ('${decodeURIComponent(req.params.book_id)}')
              WHERE (customer_id, wishlist_name) = ('${decodeURIComponent(req.params.customer_id)}', '${decodeURIComponent(req.params.wishlist_name)}');
                `, (err, result) => {
      if (!err) {
        res.status(201).send(`Book added to wishlist`) 
      }
  
    });
    pool.end;
}

// Lists all the items in wishlist
// FIX CALL
const getWishlistItems = (req, res) => { 
  pool.query(`SELECT wishlist.book_id, book.title, book.price
              FROM wishlist
              INNER JOIN book
              ON book.book_id = cart.book_id
              WHERE (wishlist.customer_id, wishlist.wishlist_name) = ('${req.params.customer_id}', '${decodeURIComponent(req.params.wishlist_name)}')
              `, (err, result) => {
    if(!err) {
      res.status(200).json(result.rows);
    }
  });
  pool.end;
}


// Remove book 
const deleteCartItem = (req, res) =>
{
  pool.query(`DELETE FROM cart
              WHERE cart_id
              IN (SELECT cart_id
                FROM cart
                WHERE customer_id ='${req.params.customer_id}' 
                AND book_id ='${req.params.book_id}'
                LIMIT 1)
              `, (err, result) => {
    if (!err) {
      res.status(201).send(`Book removed from cart`)
    }
  });
  pool.end;
}
*/
module.exports = {
  createNewWishlist,
  addWishlistBook,
  getWishlistItems,
  deleteCartItem
  }