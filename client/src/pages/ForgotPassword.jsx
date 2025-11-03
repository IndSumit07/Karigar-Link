import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const { forgotPassword, resetPassword, verifyResetOtp } = useAuth();

  const inputStyle = { borderColor: "#f5be67" };
  const handleFocus = (e) => {
    e.target.style.borderColor = "#e6a855";
    e.target.style.boxShadow = "0 0 0 3px rgba(245,190,103,0.1)";
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = "#f5be67";
    e.target.style.boxShadow = "none";
  };

  // Step 1: Send OTP to Email
  const handleSendOTP = async (e) => {
    e.preventDefault();
    const data = await forgotPassword(email);
    if (data) {
      setStep(2);
    }
  };

  // Step 2: Verify OTP (simulate success, move to step 3)
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const data = await verifyResetOtp(email, otp);
    if (data) {
      setStep(3);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    await resetPassword(email, newPassword);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12"
      style={{ backgroundColor: "#f5be67" }}
    >
      <div className="w-full max-w-lg">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-5xl font-bold text-white hover:text-gray-100 transition-colors"
          >
            KarigarLink
          </Link>
          <p className="text-white text-lg mt-2 opacity-90">
            {step === 1
              ? "Forgot your password?"
              : step === 2
              ? "Verify your email"
              : "Set your new password"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border-4 border-white transition-all duration-300">
          {step === 1 && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Reset Password
                </h2>
                <p className="text-gray-600">Enter your email to receive OTP</p>
              </div>

              <form onSubmit={handleSendOTP} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-3 rounded-xl text-lg focus:outline-none transition-all duration-300"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter your email"
                  />
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
          )}

          {step === 2 && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Verify OTP
                </h2>
                <p className="text-gray-600">
                  Enter the OTP sent to <b>{email}</b>
                </p>
              </div>

              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    OTP Code
                  </label>
                  <input
                    id="otp"
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
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
                  Verify OTP
                </button>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Set New Password
                </h2>
                <p className="text-gray-600">
                  Choose a strong password to secure your account
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    New Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 border-3 rounded-xl text-lg focus:outline-none transition-all duration-300"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter new password"
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
                      Resetting...
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            </>
          )}

          {/* Navigation */}
          <div className="mt-8 text-center">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back
              </button>
            ) : (
              <p className="text-gray-600">
                Remember password?{" "}
                <Link
                  to="/login"
                  className="font-bold hover:underline transition-colors"
                  style={{ color: "#f5be67" }}
                >
                  Login
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* Back to Home */}
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
};

export default ForgotPassword;
