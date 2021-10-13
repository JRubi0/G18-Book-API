<?php
    include 'dbquery.php'
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="style.css">
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script>
        //JQuery code here!
        </script>
        </head>
        
        <body>
            <div id="comments">
                <?php
                    $sql = "SELECT * FROM book LIMIT 2;"
                    $result = mysqli_query($conn, $sql);
                    if (mysqli_num_rows() > 0)
                    {
                        while ($row = mysqli_fetch_assoc($result))
                        echo "<p>";
                        echo $row['book_id'];
                        echo "<br>";
                        echo $row['title'];
                        echo "</p>";
                    }
                    
                    else
                    {
                        echo "There are no titles!";
                    }
                ?>
            </div>

            <button>Show more comments</button>
        </body>
</html>