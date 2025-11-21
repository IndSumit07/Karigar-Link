import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";
import { useSocket } from "../contexts/SocketContext";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/notifications`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  useEffect(() => {
    if (socket) {
      socket.on("receive_notification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        toast.info(`New Notification: ${notification.message}`);
      });

      return () => {
        socket.off("receive_notification");
      };
    }
  }, [socket]);

  const filters = [
    { id: "all", label: "All", count: notifications.length },
    {
      id: "unread",
      label: "Unread",
      count: notifications.filter((n) => !n.isRead).length,
    },
    {
      id: "BID_RECEIVED",
      label: "Bids",
      count: notifications.filter((n) => n.type === "BID_RECEIVED").length,
    },
    {
      id: "NEW_MESSAGE",
      label: "Messages",
      count: notifications.filter((n) => n.type === "NEW_MESSAGE").length,
    },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !notification.isRead;
    return notification.type === activeFilter;
  });

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/notifications/${id}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/notifications/read-all`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, isRead: true }))
      );
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const getColorClasses = (type, isRead) => {
    const baseClasses = {
      BID_RECEIVED: isRead
        ? "bg-blue-50 border-blue-200"
        : "bg-blue-100 border-blue-300",
      BID_ACCEPTED: isRead
        ? "bg-green-50 border-green-200"
        : "bg-green-100 border-green-300",
      BID_REJECTED: isRead
        ? "bg-red-50 border-red-200"
        : "bg-red-100 border-red-300",
      NEW_MESSAGE: isRead
        ? "bg-purple-50 border-purple-200"
        : "bg-purple-100 border-purple-300",
      ORDER_UPDATE: isRead
        ? "bg-orange-50 border-orange-200"
        : "bg-orange-100 border-orange-300",
    };
    return baseClasses[type] || "bg-gray-50 border-gray-200";
  };

  const getIcon = (type) => {
    switch (type) {
      case "BID_RECEIVED":
        return "💰";
      case "BID_ACCEPTED":
        return "✅";
      case "BID_REJECTED":
        return "❌";
      case "NEW_MESSAGE":
        return "💬";
      case "ORDER_UPDATE":
        return "📦";
      default:
        return "🔔";
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">
              Stay updated with your orders and messages
            </p>
          </div>
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-sm font-medium bg-orange-500 text-white rounded-lg shadow-sm hover:bg-orange-600 transition-all duration-200"
          >
            Mark All Read
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <nav className="flex space-x-8 px-6 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                activeFilter === filter.id
                  ? "border-orange-500 text-orange-500"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {filter.label}
              {filter.count > 0 && (
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700">
                  {filter.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Notifications List */}
      <div>
        {loading ? (
          <div className="text-center py-12">Loading notifications...</div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notifications
            </h3>
            <p className="text-gray-600">
              You're all caught up! Check back later for updates.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification._id}
                onClick={() => handleNotificationClick(notification)}
                className={`border rounded-xl p-6 transition-all duration-200 hover:shadow-md cursor-pointer ${getColorClasses(
                  notification.type,
                  notification.isRead
                )} ${!notification.isRead ? "ring-2 ring-orange-200" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl shadow-sm">
                        {getIcon(notification.type)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={`text-lg font-semibold ${
                            !notification.isRead
                              ? "text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {notification.type.replace(/_/g, " ")}
                        </h3>
                        {!notification.isRead && (
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        )}
                      </div>
                      
                      {notification.sender && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                            {notification.sender.fullname?.firstname?.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {notification.sender.fullname?.firstname} {notification.sender.fullname?.lastname}
                          </span>
                        </div>
                      )}

                      <p
                        className={`text-sm ${
                          !notification.isRead
                            ? "text-gray-700"
                            : "text-gray-600"
                        } mb-2`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.isRead && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification._id);
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        title="Mark as read"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Notifications;