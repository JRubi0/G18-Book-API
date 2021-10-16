<?php
  include '../scripts/db.php'
?>

<!DOCTYPE html>
<head>
<title>Insert data to PostgreSQL with php - creating a simple web application</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style>
li {list-style: none;}
</style>
</head>
<body>
<h2><?php $query = "INSERT INTO book VALUES ('$_POST[book_id]','$_POST[title]'"; ?> </h2>
<ul>
<form name="insert" action="insert.php" method="POST" >
<li>Book ID:</li><li><input type="text" name="bookid" /></li>
<li>Book Name:</li><li><input type="text" name="book_name" /></li>
<li>Author:</li><li><input type="text" name="author" /></li>
<li>Publisher:</li><li><input type="text" name="publisher" /></li>
<li>Date of publication:</li><li><input type="text" name="dop" /></li>
<li>Price (USD):</li><li><input type="text" name="price" /></li>
<li><input type="submit" /></li>
</form>
</ul>
</body>
</html>
<?php
/*$db = pg_connect("host=archegos.ddns.net port=5432 dbname=BookStore user=juanrubio password=Group18");*/
$query = "INSERT INTO book VALUES ('$_POST[book_id]','$_POST[title]',
'$_POST[author]','$_POST[publisher]','$_POST[dop]',
'$_POST[price]')";
$result = pg_query($query); 
?>