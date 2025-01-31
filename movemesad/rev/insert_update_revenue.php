<?php
$servername = "192.168.19.8";  // Replace with your server's IP
$username = "root";  // Replace with your database username
$password = "";  // Replace with your database password
$dbname = "moveme2.0";      // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from the AJAX request
$passengerId = $_POST['passengerId'];
$busOwnerId = $_POST['busOwnerId'];
$busId = $_POST['busId'];
$startLocation = $_POST['startLocation'];
$startDateTime = $_POST['startDateTime'];
$endLocation = $_POST['endLocation'] ?? null; // Handle endLocation being optional
$endDateTime = $_POST['endDateTime'] ?? null; // Handle endDateTime being optional
$fare = $_POST['fare'] ?? null; // Handle fare being optional

// Check if the passenger already exists in the database
$sql = "SELECT * FROM revenue_table WHERE rfid = '$passengerId'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Passenger exists, update their information
    $updateSql = "UPDATE revenue_table 
                      SET end_location = '$endLocation', 
                          end_datetime = '$endDateTime', 
                          fare = " . ($fare ?? "NULL") . " 
                      WHERE rfid = '$passengerId'";
    
    if ($conn->query($updateSql) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . $conn->error;
    }
} else {
    // Passenger does not exist, insert a new record
    $insertSql = "INSERT INTO revenue_table (rfid, busowner_id, bus_id, start_location, start_datetime) 
                  VALUES ('$passengerId', '$busOwnerId', '$busId', '$startLocation', '$startDateTime')";
    
    if ($conn->query($insertSql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $insertSql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
