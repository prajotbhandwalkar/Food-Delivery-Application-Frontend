import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OwnerLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8090/api/auth/login",
        formData
      );

      console.log("Login Response:", response.data);

      // ✅ Save Token & Role (backend returns RESTAURANT_OWNER)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "role",
        response.data.role || "RESTAURANT_OWNER"
      );

      // ✅ Redirect to Owner Dashboard
      if (response.data.role === "RESTAURANT_OWNER") {
        navigate("/owner/dashboard");
      } else {
        setError("Access Denied: Not an Owner");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👨‍🍳 Owner Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.background = "#45a049")}
            onMouseOut={(e) => (e.target.style.background = "#4CAF50")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// ✅ Inline CSS
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f4f9",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "350px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "0.3s",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
};
