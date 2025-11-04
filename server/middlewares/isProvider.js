// middleware/isProvider.js
export default function isProvider(req, res, next) {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  if (req.user.role !== "provider") {
    return res.status(403).json({ message: "Requires provider role" });
  }
  next();
}
