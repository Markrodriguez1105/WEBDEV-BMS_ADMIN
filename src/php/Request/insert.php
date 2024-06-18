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
if ($req) {

    if ($req->action == 'insert') {
        $stmt = $conn->prepare("INSERT INTO certification (certification_id, resident_id, phone_num, email, document_id, purpose, release_date) VALUES (?, ?, ?, ?, ?, ?, ?);");
        $stmt->bind_param("sssssss", $req->certification, $req->resident_id, $req->phone_num, $req->email, $req->document_type, $req->purpose, $req->release_date);
        $result = $stmt->execute();
        if ($result) {
            echo json_encode(false);
        } else {
            echo json_encode(true);
        }
        $stmt->close();
    }

    if ($req->action == 'insertPayment') {
        $stmt = $conn->prepare("INSERT INTO `certificationtreasury` (`document_id`, `stamp_fee`, `document_cost`, `fee`) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $req->certification, $req->stamp_fee, $req->document_cost, $req->fee);
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => $stmt->error]);
        }
        $stmt->close();
    }

}
$conn->close();
