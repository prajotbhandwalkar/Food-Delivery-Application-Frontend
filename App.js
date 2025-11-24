import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ✅ Delivery Person Pages (inside src/pages)
import DeliveryRegister from "./pages/DeliveryRegister";
import DeliveryProfile from "./pages/DeliveryProfile";
import DeliveryOrders from "./pages/DeliveryOrders";
import UpdateOrderStatus from "./pages/UpdateOrderStatus";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import OrderDetails from "./pages/OrderDetails";

// ✅ Owner Pages (inside src/modules/owner)
import OwnerLogin from "./modules/owner/OwnerLogin";
import OwnerRegister from "./modules/owner/OwnerRegister";
import OwnerProfile from "./modules/owner/OwnerProfile";
import OwnerDashboard from "./modules/owner/OwnerDashboard";
import MenuManagement from "./modules/owner/MenuManagement";
import RestaurantManagement from "./modules/owner/RestaurantManagement";
import OwnerOrders from "./modules/owner/OwnerOrders";
import ViewRestaurant from "./modules/owner/ViewRestaurant"; // ✅ NEW PAGE

// ✅ Common Login Page
import CommonLogin from "./pages/CommonLogin";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/common/login" />} />

        {/* ================= Delivery Person Routes ================= */}
        <Route path="/delivery/register" element={<DeliveryRegister />} />
        <Route path="/common/login" element={<CommonLogin />} />
        <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
        <Route path="/delivery/profile" element={<DeliveryProfile />} />
        <Route path="/delivery/orders" element={<DeliveryOrders />} />
        <Route path="/delivery/update-status/:orderId" element={<UpdateOrderStatus />} />
        <Route path="/delivery/order-details/:orderId" element={<OrderDetails />} />

        {/* Delivery Fallback */}
        <Route path="/delivery/*" element={<Navigate to="/common/login" />} />

        {/* ================= Owner Routes ================= */}
        <Route path="/owner/register" element={<OwnerRegister />} />
        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/profile" element={<OwnerProfile />} />
        <Route path="/owner/menu" element={<MenuManagement />} />
        <Route path="/owner/restaurant" element={<RestaurantManagement />} />
        <Route path="/owner/view-restaurant" element={<ViewRestaurant />} /> {/* ✅ NEW ROUTE */}
        <Route path="/owner/orders" element={<OwnerOrders />} />

        {/* Owner Fallback */}
        <Route path="/owner/*" element={<Navigate to="/owner/login" />} />

        {/* Global fallback */}
        <Route path="*" element={<Navigate to="/common/login" />} />
      </Routes>
    </Router>
  );
}
