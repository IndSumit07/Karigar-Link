// pages/RFQAllPage.jsx
import React, { useEffect, useState } from "react";
import { useRFQ } from "../contexts/RFQContext";
import { Link } from "react-router-dom";

const themeYellow = "#f5be67";

export default function RFQAllPage() {
  const { fetchAllRFQs, rfqs, meta, loading } = useRFQ();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAllRFQs({ q, category, page, limit: 12 });
  }, [q, category, page]);

  return (
    <div
      className="min-h-screen py-12"
      style={{ backgroundColor: themeYellow }}
    >
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <Link to="/" className="text-5xl font-bold text-white">
            KarigarLink
          </Link>
          <p className="text-white mt-2">Browse RFQs</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6">
          <div className="flex gap-4 mb-6">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search description or title"
              className="flex-1 px-4 py-3 rounded-xl border"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border"
            >
              <option value="">All categories</option>
              <option value="pottery">Pottery</option>
              <option value="textiles">Textiles</option>
              <option value="metalwork">Metalwork</option>
            </select>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4">
                {rfqs.length === 0 && (
                  <p className="text-gray-600">No RFQs found</p>
                )}
                {rfqs.map((r) => (
                  <div key={r._id} className="p-4 border rounded-xl">
                    <h3 className="font-semibold text-lg">
                      {r.title || r.description.slice(0, 60)}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {r.description.slice(0, 100)}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-sm text-gray-500">
                        Qty: {r.quantity}
                      </div>
                      <Link
                        to={`/rfq/${r._id}`}
                        className="text-sm font-semibold"
                        style={{ color: themeYellow }}
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Total: {meta.total || 0}
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1 rounded-md bg-gray-100"
                  >
                    Prev
                  </button>
                  <div className="px-3 py-1 rounded-md bg-white border">
                    {page}
                  </div>
                  <button
                    disabled={meta.total && page >= meta.totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1 rounded-md bg-gray-100"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
