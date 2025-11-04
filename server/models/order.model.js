// models/Order.js
import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quantity: { type: Number, required: true, min: 1 },
  isSample: { type: Boolean, default: false },
});

const OrderSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [CartItemSchema],
    totalAmount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    meta: { type: Object },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
