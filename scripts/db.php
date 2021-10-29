<?php

$host = "archegos.ddns.net";
$port = "5432";
$user = "Customer";
$password = "CEN4010";
$dbname = "BookStore";

$con = pg_connect("host=$host dbname=$dbname user=$user password=$password"); 

if(!$con)
{
    die("Connection failed!");
}