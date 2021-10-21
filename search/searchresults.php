<?php
  include '../scripts/db.php' //Database connect script (put this at the top of your page)
?>


<!DOCTYPE HTML>
<html>
    <head>
        <title>Search</title>
        <link rel = "stylesheet" type = "text/css" href = 'Format.css'>
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
                        <li><a href="search/searchresults.php?ORDER_BY=Title">Wishlist</a></li>
                        <li><a href="#">Profile</a></li>
                        <li><a href="../cart/shoppingcart.php">Checkout</a></li>
                    </ul>
                </nav>
            </div>     
        </header>

    <body>
        <div class = "ShoppingCartContainer">
            <div class = "CartHeader">
                <p>
                    <a href="searchresults.php?ORDER_BY=author_name">Order by Author</a>
                </p>
                <p>
                    <a href="searchresults.php?ORDER_BY=Title">Order by Title</a>
                </p>
                <p>
                    <a href="searchresults.php?ORDER_BY=rating">Order by Rating</a>
                </p>
                <input type="text" placeholder="What are you looking for?" id="criteria" name="criteria" value="criteria">
                <a href="searchresults.php?WHERE_Author=" onclick="window.location=this.href+document.getElementById('criteria').value;return false;">Search Author</a>  
                <a href="searchresults.php?WHERE_Title=" onclick="window.location=this.href+document.getElementById('criteria').value;return false;">Search Titles</a>  
            </div>   
            <?php
            echo "<html>
                <body>
                <table>
                    <tr>
                        <th>Book ID</th>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Author</th>
                        <th>Rating</th>
                    </tr>";
            if (isset($_GET['ORDER_BY'])){ 
                $argc = $_GET['ORDER_BY'];
                $result = pg_query($con, " SELECT book.book_id, title, genre, author_name FROM book, author, book_author WHERE book.book_id = book_author.book_id AND author.author_id = book_author.author_id ORDER BY $argc"); 
            }
            else if (isset($_GET['WHERE_Author'])){
                $argc = $_GET['WHERE_Author'];
                $result = pg_query($con, " SELECT book.book_id, title, genre, author_name FROM book, author, book_author WHERE book.book_id = book_author.book_id AND author.author_id = book_author.author_id AND author_name LIKE '%$argc%'"); 
            }
            else if (isset($_GET['WHERE_Title'])){
                $argc = $_GET['WHERE_Title'];
                $result = pg_query($con, " SELECT book.book_id, title, genre, author_name FROM book, author, book_author WHERE book.book_id = book_author.book_id AND author.author_id = book_author.author_id AND title LIKE '%$argc%'"); 
            }
            else{

            }
            
            while ($row = pg_fetch_assoc($result) ){
                echo   "<tr>
                            <td>".$row['book_id']."</td>
                            <td><a href='../book/bookdetails.php?book=$row[book_id]'>".$row['title']."</a></td>
                            <td>".$row['genre']."</td>
                            <td>".$row['author_name']."</td>
                        </tr>";
                }
                echo  "</table></body></htmml>";
            ?> 
        </div>
    </body>
</html>