import Message from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params; // The other user
    const currentUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, recipient: userId },
        { sender: userId, recipient: currentUserId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "fullname")
      .populate("recipient", "fullname");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Notification from "../models/notification.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    const senderId = req.user._id;

    const newMessage = new Message({
      sender: senderId,
      recipient: recipientId,
      content,
    });

    await newMessage.save();

    // Create notification for recipient
    const notification = new Notification({
      recipient: recipientId,
      sender: senderId,
      type: "NEW_MESSAGE",
      message: `New message from ${req.user.fullname.firstname}`,
      link: `/chat/${senderId}`,
    });
    await notification.save();

    // Emit socket event
    const io = req.io;
    if (io) {
      io.to(recipientId).emit("receive_message", {
        _id: newMessage._id,
        sender: { _id: senderId, fullname: req.user.fullname },
        recipient: { _id: recipientId },
        content,
        createdAt: newMessage.createdAt,
      });
      
      // Emit notification event
      io.to(recipientId).emit("receive_notification", notification);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConversations = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        // Find all messages where current user is sender or recipient
        const messages = await Message.find({
            $or: [{ sender: currentUserId }, { recipient: currentUserId }]
        }).sort({ createdAt: -1 });

        const userIds = new Set();
        messages.forEach(msg => {
            if (msg.sender.toString() !== currentUserId) userIds.add(msg.sender.toString());
            if (msg.recipient.toString() !== currentUserId) userIds.add(msg.recipient.toString());
        });

        const users = await User.find({ _id: { $in: Array.from(userIds) } }).select('fullname email role');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
