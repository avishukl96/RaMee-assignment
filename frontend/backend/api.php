<?php
// Include the database connection
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Set the content type for API responses (JSON)
header('Content-Type: application/json');

// Get the request method (POST, GET, PUT, DELETE)
$method = $_SERVER['REQUEST_METHOD'];

// Fetch all users (Read operation)
if ($method == 'GET') {
    $sql = "SELECT * FROM users";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $users = array();
        while($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode($users);
    } else {
        echo json_encode(["message" => "No users found."]);
    }
}

// Create a new user (Create operation)
elseif ($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true); // Get the data from the body

    if (isset($data['name']) && isset($data['email'])) {
        $name = $data['name'];
        $email = $data['email'];

        $sql = "INSERT INTO users (name, email) VALUES ('$name', '$email')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "User added successfully."]);
        } else {
            echo json_encode(["message" => "Error: " . $conn->error]);
        }
    } else {
        echo json_encode(["message" => "Name and Email are required."]);
    }
}

// Update a user's details (Update operation)
elseif ($method == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true); // Get the data from the body

    if (isset($data['id']) && isset($data['name']) && isset($data['email'])) {
        $id = $data['id'];
        $name = $data['name'];
        $email = $data['email'];

        $sql = "UPDATE users SET name='$name', email='$email' WHERE id=$id";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "User updated successfully."]);
        } else {
            echo json_encode(["message" => "Error: " . $conn->error]);
        }
    } else {
        echo json_encode(["message" => "ID, Name, and Email are required."]);
    }
}

// Delete a user (Delete operation)
elseif ($method == 'DELETE') {
    // Get the data from the body
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['id'])) {
        $id = $data['id'];

        $sql = "DELETE FROM users WHERE id=$id";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "User deleted successfully."]);
        } else {
            echo json_encode(["message" => "Error: " . $conn->error]);
        }
    } else {
        echo json_encode(["message" => "User ID is required."]);
    }
}

// Close the database connection
$conn->close();
?>
