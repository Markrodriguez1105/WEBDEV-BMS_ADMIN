<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "bms";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json');

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}
$req = json_decode(file_get_contents("php://input"));

if($req){
    $stmt = $conn->prepare("SELECT au.admin_id, o.position_id, p.description, o.first_name, o.middle_name, o.last_name, o.suffix FROM admin_user AS au JOIN official AS o ON au.admin_id = o.official_id JOIN position AS p ON p.position_id = o.position_id WHERE au.username = ? && au.password = ?;");
    $stmt->bind_param("ss", $req->username, $req->password);
    $stmt->execute();
    $result = $stmt->get_result();
    if($result->num_rows > 0){
        echo json_encode($result->fetch_object());
    }
    $conn->close();
}
?>