import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OwnerRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "RESTAURANT_OWNER", // ✅ backend compatible default
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8090/api/auth/register", form);
      setSuccess("✅ Owner Registered Successfully");
      setError("");
      setForm({ name: "", email: "", password: "", role: "RESTAURANT_OWNER" });
      setTimeout(() => navigate("/owner/login"), 1500);
    } catch (err) {
      console.error("Registration Error:", err);
      setError("❌ Registration failed. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Owner Registration</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {/* ✅ Role selection - default "RESTAURANT_OWNER" */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="RESTAURANT_OWNER">Restaurant Owner</option>
          <option value="USER">Customer</option>
          <option value="DELIVERY_PERSONNEL">Delivery Person</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>

      {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s",
  },
};
