<?php
// Database connection details
$servername = "127.0.0.1";
$username = "root";
$password = ""; // Assuming empty password
$database = "household"; // Replace 'your_database_name' with your actual database name

header('Content-Type: application/json');
// Allow cross-origin resource sharing
header("Access-Control-Allow-Origin: *");

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch data from generalcensus table
$sql = "SELECT * FROM generalcensus";




$result = $conn->query($sql);

// Check if there are rows returned
if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
    echo json_encode($response);
}
// Close connection
$conn->close();
?>