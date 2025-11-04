import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const [step, setStep] = useState(1);
  const { registerUser, verifyEmail, loading } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "customer", // default role
  });

  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1 - Send OTP
  const handleSubmitStep1 = async (e) => {
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

    const data = await registerUser(payload);

    if (data) {
      setStep(2);
    }
  };

  // Step 2 - Verify OTP and Register
  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      otp: otp,
    };
    await verifyEmail(payload);
  };

  const inputStyle = { borderColor: "#f5be67" };
  const handleFocus = (e) => {
    e.target.style.borderColor = "#e6a855";
    e.target.style.boxShadow = "0 0 0 3px rgba(245,190,103,0.1)";
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = "#f5be67";
    e.target.style.boxShadow = "none";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12"
      style={{ backgroundColor: "#f5be67" }}
    >
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-5xl font-bold text-white hover:text-gray-100 transition-colors"
          >
            KarigarLink
          </Link>
          <p className="text-white text-lg mt-2 opacity-90">
            {step === 1
              ? "Join our community of professionals"
              : "Verify your email to complete registration"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border-4 border-white transition-all duration-300">
          {step === 1 ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600">
                  Fill in your details to get started
                </p>
              </div>

              <form onSubmit={handleSubmitStep1} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-3 rounded-xl text-lg focus:outline-none transition-all duration-300"
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      placeholder="Enter first name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-3 rounded-xl text-lg focus:outline-none transition-all duration-300"
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
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
                    className="w-full px-4 py-3 border-3 rounded-xl text-lg focus:outline-none transition-all duration-300"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-2"
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
                    className="w-full px-4 py-3 border-3 rounded-xl text-lg focus:outline-none transition-all duration-300"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Create password"
                  />
                </div>

                {/* Role dropdown */}
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Select Role
                  </label>

                  {/* Custom styled select to match theme */}
                  <div className="relative">
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="appearance-none w-full px-4 py-3 border-3 rounded-xl text-lg focus:outline-none transition-all duration-300"
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    >
                      <option value="customer">Customer</option>
                      <option value="provider">Provider</option>
                    </select>

                    {/* Chevron icon (pure CSS) */}
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="#7a5a2f"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:-translate-y-1 mt-6"
                  style={{ backgroundColor: "#f5be67" }}
                  onMouseEnter={(e) =>
                    !loading && (e.target.style.backgroundColor = "#e6a855")
                  }
                  onMouseLeave={(e) =>
                    !loading && (e.target.style.backgroundColor = "#f5be67")
                  }
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                      Sending OTP...
                    </div>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Verify OTP
                </h2>
                <p className="text-gray-600">
                  Enter the 6-digit OTP sent to <b>{formData.email}</b>
                </p>
              </div>

              <form onSubmit={handleSubmitStep2} className="space-y-6">
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    OTP Code
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 border-3 rounded-xl text-lg tracking-widest text-center focus:outline-none transition-all duration-300"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter OTP"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  style={{ backgroundColor: "#f5be67" }}
                  onMouseEnter={(e) =>
                    !loading && (e.target.style.backgroundColor = "#e6a855")
                  }
                  onMouseLeave={(e) =>
                    !loading && (e.target.style.backgroundColor = "#f5be67")
                  }
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    "Verify & Register"
                  )}
                </button>
              </form>
            </>
          )}

          <div className="mt-8 text-center">
            {step === 1 ? (
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold hover:underline transition-colors"
                  style={{ color: "#f5be67" }}
                  onMouseEnter={(e) => (e.target.style.color = "#e6a855")}
                  onMouseLeave={(e) => (e.target.style.color = "#f5be67")}
                >
                  Sign In
                </Link>
              </p>
            ) : (
              <button
                onClick={() => setStep(1)}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back to details
              </button>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-white hover:text-gray-100 font-semibold transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
