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
    case 'insertDocStatus':
        $stmt = $conn->prepare("INSERT INTO `doc_status`(`certification_id`, `doc_status`, `remarks`) VALUES (?,?,?);");
        $stmt->bind_param("sss", $req->certification_id, $req->doc_status, $req->remarks);
        if ($stmt->execute()) {
            echo json_encode(true);
        } else {
            echo json_encode(false);
        }
        $stmt->close();
        break;
    case 'insertPayment':
        $stmt = $conn->prepare("INSERT INTO `certificationtreasury` (`document_id`, `stamp_fee`, `document_cost`, `fee`) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $req->certification, $req->stamp_fee, $req->document_cost, $req->fee);
        if ($stmt->execute()) {
            echo json_encode(true);
        } else {
            echo json_encode(false);
        }
        $stmt->close();
    case 'insert':
        $stmt = $conn->prepare("INSERT INTO certification (certification_id, resident_id, phone_num, email, document_id, purpose, release_date) VALUES (?, ?, ?, ?, ?, ?, ?);");
        $stmt->bind_param("sssssss", $req->certification, $req->id, $req->phone_num, $req->email, $req->document_type, $req->purpose, $req->release_date);
        if ($stmt->execute()) {
            echo json_encode(true);
        } else {
            echo json_encode(false);
        }
        $stmt->close();
}
$conn->close();
