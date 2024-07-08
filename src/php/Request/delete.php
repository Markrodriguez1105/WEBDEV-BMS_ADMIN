<?php
include 'ConnectDB.php';

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

switch ($req->action) {
    case 'deleteDocStatus':
        $stmt = $conn->prepare("DELETE FROM `doc_status` WHERE `certification_id` = ?;");
        $stmt->bind_param("s", $req->certification_id);
        if ($stmt->execute()) {
            echo json_encode(true);
        } else {
            echo json_encode(false);
        }
        $stmt->close();
        break;
}
$conn->close();
