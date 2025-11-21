// controllers/rfqController.js

import { BID } from "../models/bids.model.js";
import { RFQ } from "../models/rfq.model.js";

/**
 * Create RFQ (customer only)
 * POST /api/rfq/create
 */
export const createRFQ = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const {
      title,
      description,
      category,
      quantity,
      specs,
      deadline,
      allowNegotiation,
      locationPreference,
      attachments,
    } = req.body;

    if (!description || !quantity || !deadline) {
      return res
        .status(400)
        .json({ message: "description, quantity and deadline are required" });
    }

    const rfq = await RFQ.create({
      buyerId,
      title,
      description,
      category,
      quantity,
      specs,
      deadline,
      allowNegotiation: allowNegotiation ?? true,
      locationPreference,
      attachments,
    });

    return res.status(201).json(rfq);
  } catch (err) {
    console.error("createRFQ:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get RFQs posted by logged-in buyer
 * GET /api/rfq/my-rfqs
 */
export const getMyRFQs = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const rfqs = await RFQ.find({ buyerId }).sort({ createdAt: -1 });
    return res.json(rfqs);
  } catch (err) {
    console.error("getMyRFQs:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get ALL RFQs - for listing/browsing page
 * GET /api/rfq/all
 * Supports filters: q, category, status, minQty, maxQty, deadlineBefore, deadlineAfter
 * Pagination: page, limit
 * Sort: newest, oldest, qty_asc, qty_desc
 */
export const getAllRFQs = async (req, res) => {
  try {
    const {
      q,
      category,
      status,
      minQty,
      maxQty,
      deadlineBefore,
      deadlineAfter,
      page = 1,
      limit = 20,
      sort = "newest",
    } = req.query;

    const filter = {};

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (minQty)
      filter.quantity = { ...(filter.quantity || {}), $gte: Number(minQty) };
    if (maxQty)
      filter.quantity = { ...(filter.quantity || {}), $lte: Number(maxQty) };
    if (deadlineBefore)
      filter.deadline = {
        ...(filter.deadline || {}),
        $lte: new Date(deadlineBefore),
      };
    if (deadlineAfter)
      filter.deadline = {
        ...(filter.deadline || {}),
        $gte: new Date(deadlineAfter),
      };

    // Pagination
    const pageNum = Math.max(1, parseInt(page));
    const lim = Math.max(1, Math.min(100, parseInt(limit)));

    // Sorting
    let sortObj = { createdAt: -1 };
    if (sort === "oldest") sortObj = { createdAt: 1 };
    if (sort === "qty_asc") sortObj = { quantity: 1 };
    if (sort === "qty_desc") sortObj = { quantity: -1 };

    const total = await RFQ.countDocuments(filter);
    const rfqs = await RFQ.find(filter)
      .sort(sortObj)
      .skip((pageNum - 1) * lim)
      .limit(lim)
      .populate("buyerId", "name role") // populate buyer basic info (doesn't alter User schema)
      .lean();

    return res.json({
      meta: {
        total,
        page: pageNum,
        limit: lim,
        totalPages: Math.ceil(total / lim),
      },
      data: rfqs,
    });
  } catch (err) {
    console.error("getAllRFQs:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get single RFQ by id
 * GET /api/rfq/:rfqId
 */
export const getRFQById = async (req, res) => {
  try {
    const { rfqId } = req.params;
    const rfq = await RFQ.findById(rfqId).populate("buyerId", "name role");
    if (!rfq) return res.status(404).json({ message: "RFQ not found" });
    return res.json(rfq);
  } catch (err) {
    console.error("getRFQById:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update RFQ (only owner/customer, only if active)
 * PUT /api/rfq/:rfqId
 */
export const updateRFQ = async (req, res) => {
  try {
    const { rfqId } = req.params;
    const rfq = await RFQ.findById(rfqId);
    if (!rfq) return res.status(404).json({ message: "RFQ not found" });

    if (!rfq.buyerId.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this RFQ" });
    }

    if (rfq.status !== "active") {
      return res
        .status(400)
        .json({ message: "Only active RFQs can be updated" });
    }

    const updatable = [
      "title",
      "description",
      "category",
      "quantity",
      "specs",
      "deadline",
      "status",
      "allowNegotiation",
      "locationPreference",
      "attachments",
    ];
    updatable.forEach((k) => {
      if (req.body[k] !== undefined) rfq[k] = req.body[k];
    });

    await rfq.save();
    return res.json(rfq);
  } catch (err) {
    console.error("updateRFQ:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete RFQ (owner/customer only) — also remove bids
 * DELETE /api/rfq/:rfqId
 */
export const deleteRFQ = async (req, res) => {
  try {
    const { rfqId } = req.params;
    const rfq = await RFQ.findById(rfqId);
    if (!rfq) return res.status(404).json({ message: "RFQ not found" });

    if (!rfq.buyerId.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this RFQ" });
    }

    // remove associated bids
    await BID.deleteMany({ rfqId: rfq._id });
    await rfq.deleteOne();

    return res.json({ message: "RFQ deleted" });
  } catch (err) {
    console.error("deleteRFQ:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get bids for a RFQ (only rfq owner/customer or admin)
 * GET /api/rfq/:rfqId/bids
 */
export const getRFQBids = async (req, res) => {
  try {
    const { rfqId } = req.params;
    const rfq = await RFQ.findById(rfqId);
    if (!rfq) return res.status(404).json({ message: "RFQ not found" });

    // allow only buyer who created RFQ or admin
    if (!rfq.buyerId.equals(req.user._id) && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to view bids" });
    }

    const bids = await BID.find({ rfqId })
      .populate("artisanId", "fullname email role")
      .sort({ bidAmount: 1 }); // Sort by lowest bid first

    // Calculate bid statistics
    const stats = {
      totalBids: bids.length,
      pendingBids: bids.filter((b) => b.status === "pending").length,
      acceptedBids: bids.filter((b) => b.status === "accepted").length,
      rejectedBids: bids.filter((b) => b.status === "rejected").length,
    };

    if (bids.length > 0) {
      const amounts = bids.map((b) => b.bidAmount);
      stats.minBid = Math.min(...amounts);
      stats.maxBid = Math.max(...amounts);
      stats.avgBid = (
        amounts.reduce((a, b) => a + b, 0) / amounts.length
      ).toFixed(2);
    }

    return res.json({ bids, stats });
  } catch (err) {
    console.error("getRFQBids:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
