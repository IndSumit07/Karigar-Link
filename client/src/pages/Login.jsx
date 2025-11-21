import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Mail, Lock, LogIn, ArrowLeft, Sparkles } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loginUser, loading } = useAuth();

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-yellow-50 relative overflow-hidden px-4 py-12">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back to Home</span>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to continue to KarigarLink
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
              >
                <Mail className="w-4 h-4 text-orange-500" />
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
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
              >
                <Lock className="w-4 h-4 text-orange-500" />
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
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Link
            to="/register"
            className="block w-full py-3 text-center border-2 border-orange-300 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all"
          >
            Create Account
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Login;
