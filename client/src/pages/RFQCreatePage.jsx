import React, { useState } from "react";
import { useRFQ } from "../contexts/RFQContext";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import {
  FileText,
  Package,
  Calendar,
  Tag,
  AlignLeft,
  Send,
  ArrowLeft,
} from "lucide-react";

export default function RFQCreatePage() {
  const { createRFQ } = useRFQ();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    quantity: 1,
    specs: "",
    deadline: "",
  });

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRFQ(form);
      navigate("/my-rfqs");
    } catch {}
  };

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New RFQ
        </h1>
        <p className="text-gray-600">
          Post a request for quotation and receive bids from providers
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-orange-500" />
                Title (Optional)
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="e.g., Custom Pottery Set for Restaurant"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <AlignLeft className="w-4 h-4 text-orange-500" />
                Product Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Describe the product you need in detail..."
              />
            </div>

            {/* Category and Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Tag className="w-4 h-4 text-orange-500" />
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="">Choose category</option>
                  <option value="pottery">Pottery</option>
                  <option value="textiles">Textiles</option>
                  <option value="metalwork">Metalwork</option>
                  <option value="woodwork">Woodwork</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Package className="w-4 h-4 text-orange-500" />
                  Quantity
                </label>
                <input
                  name="quantity"
                  type="number"
                  min={1}
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Specifications */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-orange-500" />
                Specifications / Requirements
              </label>
              <textarea
                name="specs"
                value={form.specs}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Material, finish, dimensions, tolerances, quality standards..."
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                Delivery Deadline
              </label>
              <input
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-sm hover:shadow-md"
              >
                <Send className="w-5 h-5" />
                Post RFQ
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Tips for a good RFQ:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Be specific about your requirements</li>
            <li>• Include material preferences and quality standards</li>
            <li>• Mention any certifications or compliance needed</li>
            <li>• Set a realistic deadline</li>
            <li>• Provide clear specifications to get accurate bids</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
