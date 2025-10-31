import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Base API URL
  const API_URL = import.meta.env.VITE_API_URL;

  // 🔹 Register
  const registerUser = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, userData);
      toast.success(res.data.message || "OTP sent to email");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      return false;
    }
  };

  // 🔹 Verify Registration OTP
  const verifyEmail = async (data) => {
    try {
      const res = await axios.post(
        `${API_URL}/auth/verify-registration-otp`,
        data
      );
      toast.success(res.data.message || "Email verified successfully");
      navigate("/login");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
      return false;
    }
  };

  // 🔹 Login
  const loginUser = async (credentials) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, credentials, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", res.data.accessToken);
      setUser(res.data.user);
      setIsAuthenticated(true);
      toast.success("Login successful");
      navigate("/");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  // 🔹 Logout
  const logoutUser = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem("accessToken");
      setUser(null);
      setIsAuthenticated(false);
      toast.info("Logged out");
    } catch {
      localStorage.removeItem("accessToken");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // 🧩 Get user profile
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      const res = await axios.get(`${API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        registerUser,
        verifyEmail,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
