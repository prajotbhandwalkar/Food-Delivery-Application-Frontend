import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OwnerOrders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [actioning, setActioning] = useState(null); // कोणत्या order वर action होत आहे

  const API_BASE = "http://localhost:8090/api/owner"; // ✅ तुझ्या backend नुसार बदल

  // ✅ Fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/orders`);
      setOrders(res.data);
      setMessage("");
    } catch (err) {
      setMessage("❌ Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Accept order
  const handleAccept = async (orderId) => {
    setActioning(orderId);
    try {
      await axios.put(`${API_BASE}/orders/${orderId}/accept`);
      setMessage(`✅ Order #${orderId} accepted`);
      fetchOrders();
    } catch (err) {
      setMessage("❌ Error accepting order");
    } finally {
      setActioning(null);
    }
  };

  // ✅ Mark ready
  const handleReady = async (orderId) => {
    setActioning(orderId);
    try {
      await axios.put(`${API_BASE}/orders/${orderId}/ready`);
      setMessage(`✅ Order #${orderId} marked ready`);
      fetchOrders();
    } catch (err) {
      setMessage("❌ Error marking order ready");
    } finally {
      setActioning(null);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🍴 Restaurant Orders</h2>

      {loading ? (
        <p style={styles.loading}>⏳ Loading orders...</p>
      ) : (
        <ul style={styles.list}>
          {orders.length === 0 ? (
            <p style={styles.empty}>No orders available</p>
          ) : (
            orders.map((order) => (
              <li key={order.id} style={styles.listItem}>
                <div>
                  <b>Order #{order.id}</b> - <span>{order.status}</span>
                  <br />
                  <i>Customer: {order.customer?.name}</i>
                </div>
                <div>
                  {order.status === "PLACED" && (
                    <button
                      onClick={() => handleAccept(order.id)}
                      style={styles.acceptButton}
                      disabled={actioning === order.id}
                    >
                      {actioning === order.id ? "Processing..." : "Accept"}
                    </button>
                  )}
                  {order.status === "ACCEPTED" && (
                    <button
                      onClick={() => handleReady(order.id)}
                      style={styles.readyButton}
                      disabled={actioning === order.id}
                    >
                      {actioning === order.id ? "Processing..." : "Mark Ready"}
                    </button>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      )}

      {message && (
        <p
          style={{
            ...styles.message,
            color: message.startsWith("✅") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

// ✅ Inline CSS (JS + CSS combine)
const styles = {
  container: {
    maxWidth: "700px",
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  heading: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
  acceptButton: {
    padding: "6px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "8px",
  },
  readyButton: {
    padding: "6px 12px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    fontWeight: "bold",
  },
  loading: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#555",
  },
  empty: {
    textAlign: "center",
    color: "#777",
  },
};
