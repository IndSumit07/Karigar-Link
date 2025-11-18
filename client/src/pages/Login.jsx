import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isVisible, setIsVisible] = useState(false);
  const { loginUser, loading } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      password: formData.password,
    };

    await loginUser(payload);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#f5be67" }}
    >
      {/* Soft radial glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5be67] via-[#f0af4f] to-[#e39a2d] opacity-90"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

      {/* Center Card */}
      <div className={`relative z-10 w-full max-w-md backdrop-blur-xl bg-white/95 rounded-3xl shadow-2xl border-4 border-white p-10 transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
      }`}>
        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-1000 delay-200 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <Link
            to="/"
            className="text-5xl font-extrabold tracking-tight"
            style={{ color: "#f5be67" }}
          >
            KarigarLink
          </Link>
          <p className="text-gray-700 mt-2 text-lg">Welcome back 👋</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={`space-y-6 transition-all duration-1000 delay-400 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          {/* Email */}
          <div className={`transition-all duration-700 delay-600 transform ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
          }`}>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-5 py-3 rounded-2xl border-2 border-gray-300 focus:border-[#f5be67] focus:ring-4 focus:ring-[#f5be67]/20 text-gray-900 text-lg transition-all outline-none"
            />
          </div>

          {/* Password */}
          <div className={`transition-all duration-700 delay-700 transform ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
          }`}>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-5 py-3 rounded-2xl border-2 border-gray-300 focus:border-[#f5be67] focus:ring-4 focus:ring-[#f5be67]/20 text-gray-900 text-lg transition-all outline-none"
            />
          </div>

          {/* Options */}
          <div className={`flex items-center justify-between transition-all duration-700 delay-800 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}>
            <label className="flex items-center gap-2 text-gray-700 text-sm">
              <input
                type="checkbox"
                className="w-5 h-5 accent-[#f5be67] rounded"
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="font-semibold text-sm hover:underline transition-all"
              style={{ color: "#f5be67" }}
              onMouseEnter={(e) => (e.target.style.color = "#e6a855")}
              onMouseLeave={(e) => (e.target.style.color = "#f5be67")}
            >
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 mt-4 text-lg font-bold rounded-2xl shadow-lg text-white transition-all duration-700 hover:-translate-y-1 disabled:opacity-50 delay-900 transform ${
              isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
            }`}
            style={{ backgroundColor: "#f5be67" }}
            onMouseEnter={(e) =>
              !loading && (e.target.style.backgroundColor = "#e6a855")
            }
            onMouseLeave={(e) =>
              !loading && (e.target.style.backgroundColor = "#f5be67")
            }
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className={`mt-8 border-t border-gray-200 pt-6 text-center transition-all duration-700 delay-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}>
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-bold hover:underline transition-all"
              style={{ color: "#f5be67" }}
              onMouseEnter={(e) => (e.target.style.color = "#e6a855")}
              onMouseLeave={(e) => (e.target.style.color = "#f5be67")}
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className={`text-center mt-6 transition-all duration-700 delay-1100 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}>
          <Link
            to="/"
            className="text-gray-700 hover:text-gray-900 font-semibold transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
