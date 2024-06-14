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

    switch ($req->action) {
        case 'getId':
            $stmt = $conn->prepare("SELECT `certification_id` FROM `certification` WHERE `certification_id` = ?;");
            $stmt->bind_param("s", $req->id);
            $stmt->execute();
            if ($stmt->num_rows() > 0) {
                echo json_encode(false);
            } else {
                echo json_encode(true);
            }
            $stmt->close();
            break;
        case 'getAll':
            $stmt = $conn->query("SELECT `resident_id` AS id, CONCAT(first_name,
                            IF(LENGTH(middle_name) > 0, CONCAT(' ', LEFT(middle_name, 1), '.'),''),' ',last_name) AS name FROM `resident`;");
            if ($stmt->num_rows > 0) {
                while ($row = $stmt->fetch_assoc()) {
                    $result[] = $row;
                }
                echo json_encode($result);
            }
            $stmt->close();
            break;

        case 'getDocs':
            $stmt = $conn->query("SELECT * FROM `document`;");
            if ($stmt->num_rows > 0) {
                while ($row = $stmt->fetch_assoc()) {
                    $result[] = $row;
                }
                echo json_encode($result);
            }
            $stmt->close();
            break;
        case 'getReq':
            $stmt = $conn->query("SELECT c.certification_id, c.phone_num, c.email, d.description as document_type, c.date_requested as date_request, c.purpose, r.first_name as fname, r.middle_name as mname, r.last_name as lname, r.suffix, r.zone,
                CASE
                WHEN tc.document_id IS NOT NULL THEN 'Paid'
                ELSE 'Pending' END AS payment_status
                FROM `certification` AS c JOIN resident AS r ON c.resident_id = r.resident_id LEFT JOIN certificationtreasury AS tc ON tc.document_id = c.certification_id JOIN document as d ON d.document_id = c.document_id;");
            if ($stmt->num_rows > 0) {
                while ($row = $stmt->fetch_assoc()) {
                    $result[] = $row;
                }
                echo json_encode($result);
            }
            $stmt->close();
            break;
        case 'cedulaValidate':
            $stmt = $conn->prepare("SELECT * FROM cedula WHERE resident_id = ?");
            $stmt->bind_param("s", $req->id);
            $stmt->execute();
            $stmt->store_result();
            if ($stmt->num_rows > 0) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }
            $stmt->close();
            break;
    }
}
