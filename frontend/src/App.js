import React, { useState, useEffect } from "react";
import axios from "axios"; // Directly import axios
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch users from the API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost/Ramee/backend/api.php"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Create a new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (name && email) {
      try {
        const response = await axios.post(
          "http://localhost/Ramee/backend/api.php",
          {
            name,
            email,
          }
        );
        console.log("User created:", response.data);
        fetchUsers(); // Refresh the user list
        setName("");
        setEmail("");
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  };

  // Edit user (populate form for editing)
  const handleEditUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user.id);
  };

  // Update user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (name && email && editId) {
      try {
        const response = await axios.put(
          "http://localhost/Ramee/backend/api.php",
          {
            id: editId,
            name,
            email,
          }
        );
        console.log("User updated:", response.data);
        fetchUsers(); // Refresh the user list
        setName("");
        setEmail("");
        setEditId(null);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost/Ramee/backend/api.php",
        {
          data: { id },
        }
      );
      console.log("User deleted:", response.data);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="App">
      <h1>RaMee - Assignment</h1>
      <h2>User Management</h2>

      {/* Form for creating/updating users */}
      <form onSubmit={editId ? handleUpdateUser : handleCreateUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"} User</button>
      </form>

      {/* User list */}
      <h2>User List</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              <span>
                {user.name} - {user.email}
              </span>
              <button onClick={() => handleEditUser(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No users found.</li>
        )}
      </ul>
    </div>
  );
}

export default App;
