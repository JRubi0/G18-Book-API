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
            ?> , </div>
          <div class="subtitle">     </div>
          <div class="subtitle">0/5 Stars</div>
        
      <h2>by <a href="author\author.html">
        <?php
            $result = pg_query($con, " SELECT author_name FROM author WHERE author_id = (SELECT author_id FROM book_author WHERE book_id = $book_id)"); //Author query
            $row = pg_fetch_assoc($result);
            echo "$row[author_name]";
        ?></a></h2>
      <p><a href="genre\genrepage.html">
            <?php
            $result = pg_query($con, " SELECT genre FROM book WHERE book_id = $book_id"); //Genre query
            $row = pg_fetch_assoc($result);
            echo "$row[title]";
            ?></a>
      <h2>   </h2>
        <div class="no-change">
          <p>This is a sample book synopsis! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
        <h2 class="cart">Add to Cart</h2>
        <h2 class="wishlist">Add to Wishlist</h2>
        <h3>$99.99</h3>
        <h4>ISBN:</h4>
        <h4>Published:</h4>
        <h4>Books Sold:</h4>
      </div>
  </div>
  <script src="./f4scripts/resize.js"></script>
  <script src="./f4scripts/accordion.js"></script>

  </body>
</html>