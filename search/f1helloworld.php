<?php
  include '../scripts/db.php' //Database connect script (put this at the top of your page)
?>


<!DOCTYPE HTML>
<html>
<head>
    <title>G18 Homepage</title>
    <link rel = "stylesheet" type = "text/css" href = "/css/globalFormat.css">
    <link href = "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,900" rel="stylesheet">
    <script src="../scripts/jquery.js"></script>  <!--Includes JQuery-->
</head>

<body>
    <header> 
        <div class = "container">
            <img src = '../assets/logo.png' alt = "logo" class = "logo"> <!--FIX ME-->
            <nav>
                <ul>
                    <li><a href="../index.php">Home</a></li> <!--replace # with other pages-->
                    <li><a href="#">Search</a></li>
                    <li><a href="#">Wishlist</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="cart/shoppingcart.php">Checkout</a></li>
                </ul>
            </nav>
        </div>     
    </header>

<body>
  <div class = "SearchResults">
          <div class = "SearchHeader">
              <p><a href="search/f1helloworld.php?ORDER_BY=Author">Order by Author</a></p>
              <p><a href="search/f1helloworld.php?ORDER_BY=Genre">Order by Genre</a></p>
              <p><a href="search/f1helloworld.php?ORDER_BY=Rating">Order by Rating</a></p>
              <input type="text" placeholder="What are you looking for?" id="criteria" name="criteria" value="criteria">
              <a href="search/f1helloworld.php?WHERE_Author=" onclick="window.location=this.href+document.getElementById('criteria').value;return false;">Search Author</a>  
              <a href="search/f1helloworld.php?WHERE_Title=" onclick="window.location=this.href+document.getElementById('criteria').value;return false;">Search Titles</a>  
          </div>    
  </div>

  <?php
  $Order_by = $_GET['ORDER_BY']; //This reads the ?book= parameter from the URL
  $book_Author = $_GET['WHERE_Author']; //This reads the ?book= parameter from the URL
  $title = $_GET['title']; //This reads the ?book= parameter from the URL
  ?>


</body>




</html>