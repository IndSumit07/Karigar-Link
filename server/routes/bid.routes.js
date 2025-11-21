import express from "express";
import {
  createBid,
  getMyBids,
  updateBid,
  updateBidStatus,
  deleteBid,
} from "../controllers/bid.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import isProvider from "../middlewares/isProvider.js";

const bidRouter = express.Router();

bidRouter.post("/", authMiddleware, isProvider, createBid);
bidRouter.get("/me", authMiddleware, isProvider, getMyBids);
bidRouter.put("/:bidId", authMiddleware, isProvider, updateBid);
bidRouter.put("/:bidId/status", authMiddleware, updateBidStatus); // RFQ owner can accept/reject
bidRouter.delete("/:bidId", authMiddleware, deleteBid); // delete guard inside controller
export default bidRouter;
