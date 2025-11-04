import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import RFQAllPage from "./pages/RFQAllPage";
import RFQCreatePage from "./pages/RFQCreatePage";
import MyRFQsPage from "./pages/MyRFQsPage";
import ViewBidsPage from "./pages/ViewBidsPage";

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
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rfqs"
          element={
            <ProtectedRoute>
              <RFQAllPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rfq/create"
          element={
            <ProtectedRoute>
              <RFQCreatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-rfqs"
          element={
            <ProtectedRoute>
              <MyRFQsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rfq/:id"
          element={
            <ProtectedRoute>
              <ViewBidsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
