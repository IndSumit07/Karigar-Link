// pages/ViewBidsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useRFQ } from "../contexts/RFQContext";

const themeYellow = "#f5be67";

export default function ViewBidsPage() {
  const { id } = useParams();
  const { fetchRFQById, fetchRFQBids, bids } = useRFQ();
  const [rfq, setRfq] = useState(null);

  useEffect(() => {
    (async () => {
      const d = await fetchRFQById(id);
      setRfq(d);
      await fetchRFQBids(id);
    })();
  }, [id]);

  if (!rfq) return null;

  return (
    <div
      className="min-h-screen py-12"
      style={{ backgroundColor: themeYellow }}
    >
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="text-center mb-6">
          <Link to="/" className="text-5xl font-bold text-white">
            KarigarLink
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6">
          <h3 className="text-xl font-semibold">
            {rfq.title || rfq.description.slice(0, 60)}
          </h3>
          <p className="text-sm text-gray-600">
            Qty: {rfq.quantity} • Deadline:{" "}
            {new Date(rfq.deadline).toLocaleDateString()}
          </p>

          <div className="mt-6">
            <h4 className="font-semibold">Bids</h4>
            <div className="mt-3 space-y-3">
              {bids.length === 0 && (
                <p className="text-gray-600">No bids yet</p>
              )}
              {bids.map((b) => (
                <div
                  key={b._id}
                  className="p-3 border rounded-lg flex justify-between"
                >
                  <div>
                    <div className="font-semibold">{b.artisanId?.name}</div>
                    <p className="text-sm text-gray-600">{b.message}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">₹ {b.bidAmount}</div>
                    <div className="text-sm">
                      {b.etaDays ? `${b.etaDays} days` : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
