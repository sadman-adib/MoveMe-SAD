<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "moveme2.0";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetching data if the request is GET (for populating the table)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT busowner_id, busowner_name, phone, email, status, quantity FROM busowner_management_table ORDER BY busowner_id ASC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $busOwners = [];
        while ($row = $result->fetch_assoc()) {
            $busOwners[] = $row;
        }
        echo json_encode($busOwners);
    } else {
        echo json_encode([]); // No data found
    }
}

// Update data if the request is POST (for saving changes)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id']) && isset($_POST['status']) && isset($_POST['quantity'])) {
    $id = $_POST['id'];
    $status = $_POST['status'];
    $quantity = $_POST['quantity'];

    // Update the bus owner data in the database
    $sql = "UPDATE busowner_management_table SET status = ?, quantity = ? WHERE busowner_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sii", $status, $quantity, $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error updating the record']);
    }
    $stmt->close();
}

// Delete data if the request is POST (for deleting bus owner)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id']) && !isset($_POST['status']) && !isset($_POST['quantity'])) {
    $id = $_POST['id'];

    // Delete the bus owner data from the database
    $sql = "DELETE FROM busowner_management_table WHERE busowner_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error deleting the record']);
    }
    $stmt->close();
}

$conn->close();
