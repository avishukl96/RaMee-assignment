<?php
$servername = "localhost";  // Change if needed
$username = "root";         // Your MySQL username
$password = "";             // Your MySQL password (default is empty for XAMPP)
$dbname = "ramee-assignments";          // The database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>