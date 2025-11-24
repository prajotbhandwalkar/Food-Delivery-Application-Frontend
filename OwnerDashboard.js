import React from "react";
import { useNavigate } from "react-router-dom";

export default function OwnerDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/owner/login");
  };

  return (
    <>
      {/* ✅ CSS inside JS file */}
      <style>{`
        .dashboard-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #f5f7fa;
        }
        .dashboard-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
          text-align: center;
          width: 400px;
        }
        .dashboard-card h1 {
          margin-bottom: 10px;
          color: #333;
        }
        .dashboard-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 20px;
        }
        .dashboard-buttons button {
          padding: 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          background-color: #3498db;
          color: white;
          font-size: 16px;
          transition: 0.3s;
        }
        .dashboard-buttons button:hover {
          background-color: #2980b9;
        }
        .logout-btn {
          background-color: #e74c3c !important;
        }
        .logout-btn:hover {
          background-color: #c0392b !important;
        }
      `}</style>

      <div className="dashboard-container">
        <div className="dashboard-card">
          <h1>Owner Dashboard</h1>
          <p>Welcome, Owner! 🎉</p>

          <div className="dashboard-buttons">
            <button onClick={() => navigate("/owner/restaurant")}>
              Manage Restaurant
            </button>
            <button onClick={() => navigate("/owner/view-restaurant")}>
              View Restaurant
            </button>
            <button onClick={() => navigate("/owner/menu")}>
              Manage Menu
            </button>
            <button onClick={() => navigate("/owner/orders")}>
              View Orders
            </button>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
