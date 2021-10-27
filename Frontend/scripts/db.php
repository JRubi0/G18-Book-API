<?php

$host = "archegos.ddns.net";
$port = "5432";
$user = "client";
$password = "Group18";
$dbname = "BookStore";

$con = pg_connect("host=$host dbname=$dbname user=$user password=$password"); 

if(!$con)
{
    die("Connection failed!");
}