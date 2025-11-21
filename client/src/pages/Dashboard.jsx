import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useRFQ } from "../contexts/RFQContext";
import DashboardLayout from "../components/DashboardLayout";
import {
  FileText,
  Package,
  CheckCircle,
  Clock,
  ArrowRight,
  Plus,
  TrendingUp,
  Calendar,
  Eye,
  MessageSquare,
  Award,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { myRfqs, fetchMyRFQs, rfqs, fetchRFQs } = useRFQ();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchMyRFQs(), fetchRFQs()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Calculate statistics
  const totalRFQs = myRfqs?.length || 0;
  const activeRFQs = myRfqs?.filter(rfq => rfq.status === "active")?.length || 0;
  const completedRFQs = myRfqs?.filter(rfq => rfq.status === "completed")?.length || 0;
  const totalBidsReceived = myRfqs?.reduce((sum, rfq) => sum + (rfq.bids?.length || 0), 0) || 0;

  const stats = [
    {
      label: "Total RFQs",
      value: totalRFQs,
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Active RFQs",
      value: activeRFQs,
      icon: Clock,
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      label: "Completed",
      value: completedRFQs,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      label: "Bids Received",
      value: totalBidsReceived,
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  const quickActions = [
    {
      title: "Create New RFQ",
      description: "Post a new request for quotation",
      link: "/rfq/create",
      icon: Plus,
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      title: "Browse RFQs",
      description: "Explore available opportunities",
      link: "/rfqs",
      icon: Package,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "My RFQs",
      description: "Manage your posted RFQs",
      link: "/my-rfqs",
      icon: FileText,
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  // Get recent RFQs
  const recentRFQs = myRfqs?.slice(0, 5) || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {user?.fullname?.firstname}!
              </h1>
              <p className="text-white/90">
                Here's your customer dashboard overview
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.link}
                  className="group p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-lg transition-all"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {action.description}
                  </p>
                  <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm">
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent RFQs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-500" />
              My Recent RFQs
            </h2>
            <Link
              to="/my-rfqs"
              className="text-sm text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            </div>
          ) : recentRFQs.length > 0 ? (
            <div className="space-y-3">
              {recentRFQs.map((rfq) => (
                <Link
                  key={rfq._id}
                  to={`/rfq/${rfq._id}`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-orange-50 hover:border-orange-200 border border-transparent transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">
                      {rfq.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        rfq.status === "active"
                          ? "bg-green-100 text-green-700"
                          : rfq.status === "completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {rfq.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {rfq.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(rfq.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {rfq.bids?.length || 0} bids
                    </span>
                    {rfq.budget && (
                      <span className="font-semibold text-orange-600">
                        ₹{rfq.budget.toLocaleString()}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No RFQs created yet</p>
              <Link
                to="/rfq/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Create Your First RFQ
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
