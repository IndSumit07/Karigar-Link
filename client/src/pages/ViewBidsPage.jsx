import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useRFQ } from "../contexts/RFQContext";
import { useAuth } from "../contexts/AuthContext";
import DashboardLayout from "../components/DashboardLayout";
import {
  Package,
  Calendar,
  Tag,
  FileText,
  Clock,
  DollarSign,
  Send,
  ArrowLeft,
  User,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  MessageCircle,
} from "lucide-react";

export default function ViewBidsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchRFQById, fetchRFQBids, bids, createBid } = useRFQ();
  const { user } = useAuth();
  const [rfq, setRfq] = useState(null);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidForm, setBidForm] = useState({
    bidAmount: "",
    message: "",
    etaDays: "",
  });

  useEffect(() => {
    (async () => {
      const d = await fetchRFQById(id);
      setRfq(d);
      await fetchRFQBids(id);
    })();
  }, [id]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is a provider
    if (user?.role !== "provider") {
      alert("Only providers can place bids. Please register as a provider.");
      return;
    }

    try {
      await createBid({
        rfqId: id,
        bidAmount: parseFloat(bidForm.bidAmount),
        message: bidForm.message,
        etaDays: bidForm.etaDays ? parseInt(bidForm.etaDays) : undefined,
      });
      setShowBidForm(false);
      setBidForm({ bidAmount: "", message: "", etaDays: "" });
      await fetchRFQBids(id);
    } catch (err) {
      console.error("Bid submission error:", err);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: Clock },
      accepted: { bg: "bg-green-100", text: "text-green-800", icon: CheckCircle },
      rejected: { bg: "bg-red-100", text: "text-red-800", icon: XCircle },
    };
    return styles[status] || styles.pending;
  };

  if (!rfq) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  const isOwner = user?._id === rfq.buyerId?._id || user?._id === rfq.buyerId;
  const isProvider = user?.role === "provider";
  const canBid = isProvider && !isOwner && rfq.status === "active";

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {rfq.title || "RFQ Details"}
            </h1>
            <p className="text-gray-600">Request for Quotation</p>
          </div>
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${
              rfq.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {rfq.status === "active" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            {rfq.status}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RFQ Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{rfq.description}</p>

            {rfq.specs && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Specifications
                </h3>
                <p className="text-gray-700 leading-relaxed">{rfq.specs}</p>
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Package className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-medium">Quantity</span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {rfq.quantity}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-medium">Deadline</span>
                </div>
                <div className="text-sm font-bold text-gray-900">
                  {new Date(rfq.deadline).toLocaleDateString()}
                </div>
              </div>
              {rfq.category && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Tag className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-medium">Category</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 capitalize">
                    {rfq.category}
                  </div>
                </div>
              )}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <FileText className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-medium">Bids</span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {bids.length}
                </div>
              </div>
            </div>
          </div>

          {/* Buyer Info */}
          {rfq.buyerId && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Posted By</h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold text-lg">
                  {rfq.buyerId?.fullname?.firstname?.charAt(0) || "U"}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {rfq.buyerId?.fullname?.firstname}{" "}
                    {rfq.buyerId?.fullname?.lastname}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {rfq.buyerId?.email}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bids List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">
              Bids Received ({bids.length})
            </h2>
            <div className="space-y-4">
              {bids.length === 0 && (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No bids received yet</p>
                </div>
              )}
              {bids.map((b) => {
                const statusStyle = getStatusBadge(b.status);
                const StatusIcon = statusStyle.icon;
                return (
                  <div
                    key={b._id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">
                          {b.artisanId?.fullname?.firstname?.charAt(0) || "U"}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {b.artisanId?.fullname?.firstname || "Unnamed"}{" "}
                            {b.artisanId?.fullname?.lastname || ""}
                          </div>
                          <div className="text-xs text-gray-500">
                            {b.artisanId?.email}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {b.status}
                      </div>
                    </div>

                    {b.message && (
                      <p className="text-sm text-gray-700 mb-3 bg-gray-50 p-3 rounded-lg">
                        {b.message}
                      </p>
                    )}

                      <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-lg font-bold text-gray-900">
                          <DollarSign className="w-5 h-5 text-orange-500" />
                          ₹{b.bidAmount}
                        </div>
                        {b.etaDays && (
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {b.etaDays} days
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => navigate(`/chat/${isOwner ? b.artisanId._id : rfq.buyerId._id}`)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Chat
                      </button>
                    </div>

                    {b.status === "rejected" && b.rejectionReason && (
                      <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                        <div className="text-xs text-red-600 flex items-start gap-1">
                          <AlertCircle className="w-3 h-3 mt-0.5" />
                          <span>
                            <strong>Rejection reason:</strong> {b.rejectionReason}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar - Bid Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            {!canBid && (
              <div className="text-center py-6">
                {isOwner ? (
                  <>
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm">
                      This is your RFQ. You cannot place bids on your own requests.
                    </p>
                  </>
                ) : !isProvider ? (
                  <>
                    <AlertCircle className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm mb-4">
                      Only providers can place bids.
                    </p>
                    <Link
                      to="/register"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                    >
                      Register as Provider
                    </Link>
                  </>
                ) : rfq.status !== "active" ? (
                  <>
                    <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm">
                      This RFQ is closed and no longer accepting bids.
                    </p>
                  </>
                ) : null}
              </div>
            )}

            {canBid && !showBidForm && (
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Place Your Bid
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Submit a competitive bid for this RFQ
                </p>
                <button
                  onClick={() => setShowBidForm(true)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-sm hover:shadow-md"
                >
                  <Send className="w-5 h-5" />
                  Place Bid
                </button>
              </div>
            )}

            {canBid && showBidForm && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Submit Your Bid
                </h3>
                <form onSubmit={handleBidSubmit} className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 text-orange-500" />
                      Bid Amount (₹) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      required
                      value={bidForm.bidAmount}
                      onChange={(e) =>
                        setBidForm({ ...bidForm, bidAmount: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Enter your bid amount"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      Estimated Delivery (days)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={bidForm.etaDays}
                      onChange={(e) =>
                        setBidForm({ ...bidForm, etaDays: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="e.g., 30"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <FileText className="w-4 h-4 text-orange-500" />
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={bidForm.message}
                      onChange={(e) =>
                        setBidForm({ ...bidForm, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Add any details about your offer..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Submit Bid
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowBidForm(false)}
                      className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
