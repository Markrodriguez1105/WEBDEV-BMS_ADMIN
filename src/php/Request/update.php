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
        case 'updateArchive':
            $stmt = $conn->prepare("UPDATE `certification` SET `archive`= ? WHERE `certification_id` = ?;");
            $stmt->bind_param("ss", $req->archive, $req->id);
            $stmt->execute();
            if ($stmt->affected_rows > 0) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }
            break;
        case 'updateReq':
            $stmt = $conn->prepare("UPDATE `certification` SET `phone_num`=?,`email`=?,`document_id`=?,`release_date`=?,`purpose`=? WHERE `certification_id` = ?;");
            $stmt->bind_param("ssssss", $req->phone_num, $req->email, $req->document_id, $req->release_date, $req->purpose, $req->certification_id);
            $stmt->execute();
            if ($stmt->affected_rows > 0) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }
            break;
        case 'updateRelease':
            $stmt = $conn->prepare("UPDATE `certification` SET `isReleased`= ? WHERE `certification_id` = ?;");
            $stmt->bind_param("ss", $req->isReleased, $req->id);
            $stmt->execute();
            if ($stmt->affected_rows > 0) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }
            break;
        case 'updateDocStatus':
            $stmt = $conn->prepare("UPDATE `doc_status` SET `doc_status`= ?, `date_status`= LOCALTIMESTAMP, `remarks`= ? WHERE `certification_id` = ?;");
            $stmt->bind_param("sss", $req->doc_status, $req->remarks, $req->certification_id);
            $stmt->execute();
            if ($stmt->affected_rows > 0) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }
            break;
    }
    $conn->close();
}
