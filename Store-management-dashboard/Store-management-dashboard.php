<?php
// store-management.php
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

// Fetch the store data
$sql = "SELECT * FROM storeowner_management_table";
$result = $conn->query($sql);
$stores = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $stores[] = $row;
    }
} else {
    echo "0 results";
}

// Handle status update via POST request
if (isset($_POST['store_id']) && isset($_POST['status'])) {
    $store_id = $_POST['store_id'];
    $status = $_POST['status'];

    $update_sql = "UPDATE storeowner_management_table SET status='$status' WHERE store_id='$store_id'";
    if ($conn->query($update_sql) === TRUE) {
        // Return updated status in response
        $updated_store = array(
            'store_id' => $store_id,
            'status' => $status
        );
        echo json_encode($updated_store);
    } else {
        echo "Error: " . $conn->error;
    }
}

// Handle deletion via POST request
if (isset($_POST['delete_store_id'])) {
    $store_id = $_POST['delete_store_id'];
    $delete_sql = "DELETE FROM storeowner_management_table WHERE store_id='$store_id'";

    if ($conn->query($delete_sql) === TRUE) {
        echo "delete_success";
    } else {
        echo "Error: " . $conn->error;
    }
}

// Return the stores as JSON
echo json_encode($stores);

// Close the connection
$conn->close();
