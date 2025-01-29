<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "moveme2.0";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $drivers = [];
    if (isset($_GET['driver_id'])) {
        $driver_id = $conn->real_escape_string($_GET['driver_id']);
        $sql = "SELECT * FROM driver_management_table WHERE driver_id = '$driver_id'";
    } else {
        $sql = "SELECT * FROM driver_management_table";
    }

    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()) {
        $drivers[] = $row;
    }
    echo json_encode($drivers);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['driver_id']) && isset($_POST['status'])) {
        $driver_id = $conn->real_escape_string($_POST['driver_id']);
        $status = $conn->real_escape_string($_POST['status']);
        $sql = "UPDATE driver_management_table SET status = '$status' WHERE driver_id = '$driver_id'";
        echo $conn->query($sql) ? json_encode(["driver_id" => $driver_id, "status" => $status]) : json_encode(["error" => $conn->error]);
    }

    if (isset($_POST['delete_driver_id'])) {
        $driver_id = $conn->real_escape_string($_POST['delete_driver_id']);
        $sql = "DELETE FROM driver_management_table WHERE driver_id = '$driver_id'";
        echo $conn->query($sql) ? json_encode("delete_success") : json_encode(["error" => $conn->error]);
    }
}

$conn->close();
