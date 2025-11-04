// middleware/isCustomer.js
export default function isCustomer(req, res, next) {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  if (req.user.role !== "customer") {
    return res.status(403).json({ message: "Requires customer role" });
  }
  next();
}
