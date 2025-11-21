import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import RFQAllPage from "./pages/RFQAllPage";
import RFQCreatePage from "./pages/RFQCreatePage";
import MyRFQsPage from "./pages/MyRFQsPage";
import ViewBidsPage from "./pages/ViewBidsPage";
import UserProfile from "./pages/UserProfile";
import Notifications from "./pages/Notifications";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            
              <Login />
            
          }
        />
        <Route
          path="/forgot-password"
          element={
            
              <ForgotPassword />
            
          }
        />
        <Route
          path="/register"
          element={
            
              <Register />
            
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            
              <Dashboard />
            
          }
        />
        <Route
          path="/provider-dashboard"
          element={
            
              <ProviderDashboard />
            
          }
        />
        <Route
          path="/rfqs"
          element={
            
              <RFQAllPage />
            
          }
        />
        <Route
          path="/rfq/create"
          element={
            
              <RFQCreatePage />
            
          }
        />
        <Route
          path="/my-rfqs"
          element={
            
              <MyRFQsPage />
            
          }
        />
        <Route
          path="/rfq/:id"
          element={
            
              <ViewBidsPage />
            
          }
        />
        <Route
          path="/profile"
          element={
            
              <UserProfile />
            
          }
        />
        <Route
          path="/notifications"
          element={
            
              <Notifications />
            
          }
        />
        <Route
          path="/chat"
          element={
            
              <ChatPage />
            
          }
        />
        <Route
          path="/chat/:userId"
          element={
            
              <ChatPage />
            
          }
        />
      </Routes>
    </>
  );
};

export default App;
