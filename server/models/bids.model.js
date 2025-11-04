import mongoose from "mongoose";

const BidSchema = new mongoose.Schema(
  {
    rfqId: { type: mongoose.Schema.Types.ObjectId, ref: "RFQ", required: true },
    artisanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // provider in your User.role
    bidAmount: { type: Number, required: true, min: 0 },
    message: { type: String, trim: true },
    etaDays: { type: Number },
    isAccepted: { type: Boolean, default: false },
    attachments: [{ type: String }],
  },
  { timestamps: true }
);

export const BID = mongoose.model("Bid", BidSchema);
