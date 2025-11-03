import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-orange-600">KarigarLink Dashboard</h1>
            <button className="text-gray-700 hover:text-orange-600">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to KarigarLink!
            </h2>
            <p className="text-gray-600 mb-8">
              Your dashboard is ready. Start exploring services or manage your profile.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Find Services</h3>
                <p className="text-gray-600 mb-4">Browse and book services from verified providers</p>
                <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
                  Browse Services
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">My Bookings</h3>
                <p className="text-gray-600 mb-4">View and manage your service bookings</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  View Bookings
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Profile</h3>
                <p className="text-gray-600 mb-4">Update your profile and preferences</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;