<?php
// Include the database connection file
include 'DBConnect.php';

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}, Content-Type");
    }
    exit(0);
}

$received_data = json_decode(file_get_contents("php://input"), true);
$response = array();

if ($received_data) {
    $action = $received_data['action'];
    $clearance_id = isset($received_data['clearance_id']) ? $received_data['clearance_id'] : null;
    $clearance_name = $received_data['clearance_name'];
    $clearance_owner_name = $received_data['clearance_owner_name'];
    $clearance_tin = $received_data['clearance_tin'];
    $date_issued = $received_data['date_issued'];

    // Logging received data for debugging
    error_log("Received data: " . print_r($received_data, true));

    // Insert action
    if ($action == 'insert') {
        error_log("Inserting data into database...");
        $sql = "INSERT INTO `clearance`(`clearance_name`, `clearance_owner_name`, `clearance_tin`, `date_issued`) 
                VALUES (?, ?, ?, ?)";

        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("ssss", $clearance_name, $clearance_owner_name, $clearance_tin, $date_issued);

            if ($stmt->execute()) {
                $response['message'] = "New clearance created successfully";
            } else {
                error_log("Insert Error: " . $stmt->error);
                $response['error'] = "Error executing statement: " . $stmt->error;
            }
            $stmt->close();
        } else {
            error_log("Insert Statement Preparation Error: " . $conn->error);
            $response['error'] = "Error preparing statement: " . $conn->error;
        }
    }

    // Update action
    if ($action == 'update') {
        error_log("Updating data in database...");
        $sql = "UPDATE `clearance` SET 
                    `clearance_name`=?, 
                    `clearance_owner_name`=?, 
                    `clearance_tin`=?, 
                    `date_issued`=?
                WHERE `clearance_id` = ?";

        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("sssss", $clearance_name, $clearance_owner_name, $clearance_tin, $date_issued, $clearance_id);

            if ($stmt->execute()) {
                $response['message'] = "Clearance updated successfully";
            } else {
                error_log("Update Error: " . $stmt->error);
                $response['error'] = "Error executing statement: " . $stmt->error;
            }
            $stmt->close();
        } else {
            error_log("Update Statement Preparation Error: " . $conn->error);
            $response['error'] = "Error preparing statement: " . $conn->error;
        }
    }

    // Delete action
    if ($action == 'delete') {
        error_log("Deleting data from database...");
        $sql = "DELETE FROM `clearance` WHERE `clearance_id` = ?";

        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("s", $clearance_id);

            if ($stmt->execute()) {
                $response['message'] = "Clearance deleted successfully";
            } else {
                error_log("Delete Error: " . $stmt->error);
                $response['error'] = "Error executing statement: " . $stmt->error;
            }
            $stmt->close();
        } else {
            error_log("Delete Statement Preparation Error: " . $conn->error);
            $response['error'] = "Error preparing statement: " . $conn->error;
        }
    }
} else {
    $response['error'] = "No data received";
}

header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>
