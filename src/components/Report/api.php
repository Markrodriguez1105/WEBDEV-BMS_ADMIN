<?php
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "bbis"; 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    $sql = "SELECT * FROM reports";
    $result = $conn->query($sql);
    $reports = [];
    while($row = $result->fetch_assoc()) {
      $reports[] = $row;
    }
    echo json_encode($reports);
    break;

  case 'POST':
    $data = json_decode(file_get_contents('php://input'), true);
    $sql = "INSERT INTO reports (fullName, phone, email, address, dateRecorded, reportType, reportStatus, purpose) VALUES ('".$data['fullName']."', '".$data['phone']."', '".$data['email']."', '".$data['address']."', '".$data['dateRecorded']."', '".$data['reportType']."', '".$data['reportStatus']."', '".$data['purpose']."')";
    if ($conn->query($sql) === TRUE) {
      echo json_encode(["message" => "New record created successfully"]);
    } else {
      echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
    break;

  case 'PUT':
    $data = json_decode(file_get_contents('php://input'), true);
    $sql = "UPDATE reports SET fullName='".$data['fullName']."', phone='".$data['phone']."', email='".$data['email']."', address='".$data['address']."', dateRecorded='".$data['dateRecorded']."', reportType='".$data['reportType']."', reportStatus='".$data['reportStatus']."', purpose='".$data['purpose']."' WHERE id=".$data['id'];
    if ($conn->query($sql) === TRUE) {
      echo json_encode(["message" => "Record updated successfully"]);
    } else {
      echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
    break;

  case 'DELETE':
    $data = json_decode(file_get_contents('php://input'), true);
    $sql = "DELETE FROM reports WHERE id=".$data['id'];
    if ($conn->query($sql) === TRUE) {
      echo json_encode(["message" => "Record deleted successfully"]);
    } else {
      echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
    break;
}

$conn->close();
?>