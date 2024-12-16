import axios from "axios";

// Create an instance of axios with a default base URL
const instance = axios.create({
  baseURL: "http://localhost/Ramee/backend/api.php", // Replace with your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
