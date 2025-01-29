<?php
header('Content-Type: application/json');

// Start session to store user data
session_start();

// Database connection setup
$servername = "localhost";  // Replace with your database server
$username = "root";         // Replace with your database username
$password = "";             // Replace with your database password
$dbname = "moveme2.0";      // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle actions
$action = $_POST['action'] ?? '';

if ($action === 'getBusCount') {
    $busownerId = $_POST['busownerId'];
    $query = "SELECT bus_quantity FROM busowner_table WHERE busowner_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $busownerId);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();

    $busCount = $result['bus_quantity'] ?? 0;
    echo json_encode(['bus_count' => (int)$busCount]);
} elseif ($action === 'getNextBusId') {
    $query = "SELECT CONCAT('BUS', LPAD(MAX(CAST(SUBSTRING(bus_id, 4) AS UNSIGNED)) + 1, 3, '0')) AS next_bus_id FROM bus_table";
    $result = $conn->query($query)->fetch_assoc();
    echo json_encode(['next_bus_id' => $result['next_bus_id'] ?? 'BUS001']);
} elseif ($action === 'registerBus') {
    $busId = $_POST['busId'] ?? null;
    $busownerId = $_POST['busownerId'] ?? null;
    $model = $_POST['model'] ?? null;
    $capacity = $_POST['capacity'] ?? null;
    $registrationNumber = $_POST['registrationNumber'] ?? null;
    $deviceId = $_POST['deviceId'] ?? null;
    $taxToken = $_POST['taxToken'] ?? null;
    $insurance = $_POST['insurance'] ?? null;
    $fitness = $_POST['fitness'] ?? null;
    $status = $_POST['status'] ?? 'active';

    // Validate inputs
    if (!$busId || !$busownerId || !$model || !$capacity || !$registrationNumber || !$deviceId || !$taxToken || !$insurance || !$fitness) {
        echo json_encode(['success' => false, 'error' => 'Missing required fields']);
        exit;
    }

    // Begin transaction
    $conn->begin_transaction();

    try {
        // Insert new bus into bus_table
        $query = "INSERT INTO bus_table (bus_id, busowner_id, model, capacity, registration_number, device_id, tax_token, insurance, fitness, status) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssssssssss", $busId, $busownerId, $model, $capacity, $registrationNumber, $deviceId, $taxToken, $insurance, $fitness, $status);

        if (!$stmt->execute()) {
            throw new Exception('Failed to insert into bus_table: ' . $stmt->error);
        }

        // Update bus_quantity in busowner_table
        $updateQuery = "UPDATE busowner_table SET bus_quantity = bus_quantity - 1 WHERE busowner_id = ?";
        $updateStmt = $conn->prepare($updateQuery);
        $updateStmt->bind_param("s", $busownerId);

        if (!$updateStmt->execute()) {
            throw new Exception('Failed to update bus_quantity: ' . $updateStmt->error);
        }

        // Commit transaction
        $conn->commit();
        echo json_encode(['success' => true, 'message' => 'Bus registered successfully']);
    } catch (Exception $e) {
        // Rollback transaction on failure
        $conn->rollback();
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}

$conn->close();
