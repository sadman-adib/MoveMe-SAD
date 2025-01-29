<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection
$host = "localhost";
$user = "root";
$password = "";
$dbname = "moveme2.0"; // Replace with your database name
$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Handle different request methods
$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod === 'GET') {
    // Fetch data with 'emergency' status
    $status = $_GET['status'] ?? '';
    if ($status) {
        $sql = "SELECT * FROM maintenance_table WHERE status = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $status);
        $stmt->execute();
        $result = $stmt->get_result();

        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($data);
        $stmt->close();
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Missing status parameter']);
    }
} elseif ($requestMethod === 'POST') {
    // Handle assigning a mechanic or deleting a bus
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['bus_id'], $input['mechanic'])) {
        // Assign mechanic
        $busId = $input['bus_id'];
        $mechanic = $input['mechanic'];
        $status = "In Progress";

        $sql = "UPDATE maintenance_table SET assigned_mechanic = ?, status = ? WHERE bus_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssi", $mechanic, $status, $busId);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Mechanic assigned successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to assign mechanic']);
        }

        $stmt->close();
    } elseif (isset($input['bus_id'])) {
        // Delete bus entry
        $busId = $input['bus_id'];

        $sql = "DELETE FROM maintenance_table WHERE bus_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $busId);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Bus deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete bus']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid request']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Unsupported request method']);
}

$conn->close();
