<!--This file creates the book details page and queries the PostgreSQL database for book info. 

Since it turns out that .js doesn't really work for querying and sending data between a server and a website, 
we will be having to use .php for our project going forward. 

Use .php pages instead of .html pages since this lets you communicate with the server.
    .js files are used for running external scripts inside your .php page. 
      You can include them in your file by putting <script src="../scripts/(scriptpathgoeshere)"></script> under your <html></html> tags.


The index.php file works as a homepage. Click Feature 4 - Details to test my feature.


The f4scripts folder just has some scripts for the minimized window content and the accordion drop down for the reviews.

The depreciated-stuff folder has old files from when I tried running the server on .js backend. Don't use these, they'll be deleted soon!



Feel free to copy code for your own features! -->

<?php
<<<<<<< HEAD
  include '../scripts/db.php' //
=======
  include '../scripts/db.php' //Database connect script (put this at the top of your page)
>>>>>>> e3573867452320d829504dca39159a2cc1dbe184
?>

<!DOCTYPE HTML>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" type="text/css" href="../css/globalFormat.css"> <!--Replace this with your own CSS file-->
  <link href = "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,900" rel="stylesheet">
  <script src="../scripts/jquery.js"></script>  <!--Includes JQuery-->
</head>


<body>
  <?php
  $book_id = $_GET['book']; //This reads the ?book= parameter from the URL
  ?>
    <header> 
        <div class = "container">
            <img src = "../assets/logo.png" alt = "logo" class = "logo"> <!--FIX ME-->
            <nav>
                <ul>
                    <li><a href="../index.php">Home</a></li> <!--replace # with other pages-->
                    <li><a href="search/searchresults.php?ORDER_BY=Title">Search</a></li>
                    <li><a href="#">Wishlist</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="cart/shoppingcart.php">Checkout</a></li>
                </ul>
            </nav>
        </div>     
    </header>

  <div class="container">
      <div class="ShoppingCartContainer">
        <span class="parenth1">
          <?php
            $result = pg_query($con, " SELECT title FROM book WHERE book_id = $book_id"); //Title query
            $row = pg_fetch_assoc($result); //Fetches the result as a raw array
            echo "$row[title]"; //Displays the result as a string for printing onto the webpage
          ?>
          </span>
      <h2> 
        by <?php //Look at this later, remember to update the db
            $result = pg_query($con, " SELECT author_id FROM book_author WHERE book_id = $book_id"); //Author query, clicking on author name returns search function link
            $row = pg_fetch_assoc($result);
            $author_id ="$row[author_id]";

            $result2 = pg_query($con, " ((SELECT author_name FROM author WHERE author_id = (SELECT author_id FROM book_author WHERE book_id = $book_id LIMIT 1)) ORDER BY author_id ASC);");
            $row = pg_fetch_assoc($result2);
            
            echo "<a href='search/searchresults.php?author_id=$author_id'>$row[author_name]</a>"; //Prints the author name as a clickable link to the search feature, using the author_id as a parameter

        ?></h2>
      <p><?php
            $result = pg_query($con, " SELECT genre FROM book WHERE book_id = $book_id"); //Genre query, clicking on genre name returns search function link
            $row = pg_fetch_assoc($result);
            $genre ="$row[genre]";
            $uppercase_genre = ucfirst($genre); 

            echo "<a href='search/searchresults.php?genre=$genre'>$uppercase_genre</a>"; 
          ?>
      <h2>   </h2>
        <div class="no-change">
          <p><?php 
            $result = pg_query($con, " SELECT descr FROM book WHERE book_id = $book_id"); //Description query
            $row = pg_fetch_assoc($result);
            echo "$row[descr]"; 
            ?></p>
        </div>
      <h2> </h2>
      </div>
      </div>
      <div class="container">
      <div  class="ShoppingCartContainer">
        <div class="book-cover">
        <img src="https://www.jimkarol.com/wp-content/uploads/2017/03/book.jpg" />  <!--Dummy image link (should we even include images for our books?) We'd have to pick them off google images or something-->
        </div>
        <div class="cart"><?php echo "<a href='/cart/cart.php?addbook=$book_id'>Add to Cart</a>" ?></div> <!--Buttons to send the book_id to the cart and wishlist features-->
        <div class="wishlist"><?php echo "<a href='/wishlist/wishlist.php?addbook=$book_id'>Add to Wish List</a>" ?></div>
        <h3>
          $<?php
            $result = pg_query($con, " SELECT price FROM book WHERE book_id = $book_id"); //Price query (we need to add more prices, descriptions, and genres for the books in the database, maybe for at least 30 books?)
            $row = pg_fetch_assoc($result);
            echo "$row[price]";
          ?></h3>
        <div class="h3">ISBN: <div class ="subtitle"><?php 
              $result = pg_query($con, " SELECT isbn13 FROM book WHERE book_id = $book_id"); //ISBN query
              $row = pg_fetch_assoc($result);
              echo "$row[isbn13]"; 
        ?></div></div>
        <div class="h3">Publisher: <div class ="subtitle"><?php 
              $result = pg_query($con, " SELECT publisher_name FROM publisher WHERE publisher_id = (SELECT publisher_id FROM book WHERE book_id = $book_id)"); //Publisher query
              $row = pg_fetch_assoc($result);
              echo "$row[publisher_name]";       
        ?></div></div>
        <div class="h3">Date Published: <div class ="subtitle"><?php 
             $result = pg_query($con, " SELECT publication_date FROM book WHERE book_id = $book_id");  //Date query
             $row = pg_fetch_assoc($result);
             $originalDate = "$row[publication_date]";
             $newDate = date("d-m-Y", strtotime($originalDate));
             echo $newDate;   
        ?></div></div>
        <div class="parenth1">Books Sold: <div class ="subtitle"><?php 
              $result = pg_query($con, " SELECT copies_sold FROM book WHERE book_id = $book_id"); //Books sold query
              $row = pg_fetch_assoc($result);
              echo "$row[copies_sold]"; 
        ?></div></div>
      </div>
      </div>
      <div class="container">
        <div class="ShoppingCartContainer">
          <button class="accordion">Reviews (<?php 
            ?></button>  <!--Reviews dropdown table for when reviews are implimented-->
            <div class="panel">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </div>
      </div>
  <script src="f4scripts/resize.js"></script>
  <script src="f4scripts/accordion.js"></script>

  </body>
</html>