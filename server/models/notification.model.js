import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["BID_RECEIVED", "BID_ACCEPTED", "BID_REJECTED", "NEW_MESSAGE", "ORDER_UPDATE"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    link: {
      type: String, // URL or route to redirect to
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
