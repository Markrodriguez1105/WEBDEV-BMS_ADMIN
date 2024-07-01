<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bms";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from database
$sql = "SELECT * FROM clearance";
$result = $conn->query($sql);

$clearances = [];
if ($result->num_rows > 0) {
    // Fetch associative array
    while($row = $result->fetch_assoc()) {
        $clearances[] = $row;
    }
}

// Output JSON response
echo json_encode($clearances);

// Close connection
$conn->close();
?>
