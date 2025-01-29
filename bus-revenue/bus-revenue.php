<?php
// Database connection settings
$servername = "localhost"; // Change to your database host
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "moveme2.0"; // Your database name

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch the required data from the revenue_table
$sql = "SELECT bus_id, start_location, end_location, start_datetime, end_datetime, fare FROM revenue_table";
$result = $conn->query($sql);

$data = [];

if ($result->num_rows > 0) {
    // Fetch rows and store them in an array
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Close the database connection
$conn->close();

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($data);
