import express from "express";
import {
  createRFQ,
  getMyRFQs,
  getAllRFQs,
  getRFQById,
  updateRFQ,
  deleteRFQ,
  getRFQBids,
} from "../controllers/rfq.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import isCustomer from "../middlewares/isCustomer.js";

const rfqRouter = express.Router();

rfqRouter.post("/create", authMiddleware, isCustomer, createRFQ);
rfqRouter.get("/my-rfqs", authMiddleware, isCustomer, getMyRFQs);
rfqRouter.get("/all", authMiddleware, getAllRFQs); // can be public if you want; kept requireAuth so buyers/providers can see
rfqRouter.get("/:rfqId", authMiddleware, getRFQById);
rfqRouter.put("/:rfqId", authMiddleware, isCustomer, updateRFQ);
rfqRouter.delete("/:rfqId", authMiddleware, isCustomer, deleteRFQ);
rfqRouter.get("/:rfqId/bids", authMiddleware, getRFQBids);

export default rfqRouter;
