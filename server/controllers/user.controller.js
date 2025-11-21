//Get User Profile
export const getUserProfile = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get All Users (for chat)
export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    // Fetch all users except current user, select only necessary fields
    const users = await import("../models/user.model.js").then((m) =>
      m.User.find({ _id: { $ne: currentUserId } }).select("fullname email role")
    );
    res.status(200).json({ success: true, users });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
