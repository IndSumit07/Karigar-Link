import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useRFQ } from "../contexts/RFQContext";
import DashboardLayout from "../components/DashboardLayout";
import {
  Package,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  ArrowRight,
  Briefcase,
  FileText,
  Award,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

const ProviderDashboard = () => {
  const { user } = useAuth();
  const { myBids, fetchMyBids, rfqs, fetchRFQs } = useRFQ();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchMyBids(), fetchRFQs()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Calculate statistics
  const totalBids = myBids?.length || 0;
  const acceptedBids = myBids?.filter(bid => bid.status === "accepted")?.length || 0;
  const pendingBids = myBids?.filter(bid => bid.status === "pending")?.length || 0;
  const rejectedBids = myBids?.filter(bid => bid.status === "rejected")?.length || 0;
  const totalEarnings = myBids
    ?.filter(bid => bid.status === "accepted")
    ?.reduce((sum, bid) => sum + (bid.bidAmount || 0), 0) || 0;

  const stats = [
    {
      label: "Total Bids",
      value: totalBids,
      icon: Briefcase,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Accepted",
      value: acceptedBids,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      label: "Pending",
      value: pendingBids,
      icon: Clock,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      label: "Total Earnings",
      value: `₹${totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  // Get recent RFQs (active ones)
  const recentRFQs = rfqs?.filter(rfq => rfq.status === "active")?.slice(0, 5) || [];

  // Get recent bids
  const recentBids = myBids?.slice(0, 5) || [];

  // Calculate success rate
  const successRate = totalBids > 0 ? ((acceptedBids / totalBids) * 100).toFixed(1) : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
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
                Here's your provider dashboard overview
              </p>
            </div>
          </div>
          {totalBids > 0 && (
            <div className="mt-4 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-flex">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">Success Rate: {successRate}%</span>
            </div>
          )}
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
            <Link
              to="/rfqs"
              className="flex items-center gap-3 p-4 bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-xl hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Browse RFQs</div>
                <div className="text-sm text-gray-600">Find new opportunities</div>
              </div>
              <ArrowRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/chat"
              className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Messages</div>
                <div className="text-sm text-gray-600">Chat with customers</div>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Update Profile</div>
                <div className="text-sm text-gray-600">Enhance your profile</div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* My Recent Bids */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-orange-500" />
              My Recent Bids
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            </div>
          ) : recentBids.length > 0 ? (
            <div className="space-y-3">
              {recentBids.map((bid) => (
                <div
                  key={bid._id}
                  className="p-4 bg-gray-50 rounded-lg border border-transparent hover:border-orange-200 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">
                      {bid.rfqId?.title || "RFQ"}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        bid.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : bid.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {bid.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Bid Amount:</span>
                    <span className="font-semibold text-orange-600">
                      ₹{bid.bidAmount?.toLocaleString()}
                    </span>
                  </div>
                  {bid.message && (
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                      {bid.message}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(bid.createdAt).toLocaleDateString()}
                    </span>
                    {bid.etaDays && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {bid.etaDays} days
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Briefcase className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p className="mb-3">No bids placed yet</p>
              <Link
                to="/rfqs"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
              >
                <Package className="w-4 h-4" />
                Browse RFQs
              </Link>
            </div>
          )}
        </div>

        {/* Performance Insights */}
        {totalBids > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              Performance Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-900">Accepted Bids</span>
                </div>
                <div className="text-2xl font-bold text-green-600">{acceptedBids}</div>
                <div className="text-sm text-green-700">Success rate: {successRate}%</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-900">Pending Bids</span>
                </div>
                <div className="text-2xl font-bold text-yellow-600">{pendingBids}</div>
                <div className="text-sm text-yellow-700">Awaiting response</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-900">Rejected Bids</span>
                </div>
                <div className="text-2xl font-bold text-red-600">{rejectedBids}</div>
                <div className="text-sm text-red-700">Learn and improve</div>
              </div>
            </div>
          </div>
        )}

        {/* Available RFQs (Moved to bottom) */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-orange-500" />
              Available RFQs
            </h2>
            <Link
              to="/rfqs"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <span className="text-sm font-semibold text-orange-600">
                      ₹{rfq.budget?.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <span className="font-medium text-gray-700">By:</span>
                    {rfq.buyerId?.fullname?.firstname} {rfq.buyerId?.fullname?.lastname}
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
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No active RFQs available</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProviderDashboard;
