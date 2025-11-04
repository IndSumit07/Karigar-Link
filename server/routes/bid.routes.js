import express from "express";
import {
  createBid,
  getMyBids,
  updateBid,
  deleteBid,
} from "../controllers/bid.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import isProvider from "../middlewares/isProvider.js";

const router = express.Router();

router.post("/", authMiddleware, isProvider, createBid);
router.get("/me", authMiddleware, isProvider, getMyBids);
router.put("/:bidId", authMiddleware, isProvider, updateBid);
router.delete("/:bidId", authMiddleware, deleteBid); // delete guard inside controller
export default router;
