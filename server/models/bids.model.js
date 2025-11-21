import mongoose from "mongoose";

const BidSchema = new mongoose.Schema(
  {
    rfqId: { type: mongoose.Schema.Types.ObjectId, ref: "RFQ", required: true },
    artisanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // provider in your User.role
    bidAmount: { 
      type: Number, 
      required: true, 
      min: [1, "Bid amount must be greater than 0"] 
    },
    message: { type: String, trim: true, maxLength: 500 },
    etaDays: { type: Number, min: 1 },
    status: { 
      type: String, 
      enum: ["pending", "accepted", "rejected"], 
      default: "pending" 
    },
    // Deprecated: keeping for backward compatibility
    isAccepted: { type: Boolean, default: false },
    attachments: [{ type: String }],
    rejectionReason: { type: String, trim: true },
  },
  { timestamps: true }
);

export const BID = mongoose.model("Bid", BidSchema);
