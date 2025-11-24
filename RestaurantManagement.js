import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import MenuManagement from "./MenuManagement"; // ✅ Import Menu Component

export default function RestaurantManagement() {
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({ name: "", address: "", contactNumber: "" });
  const [editingId, setEditingId] = useState(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_BASE = "http://localhost:8090/api/owner/restaurant";

  // ✅ Auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // ✅ Fetch restaurants
  const fetchRestaurants = useCallback(async () => {
    try {
      const response = await axios.get(API_BASE, getAuthHeaders());
      setRestaurants(response.data);

      if (response.data.length > 0 && !selectedRestaurantId) {
        setSelectedRestaurantId(response.data[0].id);
      }
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError("⚠️ Failed to load restaurants.");
    }
  }, [selectedRestaurantId]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  // ✅ Handle form input
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Add or Update restaurant
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      let response;
      if (editingId) {
        response = await axios.put(`${API_BASE}/${editingId}`, formData, getAuthHeaders());
        setMessage("✅ Restaurant updated successfully!");
      } else {
        response = await axios.post(API_BASE, formData, getAuthHeaders());
        setMessage("✅ Restaurant added successfully!");
      }

      setFormData({ name: "", address: "", contactNumber: "" });
      setEditingId(null);
      fetchRestaurants();

      if (response?.data?.id) setSelectedRestaurantId(response.data.id);
    } catch (err) {
      console.error("Error saving restaurant:", err);
      setError("❌ Failed to save restaurant. Try again!");
    }
  };

  // ✅ Edit restaurant
  const handleEdit = (restaurant) => {
    setFormData({
      name: restaurant.name,
      address: restaurant.address,
      contactNumber: restaurant.contactNumber,
    });
    setEditingId(restaurant.id);
    setMessage("");
    setError("");
  };

  // ✅ Delete restaurant
  const handleDelete = async (id) => {
    setMessage("");
    setError("");
    try {
      await axios.delete(`${API_BASE}/${id}`, getAuthHeaders());
      setMessage("🗑️ Restaurant deleted successfully!");
      fetchRestaurants();
      if (selectedRestaurantId === id) setSelectedRestaurantId(null);
    } catch (err) {
      console.error("Error deleting restaurant:", err);
      setError("❌ Failed to delete restaurant!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🍽 Restaurant Management</h2>

      {/* ✅ Show Messages */}
      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}

      {/* ✅ Add / Edit Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.btnPrimary}>
          {editingId ? "Update Restaurant" : "Add Restaurant"}
        </button>
      </form>

      {/* ✅ Restaurant List */}
      <ul style={styles.list}>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id} style={styles.card}>
            <h3 style={{ margin: "5px 0" }}>{restaurant.name}</h3>
            <p style={{ margin: "5px 0", color: "#555" }}>{restaurant.address}</p>
            <p style={{ margin: "5px 0" }}>📞 {restaurant.contactNumber}</p>
            <div style={styles.actions}>
              <button style={styles.btnEdit} onClick={() => handleEdit(restaurant)}>✏️ Edit</button>
              <button style={styles.btnDelete} onClick={() => handleDelete(restaurant.id)}>❌ Delete</button>
              <button style={styles.btnMenu} onClick={() => setSelectedRestaurantId(restaurant.id)}>📋 Manage Menu</button>
            </div>
          </li>
        ))}
      </ul>

      {/* ✅ Show Menu Management if a restaurant is selected */}
      {selectedRestaurantId && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={styles.subHeading}>📋 Menu Management for Restaurant ID: {selectedRestaurantId}</h3>
          <MenuManagement restaurantId={selectedRestaurantId} />
        </div>
      )}
    </div>
  );
}

// ✅ Combined JS + CSS styles
const styles = {
  container: { padding: "20px", maxWidth: "800px", margin: "auto", fontFamily: "Arial, sans-serif" },
  heading: { textAlign: "center", marginBottom: "20px" },
  subHeading: { marginBottom: "10px", color: "#333" },
  success: { color: "green", fontWeight: "bold" },
  error: { color: "red", fontWeight: "bold" },
  form: { marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px", background: "#f9f9f9", padding: "15px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
  input: { padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px" },
  btnPrimary: { padding: "10px", border: "none", borderRadius: "6px", background: "#0d6efd", color: "white", cursor: "pointer", fontSize: "15px" },
  list: { listStyle: "none", padding: 0 },
  card: { background: "white", padding: "15px", borderRadius: "8px", marginBottom: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" },
  actions: { display: "flex", gap: "8px", marginTop: "10px" },
  btnEdit: { background: "#ffc107", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" },
  btnDelete: { background: "#dc3545", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", color: "white" },
  btnMenu: { background: "#198754", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", color: "white" },
};
