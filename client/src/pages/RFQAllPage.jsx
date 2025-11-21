import React, { useEffect, useState } from "react";
import { useRFQ } from "../contexts/RFQContext";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import {
  Search,
  Filter,
  Package,
  Calendar,
  Eye,
  ChevronLeft,
  ChevronRight,
  FileText,
  TrendingUp,
} from "lucide-react";

export default function RFQAllPage() {
  const { fetchAllRFQs, rfqs, meta, loading } = useRFQ();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAllRFQs({ q, category, page, limit: 12 });
  }, [q, category, page]);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Browse RFQs
        </h1>
        <p className="text-gray-600">
          Explore available opportunities and place your bids
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title or description..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none bg-white"
            >
              <option value="">All categories</option>
              <option value="pottery">Pottery</option>
              <option value="textiles">Textiles</option>
              <option value="metalwork">Metalwork</option>
              <option value="woodwork">Woodwork</option>
              <option value="jewelry">Jewelry</option>
            </select>
          </div>
        </div>
      </div>

      {/* RFQ Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <>
          {rfqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No RFQs found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rfqs.map((r) => (
                <div
                  key={r._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                        {r.title || r.description.slice(0, 60)}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {r.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Package className="w-4 h-4 mr-2 text-orange-500" />
                      <span>Quantity: {r.quantity}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                      <span>
                        Deadline: {new Date(r.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    {r.category && (
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 capitalize">
                        {r.category}
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/rfq/${r._id}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors group-hover:shadow-md"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {rfqs.length > 0 && (
            <div className="mt-8 flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{meta.total || 0}</span> total
                RFQs
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <div className="px-4 py-2 rounded-lg bg-orange-50 text-orange-600 font-medium">
                  Page {page}
                </div>
                <button
                  disabled={meta.total && page >= meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
}
