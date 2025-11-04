// models/RFQ.js
import mongoose from "mongoose";

const rfqSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // your existing User model
    title: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    quantity: { type: Number, required: true, min: 1 },
    specs: { type: String, trim: true },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ["active", "closed"], default: "active" },
    locationPreference: { type: String },
    allowNegotiation: { type: Boolean, default: true },
    attachments: [{ type: String }], // urls
  },
  { timestamps: true }
);

export const RFQ = mongoose.model("RFQ", rfqSchema);
