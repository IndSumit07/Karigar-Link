// pages/RFQCreatePage.jsx
import React, { useState } from "react";
import { useRFQ } from "../contexts/RFQContext";
import { Link, useNavigate } from "react-router-dom";

const themeYellow = "#f5be67";

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
    <div
      className="min-h-screen py-12"
      style={{ backgroundColor: themeYellow }}
    >
      <div className="w-full max-w-3xl mx-auto px-4">
        <div className="text-center mb-6">
          <Link to="/" className="text-5xl font-bold text-white">
            KarigarLink
          </Link>
          <p className="text-white mt-2">Post a new RFQ</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title (optional)
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border"
                placeholder="Short title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border"
                placeholder="Describe product"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border"
                >
                  <option value="">Choose category</option>
                  <option value="pottery">Pottery</option>
                  <option value="textiles">Textiles</option>
                  <option value="metalwork">Metalwork</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  name="quantity"
                  type="number"
                  min={1}
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Specifications / Requirements
              </label>
              <textarea
                name="specs"
                value={form.specs}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border"
                placeholder="Material, finish, tolerances..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Delivery Deadline
              </label>
              <input
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl text-white font-semibold"
              style={{ backgroundColor: themeYellow }}
            >
              Post RFQ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
