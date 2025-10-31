import { verifyAccessToken } from "../utils/jwt.js";
import { BlacklistToken } from "../models/blacklistToken.model.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ success: false, message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  const blacklisted = await BlacklistToken.findOne({ token });
  if (blacklisted)
    return res
      .status(401)
      .json({ success: false, message: "Token blacklisted" });

  const decoded = verifyAccessToken(token);
  if (!decoded)
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });

  req.user = decoded.id;
  next();
};
