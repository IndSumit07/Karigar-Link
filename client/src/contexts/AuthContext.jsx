import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false); // overlay loader for actions
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  axios.defaults.withCredentials = true;

  // 🧠 Fetch Current User
  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return setLoading(false);
    try {
      const res = await axios.get(`${API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
    } catch {
      localStorage.removeItem("accessToken");
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Register
  const registerUser = async (data) => {
    setActionLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/register`, data);
      toast.success(res.data.message || "OTP sent to your email!");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setActionLoading(false);
    }
  };

  // 🔹 Verify Registration OTP
  const verifyEmail = async (data) => {
    setActionLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/auth/verify-registration-otp`,
        data
      );
      toast.success(res.data.message || "Email verified successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setActionLoading(false);
    }
  };

  // 🔹 Login
  const loginUser = async (credentials) => {
    setActionLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, credentials);
      localStorage.setItem("accessToken", res.data.accessToken);
      setUser(res.data.user);
      setIsAuthenticated(true);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setActionLoading(false);
    }
  };

  // 🔹 Logout
  const logoutUser = async () => {
    setActionLoading(true);
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } catch {}
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsAuthenticated(false);
    toast.info("Logged out");
    setActionLoading(false);
    navigate("/login");
  };

  // 🔹 Forgot Password (Request OTP/Reset Link)
  const forgotPassword = async (email) => {
    setActionLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/auth/forgot-password`, {
        email,
      });
      if (data.success) {
        toast.success(data.message);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setActionLoading(false);
    }
  };

  const verifyResetOtp = async (email, otp) => {
    setActionLoading(true);
    try {
      const { data } = await axios.post(
        `${API_URL}/auth/verify-password-reset-otp`,
        {
          email,
          otp,
        }
      );
      if (data.success) {
        toast.success(data.message);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setActionLoading(false);
    }
  };

  // 🔹 Reset Password (using token)
  const resetPassword = async (email, newPassword) => {
    setActionLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/reset-password`, {
        email,
        newPassword,
      });
      toast.success(res.data.message || "Password reset successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <Loader />;

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
        forgotPassword,
        resetPassword,
        verifyResetOtp,
      }}
    >
      {children}
      {actionLoading && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-[9999]">
          <Loader />
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
