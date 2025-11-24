import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function MenuManagement({ restaurantId }) {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Base URL मध्ये restaurant जोडला
  const API_BASE = "http://localhost:8090/api/owner/restaurant";

  // ✅ Auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // ✅ Fetch Menu
  const fetchMenu = useCallback(async () => {
    if (!restaurantId) return;
    try {
      const response = await axios.get(
        `${API_BASE}/${restaurantId}/menu`,
        getAuthHeaders()
      );
      setMenuItems(response.data);
    } catch (err) {
      console.error("Error fetching menu:", err);
      setError("⚠️ Failed to load menu items.");
    }
  }, [restaurantId]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  // ✅ Handle Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add / Update Menu Item
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!restaurantId) {
      setError("⚠️ Please add a restaurant before adding menu items.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `${API_BASE}/${restaurantId}/menu/${editingId}`,
          formData,
          getAuthHeaders()
        );
        setMessage("✅ Menu item updated successfully!");
      } else {
        await axios.post(
          `${API_BASE}/${restaurantId}/menu`,
          formData,
          getAuthHeaders()
        );
        setMessage("✅ Menu item added successfully!");
      }

      setFormData({ name: "", price: "", description: "" });
      setEditingId(null);
      fetchMenu();
    } catch (err) {
      console.error("Error saving menu item:", err);
      setError("❌ Failed to save menu item.");
    }
  };

  // ✅ Edit Menu Item
  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      price: item.price,
      description: item.description,
    });
    setEditingId(item.id);
    setMessage("");
    setError("");
  };

  // ✅ Delete Menu Item
  const handleDelete = async (id) => {
    setMessage("");
    setError("");
    try {
      await axios.delete(
        `${API_BASE}/${restaurantId}/menu/${id}`,
        getAuthHeaders()
      );
      setMessage("🗑️ Menu item deleted successfully!");
      fetchMenu();
    } catch (err) {
      console.error("Error deleting menu item:", err);
      setError("❌ Failed to delete menu item.");
    }
  };

  // ✅ जर restaurant निवडलेलं नसेल
  if (!restaurantId) {
    return <p style={{ color: "red" }}>⚠️ Please add a restaurant before adding menu items.</p>;
  }

  return (
    <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>📋 Menu Management</h3>

      {/* ✅ Show Messages */}
      {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      {/* ✅ Menu Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          background: "#f9f9f9",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
        <button type="submit">{editingId ? "Update Item" : "Add Item"}</button>
      </form>

      {/* ✅ Menu List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {menuItems.map((item) => (
          <li key={item.id} style={{ marginBottom: "12px" }}>
            <strong>{item.name}</strong> - 💰 ₹{item.price}
            <br />
            {item.description}
            <div>
              <button onClick={() => handleEdit(item)}>✏️ Edit</button>
              <button onClick={() => handleDelete(item.id)}>❌ Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
