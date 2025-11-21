import React, { useEffect, useState } from "react";
import { useRFQ } from "../contexts/RFQContext";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import {
  Plus,
  Package,
  Calendar,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  AlertCircle,
} from "lucide-react";

export default function MyRFQsPage() {
  const { myRfqs, fetchMyRFQs, fetchRFQBids, bids, deleteRFQ, updateBidStatus } =
    useRFQ();
  const [selected, setSelected] = useState(null);
  const [bidStats, setBidStats] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectingBid, setRejectingBid] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    fetchMyRFQs();
  }, []);

  const openBids = async (rfq) => {
    setSelected(rfq);
    const result = await fetchRFQBids(rfq._id);
    if (result?.stats) {
      setBidStats(result.stats);
    }
  };

  const handleAcceptBid = async (bidId) => {
    if (!window.confirm("Accept this bid? This will close the RFQ.")) return;

    try {
      await updateBidStatus(bidId, "accepted");
      await openBids(selected);
      await fetchMyRFQs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRejectBid = async () => {
    if (!rejectingBid) return;

    try {
      await updateBidStatus(rejectingBid, "rejected", rejectionReason);
      setShowRejectModal(false);
      setRejectingBid(null);
      setRejectionReason("");
      await openBids(selected);
    } catch (err) {
      console.error(err);
    }
  };

  const openRejectModal = (bidId) => {
    setRejectingBid(bidId);
    setShowRejectModal(true);
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: Clock },
      accepted: { bg: "bg-green-100", text: "text-green-800", icon: CheckCircle },
      rejected: { bg: "bg-red-100", text: "text-red-800", icon: XCircle },
    };
    return styles[status] || styles.pending;
  };

  const handleDeleteRFQ = async (rfqId) => {
    if (!window.confirm("Are you sure you want to delete this RFQ?")) return;
    await deleteRFQ(rfqId);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My RFQs</h1>
          <p className="text-gray-600">
            Manage your posted RFQs and review bids
          </p>
        </div>
        <Link
          to="/rfq/create"
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5" />
          Create New RFQ
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RFQs List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold mb-6">Posted RFQs</h3>

            <div className="space-y-4">
              {myRfqs.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No RFQs yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Create your first RFQ to get started
                  </p>
                  <Link
                    to="/rfq/create"
                    className="inline-flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Create RFQ
                  </Link>
                </div>
              )}
              {myRfqs.map((r) => (
                <div
                  key={r._id}
                  className={`p-5 border rounded-xl transition-all ${
                    selected?._id === r._id
                      ? "border-orange-300 bg-orange-50/50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-gray-900 mb-2">
                        {r.title || r.description.slice(0, 60)}
                      </h4>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4 text-orange-500" />
                          <span>Qty: {r.quantity}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-orange-500" />
                          <span>
                            {new Date(r.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {r.specs && (
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {r.specs}
                        </p>
                      )}
                    </div>
                    <div className="text-right ml-4 flex flex-col gap-2">
                      <div
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                          r.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {r.status === "active" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {r.status}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => openBids(r)}
                      className="flex items-center gap-1 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Bids
                    </button>
                    <button
                      onClick={() => handleDeleteRFQ(r._id)}
                      className="flex items-center gap-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bids Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <h4 className="font-semibold text-lg mb-4">
              {selected ? "Bids Received" : "Select an RFQ"}
            </h4>

            {!selected && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 text-sm">
                  Click "View Bids" on an RFQ to see all received bids
                </p>
              </div>
            )}

            {selected && (
              <>
                <div className="mb-4 pb-4 border-b">
                  <h5 className="font-semibold text-gray-900 mb-1">
                    {selected.title || selected.description.slice(0, 40)}
                  </h5>
                  <p className="text-sm text-gray-600">Qty: {selected.quantity}</p>
                </div>

                {/* Bid Statistics */}
                {bidStats && bidStats.totalBids > 0 && (
                  <div className="mb-4 p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                    <h6 className="font-semibold text-sm mb-3 text-gray-900">
                      Bid Statistics
                    </h6>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-lg p-2">
                        <div className="text-xs text-gray-600 mb-1">Total Bids</div>
                        <div className="text-lg font-bold text-gray-900">
                          {bidStats.totalBids}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <div className="text-xs text-gray-600 mb-1">Pending</div>
                        <div className="text-lg font-bold text-yellow-600">
                          {bidStats.pendingBids}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                          <TrendingDown className="w-3 h-3 text-green-600" />
                          Min Bid
                        </div>
                        <div className="text-sm font-bold text-green-600">
                          ₹{bidStats.minBid}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-2">
                        <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-red-600" />
                          Max Bid
                        </div>
                        <div className="text-sm font-bold text-red-600">
                          ₹{bidStats.maxBid}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-2 col-span-2">
                        <div className="text-xs text-gray-600 mb-1">Average Bid</div>
                        <div className="text-lg font-bold text-orange-600">
                          ₹{bidStats.avgBid}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bids List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {bids.length === 0 && (
                    <div className="text-center py-8">
                      <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 text-sm">No bids received yet</p>
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
                          <div>
                            <div className="font-semibold text-sm text-gray-900">
                              {b.artisanId?.fullname?.firstname || "Unnamed"}{" "}
                              {b.artisanId?.fullname?.lastname || ""}
                            </div>
                            <div className="text-xs text-gray-500">
                              {b.artisanId?.email}
                            </div>
                          </div>
                          <div
                            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {b.status}
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">
                          {b.message || "No message provided"}
                        </p>

                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center gap-1 font-bold text-lg text-gray-900">
                              <DollarSign className="w-4 h-4 text-orange-500" />
                              ₹{b.bidAmount}
                            </div>
                            {b.etaDays && (
                              <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                <Clock className="w-3 h-3" />
                                ETA: {b.etaDays} days
                              </div>
                            )}
                          </div>

                          {b.status === "pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAcceptBid(b._id)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors"
                              >
                                <CheckCircle className="w-3 h-3" />
                                Accept
                              </button>
                              <button
                                onClick={() => openRejectModal(b._id)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors"
                              >
                                <XCircle className="w-3 h-3" />
                                Reject
                              </button>
                            </div>
                          )}

                          {b.status === "rejected" && b.rejectionReason && (
                            <div className="text-xs text-red-600 mt-2 flex items-start gap-1">
                              <AlertCircle className="w-3 h-3 mt-0.5" />
                              <span>{b.rejectionReason}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Reject Bid</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejecting this bid (optional):
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4 transition-all"
              placeholder="e.g., Price too high, Timeline doesn't work..."
              rows={4}
            />
            <div className="flex gap-3">
              <button
                onClick={handleRejectBid}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                Reject Bid
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectingBid(null);
                  setRejectionReason("");
                }}
                className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
