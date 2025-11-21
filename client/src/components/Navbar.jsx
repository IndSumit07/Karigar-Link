import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Package,
  FileText,
  Bell,
  Sparkles,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Hide navbar on login/register pages
  const hideNavbar = ["/login", "/register"].includes(location.pathname);
  if (hideNavbar) return null;

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  const navLinks = isAuthenticated
    ? [
        {
          label: "Dashboard",
          path: user?.role === "provider" ? "/provider-dashboard" : "/dashboard",
          icon: LayoutDashboard,
        },
        { label: "Browse RFQs", path: "/rfqs", icon: Package },
        { label: "My RFQs", path: "/my-rfqs", icon: FileText },
        { label: "Notifications", path: "/notifications", icon: Bell },
      ]
    : [];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              KarigarLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                {/* Nav Links */}
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-all ${
                        isActive
                          ? "bg-orange-100 text-orange-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-white font-bold text-sm">
                      {user?.fullname?.firstname?.charAt(0) || "U"}
                    </div>
                    <span className="font-semibold text-gray-700">
                      {user?.fullname?.firstname}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {/* Dropdown */}
                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">
                            {user?.fullname?.firstname} {user?.fullname?.lastname}
                          </p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                          <span className="inline-block mt-2 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full capitalize">
                            {user?.role}
                          </span>
                        </div>
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-orange-600 transition-colors font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="px-4 py-3 mb-3 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-white font-bold">
                      {user?.fullname?.firstname?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {user?.fullname?.firstname} {user?.fullname?.lastname}
                      </p>
                      <p className="text-xs text-gray-600">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full capitalize">
                        {user?.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                          isActive
                            ? "bg-orange-100 text-orange-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {link.label}
                      </Link>
                    );
                  })}
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold transition-all"
                  >
                    <User className="w-5 h-5" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-semibold transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-center font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold text-center"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
