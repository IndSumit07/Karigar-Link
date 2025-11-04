// controllers/bidController.js
import { BID } from "../models/bids.model.js";
import RFQ from "../models/RFQ.js";

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

    const rfq = await RFQ.findById(rfqId);
    if (!rfq) return res.status(404).json({ message: "RFQ not found" });
    if (rfq.status !== "active")
      return res.status(400).json({ message: "Cannot bid on closed RFQ" });

    const existing = await BID.findOne({ rfqId, artisanId });
    if (existing) {
      existing.bidAmount = bidAmount;
      existing.message = message ?? existing.message;
      if (etaDays !== undefined) existing.etaDays = etaDays;
      if (attachments) existing.attachments = attachments;
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
    const bids = await BID.find({ artisanId }).populate("rfqId");
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

    if (!bid.artisanId.equals(req.user._1d)) {
      // small guard; should be provider update only
      if (!bid.artisanId.equals(req.user._id))
        return res.status(403).json({ message: "Not authorized" });
    }

    const { bidAmount, message, etaDays, isAccepted } = req.body;
    if (bidAmount !== undefined) bid.bidAmount = bidAmount;
    if (message !== undefined) bid.message = message;
    if (etaDays !== undefined) bid.etaDays = etaDays;
    if (isAccepted !== undefined) bid.isAccepted = isAccepted;

    await bid.save();
    return res.json(bid);
  } catch (err) {
    console.error("updateBid:", err);
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
