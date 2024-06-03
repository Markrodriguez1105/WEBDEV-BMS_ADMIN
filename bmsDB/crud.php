<?php
// Include the database connection file
include 'DBConnect.php';

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

$received_data = json_decode(file_get_contents("php://input"), true);
$response = array();

if ($received_data) {
    $action = $received_data['action'];
    $business_id = $received_data['business_id'];
    $barangay_id = $received_data['barangay_id'];
    $business_name = $received_data['business_name'];
    $business_type = $received_data['business_type'];
    $first_name = $received_data['first_name'];
    $middle_name = $received_data['middle_name'];
    $last_name = $received_data['last_name'];
    $owner_phone_num = $received_data['owner_phone_num'];
    $address = $received_data['address'];
    $monthly_income = $received_data['monthly_income'];
    $date_establishment = $received_data['date_establishment'];
    $tin = $received_data['tin'];
    $vat_status = $received_data['vat_status'];
    $num_employees = $received_data['num_employees'];
    $date_registered = $received_data['date_registered'];
    $owner_email = $received_data['owner_email'];
    $active_status = $received_data['active_status'];

    // Logging received data for debugging
    error_log("Received data: " . print_r($received_data, true));

    // Insert action
    if ($action == 'insert') {
        // Insert logging
        error_log("Inserting data into database...");

        $sql = "INSERT INTO `business`(`business_id`, `barangay_id`, `business_name`, `business_type`, `first_name`, `middle_name`, `last_name`, `owner_phone_num`, `address`, `monthly_income`, `date_establishment`, `tin`, `vat_status`, `num_employees`, `date_registered`, `owner_email`, `active_status`) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("sssssssssssssssss", $business_id, $barangay_id, $business_name, $business_type, $first_name, $middle_name, $last_name, $owner_phone_num, $address, $monthly_income, $date_establishment, $tin, $vat_status, $num_employees, $date_registered, $owner_email, $active_status);

            if ($stmt->execute()) {
                $response['message'] = "New record created successfully";
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
    // Update logging
    error_log("Updating data in database...");

    $sql = "UPDATE `business` SET `barangay_id`=?, `business_name`=?, `business_type`=?, `first_name`=?, `middle_name`=?, `last_name`=?, `owner_phone_num`=?, `address`=?, `monthly_income`=?, `date_establishment`=?, `tin`=?, `vat_status`=?, `num_employees`=?, `date_registered`=?, `owner_email`=?, `active_status`=? WHERE `business_id` = ?";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sssssssssssssssss", $barangay_id, $business_name, $business_type, $first_name, $middle_name, $last_name, $owner_phone_num, $address, $monthly_income, $date_establishment, $tin, $vat_status, $num_employees, $date_registered, $owner_email, $active_status, $business_id);

        if ($stmt->execute()) {
            $response['message'] = "Record updated successfully";
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
        // Delete logging
        error_log("Deleting data from database...");

        $sql = "DELETE FROM `business` WHERE `business_id` = ?";

        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("s", $business_id);

            if ($stmt->execute()) {
                $response['message'] = "Record deleted successfully";
            } else {
                error_log("Delete Error: " . $stmt->error);
                $response['error'] = "Error executing statement: " . $stmt->error;
            }
            
            $stmt->close(); // Close the statement
        } else {
            error_log("Delete Statement Preparation Error: " . $conn->error);
            $response['error'] = "Error preparing statement: " . $conn->error;
        }
    }
}

header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>
