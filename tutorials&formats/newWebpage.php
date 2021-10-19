<!--This file is a sample page format we should be using in all of our pages. Feel free to copy this to create new pages!-->
<!--Page top hotbar-->
<?php
  include '../scripts/db.php' //Database connect script (put this at the top of your page)
?>

<!DOCTYPE HTML>
<html>
<head>
    <title>Header Text goes here</title>
    <link rel = "stylesheet" type = "text/css" href = "./stylecopy.css">
    <link href = "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,900" rel="stylesheet">
    <script src="../scripts/jquery.js"></script>  <!--Includes JQuery-->
</head>

<body>
    <header> 
        <div class = "container">
            <img src = "assets/logo.png" alt = "logo" class = "logo"> <!--FIX ME-->
            <nav>
                <ul>
                    <li><a href="../index.php">Home</a></li> <!--replace # with other pages-->
                    <li><a href="#">Search</a></li>
                    <li><a href="#">Wishlist</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Checkout</a></li>
                </ul>
            </nav>
        </div>     
    </header>
    <div>

    </div>
<!--End of page hotbar-->

    <div class = "ShoppingCartContainer">
        <div class = "CartHeader">
            <h3 class = "Heading" > Shopping Cart </h3>
            <h5 class = "Action" > Remove all </h5>
        </div>
        <div class = "image-box" > </div>

        <div class = "Cart-Items">
            Book Details
            <div class = "counter"> Number of items and cost </div>
        </div>
        <div class="checkout">
            <div class="total">
                <div>
                    <div class="Subtotal">Sub-Total</div>
                    <div class="items">0 items</div>
                </div>
                <div class="total-amount">$0.00</div>
            </div>
            <button class="button">Checkout</button></div>
    </div>
</body>
</html>