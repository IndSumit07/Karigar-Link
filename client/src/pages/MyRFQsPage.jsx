// pages/MyRFQsPage.jsx
import React, { useEffect, useState } from "react";
import { useRFQ } from "../contexts/RFQContext";
import { Link } from "react-router-dom";

const themeYellow = "#f5be67";

export default function MyRFQsPage() {
  const { myRfqs, fetchMyRFQs, fetchRFQBids, bids, deleteRFQ } = useRFQ();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchMyRFQs();
  }, []);

  const openBids = async (rfq) => {
    setSelected(rfq);
    await fetchRFQBids(rfq._id);
  };

  return (
    <div
      className="min-h-screen py-12"
      style={{ backgroundColor: themeYellow }}
    >
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center mb-6">
          <Link to="/" className="text-5xl font-bold text-white">
            KarigarLink
          </Link>
          <p className="text-white mt-2">My RFQs</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Posted RFQs</h3>
                <Link
                  to="/rfq/create"
                  className="text-sm font-semibold"
                  style={{ color: themeYellow }}
                >
                  + New RFQ
                </Link>
              </div>

              <div className="space-y-4">
                {myRfqs.length === 0 && (
                  <p className="text-gray-600">No RFQs yet</p>
                )}
                {myRfqs.map((r) => (
                  <div
                    key={r._id}
                    className="p-4 border rounded-xl flex justify-between items-start"
                  >
                    <div>
                      <h4 className="font-semibold">
                        {r.title || r.description.slice(0, 60)}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Qty: {r.quantity} • Deadline:{" "}
                        {new Date(r.deadline).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">{r.specs}</p>
                    </div>
                    <div className="text-right">
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          r.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {r.status}
                      </div>
                      <div className="mt-3 space-y-2">
                        <button
                          onClick={() => openBids(r)}
                          className="text-sm underline"
                        >
                          View Bids
                        </button>
                        <button
                          onClick={() => deleteRFQ(r._id)}
                          className="text-sm text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-3xl shadow-2xl p-6">
              <h4 className="font-semibold">Selected RFQ Bids</h4>
              {!selected && (
                <p className="text-gray-600 mt-2">Open an RFQ to view bids</p>
              )}
              {selected && (
                <>
                  <div className="mt-3">
                    <h5 className="font-semibold">
                      {selected.title || selected.description.slice(0, 40)}
                    </h5>
                    <p className="text-sm text-gray-600">
                      Qty: {selected.quantity}
                    </p>
                  </div>

                  <div className="mt-4 space-y-3">
                    {bids.length === 0 && (
                      <p className="text-gray-600">No bids yet</p>
                    )}
                    {bids.map((b) => (
                      <div key={b._id} className="p-3 border rounded-lg">
                        <div className="flex justify-between">
                          <div>
                            <div className="font-semibold">
                              {b.artisanId?.name || "Unnamed"}
                            </div>
                            <p className="text-sm text-gray-600">{b.message}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">₹ {b.bidAmount}</div>
                            <div className="text-sm mt-1">
                              {b.etaDays ? `${b.etaDays} days` : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
