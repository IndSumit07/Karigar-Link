import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";
import { useSocket } from "../contexts/SocketContext";
import { useAuth } from "../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const ChatPage = () => {
  const { userId } = useParams();
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const socket = useSocket();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.success) {
          setAllUsers(response.data.users);
          setFilteredUsers(response.data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [token]);

  // Filter users
  useEffect(() => {
    if (searchTerm) {
      const filtered = allUsers.filter(
        (u) =>
          u.fullname?.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.fullname?.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(allUsers);
    }
  }, [searchTerm, allUsers]);

  // Handle online users
  useEffect(() => {
    if (socket) {
      socket.on("get_online_users", (users) => {
        setOnlineUsers(users);
      });
      return () => {
        socket.off("get_online_users");
      };
    }
  }, [socket]);

  // Fetch messages when a user is selected
  useEffect(() => {
    if (userId) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/chat/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setMessages(response.data);
          
          // Find selected user details
          const foundUser = allUsers.find(u => u._id === userId);
          if (foundUser) setSelectedUser(foundUser);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      if (allUsers.length > 0) {
        fetchMessages();
      }
    }
  }, [userId, token, allUsers]);

  // Listen for incoming messages
  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (message) => {
        if (
          (selectedUser && message.sender._id === selectedUser._id) ||
          message.sender._id === user._id
        ) {
          setMessages((prev) => [...prev, message]);
        }
      });

      return () => {
        socket.off("receive_message");
      };
    }
  }, [socket, selectedUser, user]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !userId) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat/send`,
        {
          recipientId: userId,
          content: newMessage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages((prev) => [...prev, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const isUserOnline = (uid) => onlineUsers.includes(uid);

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-120px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Sidebar - Users List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Chats</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredUsers.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No users found</div>
            ) : (
              filteredUsers.map((u) => (
                <div
                  key={u._id}
                  onClick={() => {
                    setSelectedUser(u);
                    navigate(`/chat/${u._id}`);
                  }}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    userId === u._id ? "bg-orange-50" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                        {u.fullname?.firstname?.charAt(0)}
                      </div>
                      {isUserOnline(u._id) && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {u.fullname?.firstname} {u.fullname?.lastname}
                      </h3>
                      <p className="text-xs text-gray-500 truncate capitalize">{u.role}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {userId ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-semibold">
                    {selectedUser?.fullname?.firstname?.charAt(0) || "?"}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {selectedUser ? `${selectedUser.fullname?.firstname} ${selectedUser.fullname?.lastname || ''}` : "Chat"}
                    </h3>
                    {isUserOnline(userId) ? (
                      <p className="text-xs text-green-600 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                        Online
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500">Offline</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg, index) => {
                  const isMe = msg.sender._id === user._id || msg.sender === user._id;
                  return (
                    <div
                      key={index}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${
                          isMe
                            ? "bg-orange-500 text-white rounded-br-none"
                            : "bg-white text-gray-900 rounded-bl-none"
                        }`}
                      >
                        <p>{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            isMe ? "text-orange-100" : "text-gray-400"
                          }`}
                        >
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Send
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-medium text-gray-900">
                  Select a user to chat
                </h3>
                <p className="text-gray-500 mt-2">
                  Choose a user from the sidebar to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatPage;
