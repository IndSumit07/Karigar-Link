import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { LogOut } from "lucide-react";

const Dashboard = () => {
  const { user, logoutUser } = useAuth();
  console.log(user);

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-space">
      {/* Header */}
      <header className="w-full border-b border-white/20 px-8 py-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-orange-500 tracking-wide">
          Karigar<span className="text-white">Link</span> Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-12 px-6">
        {/* Welcome Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl text-center">
          <h2 className="text-4xl font-bold text-orange-500 mb-2">
            Welcome back, {user?.fullname.firstname} 👋
          </h2>
          <p className="text-gray-300">
            Glad to see you again. Here’s your personalized dashboard overview.
          </p>
        </div>

        {/* User Info Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:bg-white/20 transition-all duration-300">
            <h3 className="text-xl font-semibold text-orange-400 mb-4 border-b border-white/20 pb-2">
              Profile Information
            </h3>
            <ul className="space-y-3 text-gray-200">
              <li>
                <span className="font-semibold text-white">Full Name:</span>{" "}
                {user?.fullname.firstname + " " + user.fullname.lastname ||
                  "N/A"}
              </li>
              <li>
                <span className="font-semibold text-white">Email:</span>{" "}
                {user?.email || "N/A"}
              </li>
              <li>
                <span className="font-semibold text-white">Role:</span>{" "}
                {user?.role.capitalize || "User"}
              </li>
              <li>
                <span className="font-semibold text-white">User ID:</span>{" "}
                {user?._id || "N/A"}
              </li>
            </ul>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:bg-white/20 transition-all duration-300">
            <h3 className="text-xl font-semibold text-orange-400 mb-4 border-b border-white/20 pb-2">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="bg-orange-600 hover:bg-orange-700 py-3 rounded-xl font-semibold transition-all">
                Browse Services
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition-all">
                View Bookings
              </button>
              <button className="bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold transition-all">
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} KarigarLink — All Rights Reserved.
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
