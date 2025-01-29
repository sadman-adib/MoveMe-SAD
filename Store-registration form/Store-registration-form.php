<?php
// Set the content type to JSON to avoid issues with unexpected HTML output
header('Content-Type: application/json');

// Database connection
$host = "localhost"; // Change to your DB host
$user = "root"; // Change to your DB username
$password = ""; // Change to your DB password
$database = "moveme2.0"; // Your database name

$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}
// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $store_name = $_POST["store_name"];
    $phone = $_POST["phone"];
    $location = $_POST["location"];
    $storeowner_name = $_POST["storeowner_name"];
    $nid = $_POST["nid"];
    $trade_license_number = $_POST["trade_license_number"];
    $payment_method = $_POST["payment-method"];
    $status = "pending"; // Default status

    // Validate the form data
    if (empty($store_name) || empty($phone) || empty($location) || empty($storeowner_name) || empty($nid) || empty($trade_license_number) || empty($payment_method)) {
        echo json_encode(["success" => false, "message" => "Error: All fields are required."]);
        exit;
    }

    // SQL Query to get the latest store_owner_id
    $result = $conn->query("SELECT MAX(store_owner_id) AS max_id FROM storeowner_table");
    if (!$result) {
        echo json_encode(["success" => false, "message" => "Database query error: " . $conn->error]);
        exit;
    }

    $row = $result->fetch_assoc();
    $new_store_owner_id = $row['max_id'] + 1; // Generate new ID by adding 1 to the current max ID

    // SQL Query to insert data into storeowner_table
    $stmt = $conn->prepare("INSERT INTO storeowner_table (store_owner_id, store_name, phone, location, storeowner_name, nid, trade_license_number, payment_method, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "Prepared statement error: " . $conn->error]);
        exit;
    }
    $stmt->bind_param("issssssss", $new_store_owner_id, $store_name, $phone, $location, $storeowner_name, $nid, $trade_license_number, $payment_method, $status);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Registration successful!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }

    $stmt->close();
}

$conn->close();


$response = [
    'success' => true,
    'message' => 'Registration successful!'
];
echo json_encode($response);
