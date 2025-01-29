<?php
// Start the session to access user data
session_start();

// Check if the employee name is available in the session
if (isset($_SESSION['employee_name'])) {
    echo json_encode(['name' => $_SESSION['employee_name']]);
} else {
    echo json_encode(['name' => 'Guest']);
}
