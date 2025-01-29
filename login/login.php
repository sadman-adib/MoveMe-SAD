<?php
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

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $id = $conn->real_escape_string($_POST['ID']);
    $password = $conn->real_escape_string($_POST['password']);

    // Query the database to check if credentials are valid
    $sql = "SELECT * FROM employee_table WHERE employee_id = '$id' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Fetch the user data
        $row = $result->fetch_assoc();
        $employee_name = $row['employee_name']; // Get the employee name

        // Store employee name in session
        $_SESSION['employee_name'] = $employee_name;

        // Redirect based on ID prefix
        if (substr($id, 0, 5) === 'CMGMT') {
            header("Location: /addEmployeeHome/addEmployeeHome.html");
        } else {
            header("Location: /home/home.html");
        }
        exit();  // Ensure no further code is executed after redirection
    } else {
        // Invalid credentials
        echo "<script>
            alert('Invalid ID or password. Please try again.');
            window.location.href = 'login.html';
        </script>";
    }
}

$conn->close();
?>
