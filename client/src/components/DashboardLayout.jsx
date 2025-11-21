import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  LayoutDashboard,
  User,
  ShoppingCart,
  FileText,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Package,
  MessageSquare,
} from "lucide-react";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  const navigationItems = [
    {
      name: user?.role === "provider" ? "Provider Dashboard" : "Dashboard",
      path: user?.role === "provider" ? "/provider-dashboard" : "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
    // Show My RFQs only for customers
    ...(user?.role === "customer"
      ? [
          {
            name: "My RFQs",
            path: "/my-rfqs",
            icon: FileText,
          },
        ]
      : []),
    {
      name: "Browse RFQs",
      path: "/rfqs",
      icon: ShoppingCart,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: Bell,
    },
    {
      name: "Messages",
      path: "/chat",
      icon: MessageSquare,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-yellow-50/30">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-orange-500">Karigar</span>
          <span className="text-gray-900">Link</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <Link to="/" className="text-2xl font-bold block">
              <span className="text-orange-500">Karigar</span>
              <span className="text-gray-900">Link</span>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold text-lg">
                {user?.fullname?.firstname?.charAt(0) || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {user?.fullname?.firstname} {user?.fullname?.lastname}
                </p>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
            <div className="mt-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 capitalize">
                {user?.role || "User"}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      active
                        ? "bg-orange-50 text-orange-600 font-medium shadow-sm"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
