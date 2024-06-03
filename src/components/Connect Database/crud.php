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
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}

$received_data = json_decode(file_get_contents("php://input"));
// Extract data
if ($received_data) {
    $resident_id = $received_data->resident;
    $first_name = $received_data->$first_name;
    $middle_name = $received_data->$middle_name;
    $last_name = $received_data->$last_name;
    $suffix = $received_data->$suffix;
    $gender = $received_data->gender;
    $address = $received_data->address;
    $contNum = $received_data->contNum;
    $email = $received_data->email;
    $birth = $received_data->birth;
    $zone = $received_data->zone;
    $barangay_id = $received_data->barangay_id;
    $nationality = $received_data->nationality;
    $living_duration = $received_data->living_duration;
    $birth_place = $received_data->birth_place;
    $relation_to_family_head = $received_data->relation_to_family_head;
    $height = $received_data->height;
    $weight = $received_data->weight;
    $educ_attainment = $received_data->educ_attainment;
    $with_disability = $received_data->with_disability;
    $personal_income = $received_data->personal_income;
    $source_of_income = $received_data->source_of_income;
    $voter_status = $received_data->voter_status;
    $religion = $received_data->religion;
    $occupation = $received_data->occupation;
    $civilStat = $received_data->civilStat;
    $household_id = $received_data->household_id;
    $Status = $received_data->Status;

    if ($received_data->action == 'insert') {
        $sql = "INSERT INTO resident(resident_id, first_name, middle_name, last_name, suffix, phone_num, email, birth_date, gender, zone, barangay_id, voter_status, nationality, religion, blood_type, occupation, source_of_income, living_duration, birth_place, civil_status, household_id, relation_to_family_head, weight, height, education_attainment, with_disability, personal_income, Status)
         VALUES (,,,,,,,,,,,,,,,,,,,,,,,,,,,,)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssssssisissssssissisdssds",  $resident_id,  $first_name,  $middle_name,  $last_name,  $suffix,  $phone_num,  $email,  $birth_date,  $gender,  $zone,  $barangay_id,  $voter_status,  $nationality,  $religion,  $blood_type,  $occupation,  $source_of_income,  $living_duration,  $birth_place,  $civil_status,  $household_id,  $relation_to_family_head,  $weight,  $height,  $education_attainment,  $with_disability,  $personal_income,  $Status);

        if ($stmt->execute()) {
            $response['message'] = "New record created successfully";
        } else {
            $response['error'] = "Error: " . $stmt->error;
        }
        $stmt->close();
    }

    if ($received_data->action == 'update') {
        $sql = "UPDATE patients` SET `patient_id`= ?,`name`= ?,`gender`= ?,`address`=?,`contNum`=?,`email`=?,`birth`=?,`occupation`=?,`civilStat`=?,`status`=? WHERE patient_id = ? ;";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssssssss",  $patient_id, $name, $gender, $address, $contNum, $email, $birth, $occupation, $civilStat, $status, $patient_id);

        if ($stmt->execute()) {
            $response['message'] = "New record created successfully";
        } else {
            $response['error'] = "Error: " . $stmt->error;
        }
        $stmt->close();
    }

    if ($received_data->action == 'delete') {
        $sql = "DELETE FROM `patients` WHERE patient_id = ?;";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $patient_id);

        if ($stmt->execute()) {
            $response['message'] = "New record created successfully";
        } else {
            $response['error'] = "Error: " . $stmt->error;
        }
        $stmt->close();
    }
}

header('Content-Type: application/json');
echo json_encode($patients);

$conn->close();
