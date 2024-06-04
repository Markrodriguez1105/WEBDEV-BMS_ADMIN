<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bms";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM business"; // Replace with your actual table name
$result = $conn->query($sql);

$businessRecords = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $businessRecords[] = $row;
    }
}

echo json_encode($businessRecords);

$conn->close();
?>
