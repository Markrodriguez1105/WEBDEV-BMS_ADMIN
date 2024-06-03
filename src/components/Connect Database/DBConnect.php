<?php

// Allow from any origin
header('Access-Control-Allow-Origin: *');

// Allow specific methods
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');

// Allow specific headers
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bbis";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
