<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header("Content-Type: application/json");

    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "moveme2.0";

    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        error_log("Database connection failed: " . $conn->connect_error);
        echo json_encode(["success" => false, "message" => "Database connection failed"]);
        exit();
    }

    function generateDriverId($conn)
    {
        $prefix = "DR";
        $query = "SELECT MAX(driver_id) AS last_id FROM driver_table";
        $result = $conn->query($query);

        if ($result && $row = $result->fetch_assoc()) {
            $lastId = $row['last_id'];
            $number = intval(substr($lastId, 2)) + 1;
            return $prefix . str_pad($number, 5, "0", STR_PAD_LEFT);
        } else {
            return $prefix . "00001";
        }
    }

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data) {
        $driver_id = generateDriverId($conn);
        $driver_name = $data['driver_name'] ?? null;
        $phone = $data['phone'] ?? null;
        $license = $data['license'] ?? null;
        $status = "active";
        $nid = $data['nid'] ?? null;
        $license_exp_date = $data['license_exp_date'] ?? null;
        $payment = $data['payment'] ?? null;
        $payment_method = $data['payment_method'] ?? null;
        $mobile_provider = $data['mobile_provider'] ?? null;
        $account_number = $data['account_number'] ?? null;

        if ($payment_method == 'mobile' && $mobile_provider && $account_number) {
            $payment_details = "Mobile Provider: $mobile_provider, Account: $account_number";
        } else if ($payment_method == 'bank' && $data['bank_name'] && $data['bank_account_number']) {
            $payment_details = "Bank: " . $data['bank_name'] . ", Account: " . $data['bank_account_number'];
        } else {
            $payment_details = 'N/A';
        }

        $sql = "INSERT INTO driver_table (driver_id, driver_name, phone, license, status, nid, license_exp_date, payment_method, payment_details) 
                VALUES ('$driver_id', '$driver_name', '$phone', '$license', '$status', '$nid', '$license_exp_date', '$payment', '$payment_details')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => true, "message" => "Driver registered successfully!", "driver_id" => $driver_id]);
        } else {
            echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid input data"]);
    }

    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Method Not Allowed."]);
}
