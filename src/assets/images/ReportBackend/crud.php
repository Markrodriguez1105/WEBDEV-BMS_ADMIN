<?php
// Include the database connection file
include 'DBConnect.php';

$response = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $received_data = json_decode(file_get_contents("php://input"));

    if ($received_data && isset($received_data->action)) {
        // Check if the action is 'insert', 'update', or 'delete'
        $action = $received_data->action;

        // Check if the received data contains required fields
        if (
            isset($received_data->resident_id) && isset($received_data->first_name) &&
            isset($received_data->middle_name) && isset($received_data->last_name) &&
            isset($received_data->suffix) && isset($received_data->report_type) &&
            isset($received_data->date_recorded) && isset($received_data->email) &&
            isset($received_data->phone_num) && isset($received_data->zone_address) &&
            isset($received_data->reason) && isset($received_data->status) &&
            isset($received_data->report_status) && isset($received_data->InOutBarangay)
        ) {
            $report_id = isset($received_data->report_id) ? $received_data->report_id : null;
            $resident_id = $received_data->resident_id;
            $first_name = $received_data->first_name;
            $middle_name = $received_data->middle_name;
            $last_name = $received_data->last_name;
            $suffix = $received_data->suffix;
            $report_type = $received_data->report_type;
            $date_recorded = $received_data->date_recorded;
            $email = $received_data->email;
            $phone_num = $received_data->phone_num;
            $zone_address = $received_data->zone_address;
            $reason = $received_data->reason;
            $status = $received_data->status;
            $report_status = $received_data->report_status;
            $InOutBarangay = $received_data->InOutBarangay;

            // Perform actions based on the received action type
            switch ($action) {
                case 'insert':
                    $sql = "INSERT INTO report (resident_id, first_name, middle_name, last_name, suffix, report_type, date_recorded, email, phone_num, zone_address, reason, status, report_status, InOutBarangay) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param("issssssssssss", $resident_id, $first_name, $middle_name, $last_name, $suffix, $report_type, $date_recorded, $email, $phone_num, $zone_address, $reason, $status, $report_status, $InOutBarangay);

                    if ($stmt->execute()) {
                        $response['message'] = "New report created successfully";
                    } else {
                        $response['error'] = "Error: " . $stmt->error;
                    }
                    $stmt->close();
                    break;

                case 'update':
                    // Ensure report_id is set for update action
                    if ($report_id) {
                        $sql = "UPDATE report SET resident_id = ?, first_name = ?, middle_name = ?, last_name = ?, suffix = ?, report_type = ?, date_recorded = ?, email = ?, phone_num = ?, zone_address = ?, reason = ?, status = ?, report_status = ?, InOutBarangay = ? WHERE report_id = ?";

                        $stmt = $conn->prepare($sql);
                        $stmt->bind_param("issssssssssssi", $resident_id, $first_name, $middle_name, $last_name, $suffix, $report_type, $date_recorded, $email, $phone_num, $zone_address, $reason, $status, $report_status, $InOutBarangay, $report_id);

                        if ($stmt->execute()) {
                            $response['message'] = "Report updated successfully";
                        } else {
                            $response['error'] = "Error: " . $stmt->error;
                        }
                        $stmt->close();
                    } else {
                        $response['error'] = "Error: report_id is required for update action";
                    }
                    break;

                case 'delete':
                    if ($report_id) {
                        $sql = "DELETE FROM report WHERE report_id = ?";

                        $stmt = $conn->prepare($sql);
                        $stmt->bind_param("i", $report_id);

                        if ($stmt->execute()) {
                            $response['message'] = "Report deleted successfully";
                        } else {
                            $response['error'] = "Error: " . $stmt->error;
                        }
                        $stmt->close();
                    } else {
                        $response['error'] = "Error: report_id is required for delete action";
                    }
                    break;

                default:
                    $response['error'] = "Error: Invalid action specified";
                    break;
            }
        } else {
            $response['error'] = "Error: Missing required fields";
        }
    } else {
        $response['error'] = "Error: No action specified or invalid JSON data received";
    }
} else {
    $response['error'] = "Error: Only POST requests are allowed";
}

header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>
