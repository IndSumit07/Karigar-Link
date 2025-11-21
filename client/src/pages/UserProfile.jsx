import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import DashboardLayout from "../components/DashboardLayout";
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  Edit,
  Save,
  X,
  Award,
  Shield,
  Calendar,
} from "lucide-react";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: user?.fullname?.firstname || "",
    lastname: user?.fullname?.lastname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    bio: user?.bio || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      // TODO: Implement API call to update profile
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setFormData({
      firstname: user?.fullname?.firstname || "",
      lastname: user?.fullname?.lastname || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
      bio: user?.bio || "",
    });
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-orange-500 to-yellow-500"></div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="flex items-end gap-6 -mt-16 mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white p-2 shadow-lg">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-white text-4xl font-bold">
                    {user?.fullname?.firstname?.charAt(0)}
                    {user?.fullname?.lastname?.charAt(0)}
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 pb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user?.fullname?.firstname} {user?.fullname?.lastname}
                </h2>
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold capitalize flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {user?.role}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-500" />
                  Personal Information
                </h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.fullname?.firstname}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.fullname?.lastname}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <p className="text-gray-900 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {user?.email}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.phone || "Not set"}</p>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  Additional Information
                </h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter your location"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.location || "Not set"}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself"
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.bio || "No bio added yet"}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Member Since
                  </label>
                  <p className="text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-500" />
            Account Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {user?.role === "provider" ? "Provider" : "Customer"}
              </div>
              <div className="text-sm text-blue-700">Account Type</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">Active</div>
              <div className="text-sm text-green-700">Account Status</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">
                {user?.createdAt
                  ? Math.floor(
                      (new Date() - new Date(user.createdAt)) /
                        (1000 * 60 * 60 * 24)
                    )
                  : 0}
              </div>
              <div className="text-sm text-orange-700">Days Active</div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-orange-500" />
            Security Settings
          </h3>
          <div className="space-y-3">
            <button className="w-full md:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Change Password
            </button>
            <button className="w-full md:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors ml-0 md:ml-3">
              Enable Two-Factor Authentication
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
