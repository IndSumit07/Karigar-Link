// controllers/bidController.js
import { BID } from "../models/bids.model.js";
import { RFQ } from "../models/rfq.model.js";
import Notification from "../models/notification.model.js";

/**
 * Create or update a bid by provider
 * POST /api/bids
 * Body: { rfqId, bidAmount, message, etaDays, attachments }
 */
export const createBid = async (req, res) => {
  try {
    const artisanId = req.user._id; // provider
    const { rfqId, bidAmount, message, etaDays, attachments } = req.body;

    if (!rfqId || bidAmount === undefined) {
      return res
        .status(400)
        .json({ message: "rfqId and bidAmount are required" });
    }

    // Validate bid amount
    if (bidAmount <= 0) {
      return res
        .status(400)
        .json({ message: "Bid amount must be greater than 0" });
    }

    const rfq = await RFQ.findById(rfqId);
    if (!rfq) return res.status(404).json({ message: "RFQ not found" });
    
    if (rfq.status !== "active")
      return res.status(400).json({ message: "Cannot bid on closed RFQ" });

    // Prevent providers from bidding on their own RFQs
    if (rfq.buyerId.equals(artisanId)) {
      return res
        .status(400)
        .json({ message: "You cannot bid on your own RFQ" });
    }

    const existing = await BID.findOne({ rfqId, artisanId });
    if (existing) {
      existing.bidAmount = bidAmount;
      existing.message = message ?? existing.message;
      if (etaDays !== undefined) existing.etaDays = etaDays;
      if (attachments) existing.attachments = attachments;
      existing.status = "pending"; // Reset status when updating bid
      await existing.save();
      return res.json(existing);
    }

    const bid = await BID.create({
      rfqId,
      artisanId,
      bidAmount,
      message,
      etaDays,
      attachments,
    });

    // Create notification for RFQ owner
    const notification = new Notification({
      recipient: rfq.buyerId,
      sender: artisanId,
      type: "BID_RECEIVED",
      message: `New bid of ₹${bidAmount} received for your RFQ: ${rfq.title}`,
      link: `/rfq/${rfqId}`,
    });
    await notification.save();

    // Emit socket event
    const io = req.io;
    if (io) {
      io.to(rfq.buyerId.toString()).emit("receive_notification", notification);
    }

    return res.status(201).json(bid);
  } catch (err) {
    console.error("createBid:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Provider's bids
 * GET /api/bids/me
 */
export const getMyBids = async (req, res) => {
  try {
    const artisanId = req.user._id;
    const bids = await BID.find({ artisanId })
      .populate("rfqId")
      .sort({ createdAt: -1 });
    return res.json(bids);
  } catch (err) {
    console.error("getMyBids:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update bid (provider only)
 * PUT /api/bids/:bidId
 */
export const updateBid = async (req, res) => {
  try {
    const { bidId } = req.params;
    const bid = await BID.findById(bidId);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    // Only the provider who created the bid can update it
    if (!bid.artisanId.equals(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Don't allow updating accepted/rejected bids
    if (bid.status !== "pending") {
      return res
        .status(400)
        .json({ message: `Cannot update ${bid.status} bid` });
    }

    const { bidAmount, message, etaDays } = req.body;
    if (bidAmount !== undefined) {
      if (bidAmount <= 0) {
        return res
          .status(400)
          .json({ message: "Bid amount must be greater than 0" });
      }
      bid.bidAmount = bidAmount;
    }
    if (message !== undefined) bid.message = message;
    if (etaDays !== undefined) bid.etaDays = etaDays;

    await bid.save();
    return res.json(bid);
  } catch (err) {
    console.error("updateBid:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Accept or reject a bid (RFQ owner only)
 * PUT /api/bids/:bidId/status
 * Body: { status: "accepted" | "rejected", rejectionReason?: string }
 */
export const updateBidStatus = async (req, res) => {
  try {
    const { bidId } = req.params;
    const { status, rejectionReason } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Status must be 'accepted' or 'rejected'" });
    }

    const bid = await BID.findById(bidId).populate("rfqId");
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    const rfq = bid.rfqId;
    if (!rfq) return res.status(404).json({ message: "RFQ not found" });

    // Only RFQ owner can accept/reject bids
    if (!rfq.buyerId.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "Only RFQ owner can accept/reject bids" });
    }

    bid.status = status;
    bid.isAccepted = status === "accepted"; // backward compatibility
    if (status === "rejected" && rejectionReason) {
      bid.rejectionReason = rejectionReason;
    }

    await bid.save();

    // If accepted, optionally close the RFQ
    if (status === "accepted") {
      rfq.status = "closed";
      await rfq.save();
    }

    // Create notification for Bid provider
    const notification = new Notification({
      recipient: bid.artisanId,
      sender: req.user._id,
      type: status === "accepted" ? "BID_ACCEPTED" : "BID_REJECTED",
      message: `Your bid for RFQ: ${rfq.title} has been ${status}`,
      link: `/my-rfqs`,
    });
    await notification.save();

    // Emit socket event
    const io = req.io;
    if (io) {
      io.to(bid.artisanId.toString()).emit("receive_notification", notification);
    }

    return res.json(bid);
  } catch (err) {
    console.error("updateBidStatus:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete bid (provider or RFQ owner or admin)
 * DELETE /api/bids/:bidId
 */
export const deleteBid = async (req, res) => {
  try {
    const { bidId } = req.params;
    const bid = await BID.findById(bidId);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    const rfq = await RFQ.findById(bid.rfqId);

    // allow provider who posted, the RFQ owner, or admin
    if (
      !bid.artisanId.equals(req.user._id) &&
      !(rfq && rfq.buyerId.equals(req.user._id)) &&
      !req.user.isAdmin
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this bid" });
    }

    await bid.deleteOne();
    return res.json({ message: "Bid deleted" });
  } catch (err) {
    console.error("deleteBid:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
