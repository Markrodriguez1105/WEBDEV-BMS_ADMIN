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
        case 'getResident':
            $stmt = $conn->query("SELECT `resident_id` AS id, CONCAT( last_name, ', ', first_name, ' ', COALESCE( CONCAT(LEFT(middle_name, 1), '.'), '' ), ' ', COALESCE(suffix, '')) AS name FROM `resident` WHERE Status = 'Resident' ORDER BY name;");
            if ($stmt->num_rows > 0) {
                $result = array();
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
                $result = array();
                while ($row = $stmt->fetch_assoc()) {
                    $result[] = $row;
                }
                echo json_encode($result);
            }
            $stmt->close();
            break;
        case 'fetchAll':
            $stmt = $conn->query("SELECT * FROM `reqdoc` WHERE `archive` = 0;");

            if ($stmt->num_rows > 0) {
                $result = array();
                while ($row = $stmt->fetch_assoc()) {
                    $row = convert($row);
                    $result[] = $row;
                }
                echo json_encode($result);
            }
            $stmt->close();
            break;
        case 'getArchive':
            $stmt = $conn->query("SELECT * FROM `reqdoc` WHERE `archive` = 1;");

            if ($stmt->num_rows > 0) {
                $result = array();
                while ($row = $stmt->fetch_assoc()) {
                    $row = convert($row);

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
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }
            $stmt->close();
            break;
        case 'checkIdDublication':
            $stmt = $conn->prepare("SELECT certification_id FROM certification WHERE certification_id = ?");
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
        case 'getByCategory':
            $stmt = $conn->prepare("SELECT * FROM `reqdoc` WHERE `archive` = 0 && document_id = ?;");
            $stmt->bind_param("s", $req->document_id);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $row = convert($row);

                    $document[] = $row;
                }
                echo json_encode($document);
            }
            $stmt->close();
            break;
        case 'getCountDocuments':
            $stmt = $conn->prepare("SELECT COUNT(*) FROM `reqdoc` WHERE `archive` = 0;");
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $document = $result->fetch_column(0);
                echo json_encode($document);
            }
            $stmt->close();
            break;
        case 'getDocumentType':
            $stmt = $conn->query("SELECT document_type, document_id FROM reqdoc WHERE `archive` = 0 GROUP BY document_type ORDER BY 1;");
            if ($stmt->num_rows > 0) {
                while ($row = $stmt->fetch_assoc()) {
                    $result[] = $row;
                }
                echo json_encode($result);
            }
            $stmt->close();
            break;
        case 'getFilterPayment':
            $stmt = $conn->prepare("SELECT * FROM reqdoc WHERE  `archive` = 0 && payment_status = ?;");
            $stmt->bind_param("s", $req->status);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $row = convert($row);

                    $document[] = $row;
                }
                echo json_encode($document);
            }
            $stmt->close();
            break;
        case 'getFilterRelease':
            $stmt = $conn->prepare("SELECT * FROM reqdoc WHERE `archive` = 0 && isReleased = ?;");
            $stmt->bind_param("s", $req->status);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $row = convert($row);

                    $document[] = $row;
                }
                echo json_encode($document);
            }
            $stmt->close();
            break;
        case 'getDeclined':
            $stmt = $conn->query("SELECT * FROM reqdoc AS rd RIGHT JOIN declined_cert AS dc ON rd.certification_id = dc.certification_id;");
            if ($stmt->num_rows > 0) {
                while ($row = $stmt->fetch_assoc()) {
                    $row = convert($row);

                    $document[] = $row;
                }
                echo json_encode($document);
            }
            $stmt->close();
            break;
        case 'getPrice':
            $stmt = $conn->prepare("SELECT cost FROM `document` WHERE `document_id` = ?;");
            $stmt->bind_param("s", $req->document_id);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $document = $result->fetch_assoc();
            }
            echo json_encode($document);
            $stmt->close();
            break;
        case 'statusExist':
            $stmt = $conn->prepare("SELECT * FROM `doc_status` WHERE `certification_id` = ?;");
            $stmt->bind_param("s", $req->certification_id);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $result = $result->fetch_assoc();
                $result['doc_status'] = $result['doc_status'] == '1' ? 'Approved' : 'Declined';
                echo json_encode($result);
            }
            $stmt->close();
            break;
    }
}
function convert($row)
{
    //Convert Payment Status
    $converted = $row;

    if ($row['payment_status'] == '1') {
        $converted['payment_status'] = 'Paid';
    } else {
        $converted['payment_status'] = 'Not Paid';
    }

    //Convert Release Status
    if ($row['isReleased'] == '1') {
        $converted['isReleased'] = 'Released';
    } else {
        $converted['isReleased'] = 'Not Released';
    }

    //Convert Doc Status
    if ($row['doc_status'] == '1') {
        $converted['doc_status'] = 'Approved';
    } else if ($row['doc_status'] == '0') {
        $converted['doc_status'] = 'Declined';
    } else {
        $converted['doc_status'] = 'Pending';
    }

    return $converted;
}
