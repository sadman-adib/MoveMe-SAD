<?php
header('Content-Type: application/json');

// Database connection settings
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "moveme2.0";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch the required data from the revenue_table
$sql = "SELECT rfid, bus_id, fare, start_datetime FROM revenue_table";
$result = $conn->query($sql);

$data = [];

// Check if there are any rows in the result
if ($result->num_rows > 0) {
    // Fetch rows and store them in an array grouped by passenger_id
    while ($row = $result->fetch_assoc()) {
        // Group data by passenger_id
        $data[$row['rfid']][] = $row;
    }
}

// Close the database connection
$conn->close();

// Return the data as JSON
echo json_encode($data);
