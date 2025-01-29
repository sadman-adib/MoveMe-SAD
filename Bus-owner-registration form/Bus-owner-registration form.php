<?php
// Assuming you have a database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "moveme2.0"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the JSON input from the request body
$data = json_decode(file_get_contents("php://input"));

// Extracting values
$busowner_id = $data->busowner_id;
$busowner_name = $data->busowner_name;
$phone = $data->phone;
$email = $data->email;
$location = $data->location;
$bus_quantity = $data->bus_quantity;
$payment = $data->payment;

// Parse payment details
$payment_details = explode(":", $payment);
$payment_method = $payment_details[0];
$payment_provider = isset($payment_details[1]) ? $payment_details[1] : null;
$payment_account_number = isset($payment_details[2]) ? $payment_details[2] : null;

// Prepare SQL query to insert data
// Prepare and bind the SQL query
$stmt = $conn->prepare("INSERT INTO bus_owners (busowner_id, busowner_name, phone, email, location, bus_quantity, payment_method, payment_provider, payment_account_number)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param("sssssssss", $busowner_id, $busowner_name, $phone, $email, $location, $bus_quantity, $payment_method, $payment_provider, $payment_account_number);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Registration successful"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
