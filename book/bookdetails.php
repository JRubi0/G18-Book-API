<?php
  include '../scripts/db.php'
?>

<!DOCTYPE HTML>
<html>
<head>
  <meta charset="UTF-8">
  <script src="../scripts/jquery.js"></script>
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <script>

  </script> 
</head>

<body>
  <?php
  $book_id = $_GET['book'];
  ?>
  <div class="content">
      <div id="first-half" class="half">
        <span class="parenth1">
          <?php
            $result = pg_query($con, " SELECT title FROM book WHERE book_id = $book_id"); //Title query
            $row = pg_fetch_assoc($result);
            echo "$row[title]";
          ?>
          </span>
          <div class="subtitle">     </div>
          <div class="subtitle">
            <?php
            $result = pg_query($con, " SELECT publication_date FROM book WHERE book_id = $book_id");  //Date query
            $row = pg_fetch_assoc($result);
            $originalDate = "$row[publication_date]";
            $newDate = date("d-m-Y", strtotime($originalDate));
            echo $newDate;
            ?>  </div>
          <div class="subtitle">     </div>
          <div class="subtitle">0/5 Stars</div> <!--Rating average should be added here when feature is ready-->
        
      <h2> 
        by <?php //Look at this later, remember to update the db
            $result = pg_query($con, " SELECT author_id FROM book_author WHERE book_id = $book_id"); //Author query, clicking on author name returns search function link
            $row = pg_fetch_assoc($result);
            $author_id ="$row[author_id]";

            $result2 = pg_query($con, " ((SELECT author_name FROM author WHERE author_id = (SELECT author_id FROM book_author WHERE book_id = $book_id LIMIT 1)) ORDER BY author_id ASC);");
            $row = pg_fetch_assoc($result2);
            
            echo "<a href='search/searchresults.php?author=$author_id'>$row[author_name]</a>"; 

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
        <button class="accordion">Reviews</button>
          <div class="panel">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
      </div>
      <div id="second-half" class="half">
        <div class="book-cover">
        <img src="https://www.jimkarol.com/wp-content/uploads/2017/03/book.jpg" />
        </div>
        <div class="cart"><?php echo "<a href='/cart/cart.php?addbook=$book_id'>Add to Cart</a>" ?></div>
        <div class="wishlist"><?php echo "<a href='/wishlist/wishlist.php?addbook=$book_id'>Add to Wish List</a>" ?></div>
        <h3>
          $<?php
            $result = pg_query($con, " SELECT price FROM order_line WHERE book_id = $book_id"); //Price query
            $row = pg_fetch_assoc($result);
            echo "$row[price]";
          ?></h3>
        <div class="parenth1">ISBN: <div class ="subtitle"><?php 
              $result = pg_query($con, " SELECT isbn13 FROM book WHERE book_id = $book_id"); //ISBN query
              $row = pg_fetch_assoc($result);
              echo "$row[isbn13]"; 
        ?></div></div>
        <div class="parenth1">Publisher: <div class ="subtitle"><?php 
              $result = pg_query($con, " SELECT publisher_name FROM publisher WHERE publisher_id = (SELECT publisher_id FROM book WHERE book_id = $book_id)"); //Publisher query
              $row = pg_fetch_assoc($result);
              echo "$row[publisher_name]"; 
        ?></div></div>
        <div class="parenth1">Books Sold: <div class ="subtitle"><?php 
              $result = pg_query($con, " SELECT copies_sold FROM book WHERE book_id = $book_id"); //Publisher query
              $row = pg_fetch_assoc($result);
              echo "$row[copies_sold]"; 
        ?></div></div>
      </div>
  </div>
  <script src="./f4scripts/resize.js"></script>
  <script src="./f4scripts/accordion.js"></script>

  </body>
</html>