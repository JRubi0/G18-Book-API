<!--Page top hotbar-->
<?php
  include 'scripts/db.php' //Database connect script (put this at the top of your page)
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
            <img src = "./assets/logo.png" alt = "logo" class = "logo"> <!--FIX ME-->
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
    <div>

    </div>
<!--End of page hotbar-->

<body>
<div class = "ShoppingCartContainer">
        <div class = "CartHeader">
            <p><a href="search/f1helloworld.php">Feature 1 - Sort</a></p>
            <p><a href="feat2-profilemanage\f2helloworld.html">Feature 2 - Profile Management</a></p>
            <p><a href="/cart/shoppingcart.php">Feature 3 - Shopping Cart</a></p>
            <p><a href="/book/bookdetails.php?book=1">Feature 4 - Details</a></p>
            <p><a href="feat5-ratings\f5bookreview.html">Feature 5 - Ratings</a></p>
        </div>    
</body>

</html>