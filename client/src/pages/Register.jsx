import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { User, Mail, Lock, UserPlus, ArrowLeft, Sparkles, Briefcase } from "lucide-react";

export default function Register() {
  const { registerUser, loading } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      fullname: {
        firstname: formData.firstName,
        lastname: formData.lastName,
      },
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };
    await registerUser(payload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-yellow-50 relative overflow-hidden py-12 px-4">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-lg">
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
              Create Account
            </h1>
            <p className="text-gray-600">
              Join KarigarLink community today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
                >
                  <User className="w-4 h-4 text-orange-500" />
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
                >
                  <User className="w-4 h-4 text-orange-500" />
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

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
                placeholder="john@example.com"
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
                placeholder="Create a strong password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Briefcase className="w-4 h-4 text-orange-500" />
                Select Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "customer" })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.role === "customer"
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-orange-300"
                  }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Customer</div>
                  <div className="text-xs mt-1 opacity-80">Buy products</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "provider" })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.role === "provider"
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-orange-300"
                  }`}
                >
                  <Briefcase className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Provider</div>
                  <div className="text-xs mt-1 opacity-80">Sell products</div>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
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
                Already have an account?
              </span>
            </div>
          </div>

          {/* Sign In Link */}
          <Link
            to="/login"
            className="block w-full py-3 text-center border-2 border-orange-300 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all"
          >
            Sign In
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
}
