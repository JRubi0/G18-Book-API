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
                    <a href="searchresults.php?ORDER_BY=author_name&resultsPerPage=" onclick="window.location=this.href+document.getElementById('perPage').value;return false;">Sort by Author</a>
                </p>
                <p>
                    <a href="searchresults.php?ORDER_BY=Title&resultsPerPage=" onclick="window.location=this.href+document.getElementById('perPage').value;return false;">Sort by Title</a>
                </p>
                <p>
                    <a href="searchresults.php?ORDER_BY=rating&ORDER_TYPE=DESC&resultsPerPage=" onclick="window.location=this.href+document.getElementById('perPage').value;return false;">Sort by Rating</a>
                </p>
                <p>
                    <a href="searchresults.php?ORDER_BY=price&resultsPerPage=" onclick="window.location=this.href+document.getElementById('perPage').value;return false;">Sort by Price</a>
                </p>
                <p>
                    <a href="searchresults.php?WHERE_Top=10">Top Sellers</a> 
                </p>
                <a href="searchresults.php?WHERE_Rating=0&resultsPerPage=" onclick="window.location=this.href+document.getElementById('perPage').value;return false;">Rating >= 1</a>   
                <a href="searchresults.php?WHERE_Rating=1&resultsPerPage=" onclick="window.location=this.href+document.getElementById('perPage').value;return false;">Rating >= 2</a>   
                <a href="searchresults.php?WHERE_Rating=2&resultsPerPage=" onclick="window.location=this.href+document.getElementById('perPage').value;return false;">Rating >= 3</a>   
                <a href="searchresults.php?WHERE_Rating=3&resultsPerPage=" onclick="window.location=this.href+document.getElementById('perPage').value;return false;">Rating >= 4</a>   
                <a href="searchresults.php?WHERE_Rating=4&resultsPerPage=" onclick="window.location=this.href+document.getElementById('perPage').value;return false;">Rating >= 5</a>  
                <input type="text" placeholder="What are you looking for?" id="criteria" name="criteria" onclick="value=''">
                <a href="searchresults.php?WHERE_Author=" onclick="window.location=this.href+document.getElementById('criteria').value;return false;">Search Author</a>  
                <a href="searchresults.php?WHERE_Title=" onclick="window.location=this.href+document.getElementById('criteria').value;return false;">Search Titles</a> 
            </div>   
            <?php
            echo "<html>
                <body>
                <table> 
                    <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Author</th>
                        <th>Rating</th>
                        <th>Price</th>
                    </tr>";
            $argd = 10;
            if (isset($_GET['resultsPerPage'])){
                $argd = $_GET['resultsPerPage'];
            }
            if (isset($_GET['pageNumber'])){
                $arge = $_GET['pageNumber'];
            }
            else {
                $arge = 0;
            }
            if (isset($_GET['ORDER_BY'])){ 
                $argc = $_GET['ORDER_BY'];
                $argv = "ASC";
                if (isset($_GET['ORDER_TYPE'])){
                    $argv = $_GET['ORDER_TYPE'];
                }
                $result = pg_query($con, " SELECT book.book_id, title, genre, author_name, price, ROUND(AVG(star_rating), 1) AS rating 
                                            FROM book, author, book_author, reviews 
                                            WHERE book.book_id = book_author.book_id AND author.author_id = book_author.author_id AND reviews.book_id = book.book_id
                                            GROUP BY book.book_id, author_name
                                            ORDER BY $argc $argv LIMIT $argd" ); 
            }
            else if (isset($_GET['WHERE_Author'])){
                $argc = $_GET['WHERE_Author'];
                $result = pg_query($con, " SELECT book.book_id, title, genre, author_name, price, ROUND(AVG(star_rating), 1) AS rating
                                            FROM book, author, book_author, reviews 
                                            WHERE book.book_id = book_author.book_id AND author.author_id = book_author.author_id AND reviews.book_id = book.book_id AND LOWER(author_name) LIKE LOWER('%$argc%')
                                            GROUP BY book.book_id, author_name"); 
            }
            else if (isset($_GET['WHERE_Title'])){
                $argc = $_GET['WHERE_Title'];
                $result = pg_query($con, " SELECT book.book_id, title, genre, author_name, price, ROUND(AVG(star_rating), 1) AS rating
                                            FROM book, author, book_author, reviews 
                                            WHERE book.book_id = book_author.book_id AND author.author_id = book_author.author_id AND reviews.book_id = book.book_id AND LOWER(title) LIKE LOWER('%$argc%')
                                            GROUP BY book.book_id, author_name"); 
            }
            else if (isset($_GET['WHERE_Rating'])){
                $argc = $_GET['WHERE_Rating'];
                $result = pg_query($con, " SELECT DISTINCT book.book_id, title, genre, author_name, price, ROUND(AVG(star_rating), 1) as rating
                                            FROM book, author, book_author, reviews
                                            WHERE book.book_id = book_author.book_id AND author.author_id = book_author.author_id AND reviews.book_id = book.book_id
                                            GROUP BY book.book_id, author_name, star_rating, review_id
                                            HAVING AVG(star_rating) > $argc
                                            LIMIT $argd OFFSET $arge" ); 
            }
            else if (isset($_GET['WHERE_Genre'])){
                $argc = $_GET['WHERE_Genre'];
                $result = pg_query($con, " SELECT DISTINCT book.book_id, title, genre, author_name, price, ROUND(AVG(star_rating), 1) as rating
                                            FROM book, author, book_author, reviews
                                            WHERE book.book_id = book_author.book_id AND author.author_id = book_author.author_id AND reviews.book_id = book.book_id AND LOWER(genre) LIKE LOWER('%$argc%')
                                            GROUP BY book.book_id, author_name, star_rating, review_id
                                            LIMIT $argd OFFSET $arge" ); 
            }
            else if (isset($_GET['WHERE_Top'])){
                $argc = $_GET['WHERE_Top'];
                $result = pg_query($con, " SELECT DISTINCT book.book_id, title, genre, author_name, price, ROUND(AVG(star_rating), 1) as rating
                                                FROM book, author, book_author, reviews
                                                WHERE book.book_id = book_author.book_id AND author.author_id = book_author.author_id AND reviews.book_id = book.book_id AND book.book_id 
                                                    IN (SELECT book_id FROM book GROUP BY book_id ORDER BY copies_sold LIMIT $argd)
                                                GROUP BY book.book_id, author_name" ); 
            }
            while ($row = pg_fetch_assoc($result) ){
                echo   "<tr>
                            <td>".$row['book_id']."</td>
                            <td><a href='../book/bookdetails.php?book=$row[book_id]'>".$row['title']."</a></td>
                            <td><a href='searchresults.php?WHERE_Genre=$row[genre]'>".$row['genre']."</a></td>
                            <td>".$row['author_name']."</td>
                            <td>".$row['rating']."</td>
                            <td>".$row['price']."</td>
                        </tr>";
                }
                echo  "</table></body></htmml>";
            ?> 
        </div>
        <label for="perPage"> Results per page:</label>
                <select name="perPage" id="perPage" onchange="this.form.submit()">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="45">45</option>
                </select> 
                <label for="pageNumber"> Page:</label>
                <select name="pageNumber" id="pageNumber" onchange="this.form.submit()">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select> 
    </body>
</html>