import React, { useEffect, useState } from "react";

export default function ViewRestaurant() {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8090/api/owner/my-restaurant", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch restaurant");
        return res.json();
      })
      .then((data) => setRestaurant(data))
      .catch((err) => console.error(err));
  }, []);

  if (!restaurant) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Loading restaurant details...
      </h2>
    );
  }

  return (
    <div style={styles.container}>
      <h1>🍴 View Restaurant</h1>
      <div style={styles.card}>
        <p><strong>ID:</strong> {restaurant.id}</p>
        <p><strong>Name:</strong> {restaurant.name}</p>
        <p><strong>Address:</strong> {restaurant.address}</p>
        <p><strong>Contact:</strong> {restaurant.contactNumber}</p>
        <p><strong>Email:</strong> {restaurant.email1 || "N/A"}</p>
        <p><strong>Owner:</strong> {restaurant.owner?.name}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "left",
    lineHeight: "1.8",
  },
};
