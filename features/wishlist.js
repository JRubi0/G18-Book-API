const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
/* change URLs to match methods
//-------------------WISHLIST ROUTES THANT NEED COMPLETED----------------------
//app.get('/wishlist/item', wishlist.getWishlistItems)  // call to list all book(s) in cart
//app.delete('/wishlist/item/delete', wishlist.deleteWishlistItem) // Remove a book from wishlist
//app.put('/wishlist/item/tocart', wishlist.wishlistToCart) // move a book from wishlist to cart.


// Creates new wishlist linked to customer_id with unique name.
// wishlist_id is generated in database but user does not need to know it.
const createNewWishlist = (req, res) => { 
    pool.query(`BEGIN;
                INSERT INTO wishlist (customer_id) VALUES ('${decodeURIComponent(req.params.customer_id)}');
                INSERT INTO wishlist (wishlist_name) VALUES ('${decodeURIComponent(req.params.wishlist_name)}');
                COMMIT;
                `, (err, result) => {
      if (!err) {
        res.status(201).send(`Wishlist Name: ${result.wishlist_name}`) // UPDATE "customer_firstname created wishlisted named wishlist_name"
      }
  
    });
    pool.end;
}

// Add a book to a wishlist.
// See about changing book_id variables to be an array?
const addWishlistItem = (req, res) => { 
    pool.query(`BEGIN;
                INSERT INTO wishlist (customer_id) VALUES ('${decodeURIComponent(req.params.customer_id)}');
                INSERT INTO wishlist (wishlist_name) VALUES ('${decodeURIComponent(req.params.wishlist_name)}');
                COMMIT;
                `, (err, result) => {
      if (!err) {
        res.status(201).send(`Book added: ${result.book_id}`) // UPDATE "book_title added to wishlist_name"
      }
  
    });
    pool.end;
}
  
*/

module.exports = {
    //createNewWishlist,
    //addWishlistItem
  }