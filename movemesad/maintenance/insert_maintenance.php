<?php
// Database connection details
$host = "192.168.19.8"; // Replace with the remote computer's IP
$dbname = "moveme2.0";
$username = "root";
$password = "";

try {
    // Create a connection to the remote database
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if form data is submitted
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        // Retrieve form data
        $bus_id = $_POST["bus_id"];
        $driver_id = $_POST["driver_id"];
        $driver_name = $_POST["driver_name"];
        $phone = $_POST["phone"];
        $location = $_POST["location"];
        $status = $_POST["status"];

        // Prepare SQL query
        $sql = "INSERT INTO maintenance_table (bus_id, driver_id, driver_name, phone, location, status) 
                VALUES (:bus_id, :driver_id, :driver_name, :phone, :location, :status)";
        $stmt = $conn->prepare($sql);

        // Bind parameters
        $stmt->bindParam(":bus_id", $bus_id);
        $stmt->bindParam(":driver_id", $driver_id);
        $stmt->bindParam(":driver_name", $driver_name);
        $stmt->bindParam(":phone", $phone);
        $stmt->bindParam(":location", $location);
        $stmt->bindParam(":status", $status);

        // Execute query
        $stmt->execute();

        echo "Data inserted successfully!";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
