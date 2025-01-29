<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "moveme2.0"; // Replace with your actual database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to fetch available drivers
function getAvailableDrivers($conn)
{
    $sql_drivers = "SELECT driver_name FROM driver_table WHERE status = 'available'";
    $drivers_result = $conn->query($sql_drivers);

    $drivers = [];
    if ($drivers_result->num_rows > 0) {
        while ($driver_row = $drivers_result->fetch_assoc()) {
            // Store only the driver_name
            $drivers[] = ['driver_name' => $driver_row['driver_name']];
        }
    }

    return $drivers;
}

// Handle the update of bus data if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize input
    $bus_id = $_POST['bus_id'];
    $status = $_POST['status'];
    $driver = $_POST['driver'];
    $route = $_POST['route'];

    // Update bus information
    $sql_update = "UPDATE bus_management_table SET status = ?, driver_name = ?, assigned_route = ? WHERE bus_id = ?";
    $stmt = $conn->prepare($sql_update);
    $stmt->bind_param("ssss", $status, $driver, $route, $bus_id);
    $stmt->execute();
}

// Check if bus_id is passed in GET request to fetch specific bus data
if (isset($_GET['bus_id'])) {
    $bus_id = $_GET['bus_id'];

    // SQL query to fetch data for a single bus
    $sql = "SELECT bus_id, model, capacity, assigned_route, driver_name, status FROM bus_management_table WHERE bus_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $bus_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();

    echo json_encode($data); // Return the bus data as JSON
    exit(); // End script after returning the specific bus data
}

// Check if 'get_drivers' is set in the GET request to fetch available drivers
if (isset($_GET['get_drivers']) && $_GET['get_drivers'] == 'true') {
    $drivers = getAvailableDrivers($conn);
    echo json_encode($drivers); // Return available drivers as JSON
    exit(); // End script after returning the driver data
}

// SQL query to fetch all bus data for table
$sql = "SELECT bus_id, model, capacity, assigned_route, driver_name, status FROM bus_management_table";
$result = $conn->query($sql);

// Fetch rows from database
$rows = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
}

// Close the connection
$conn->close();

// Output the data as JSON (if you are working with AJAX on the frontend)
echo json_encode($rows);
