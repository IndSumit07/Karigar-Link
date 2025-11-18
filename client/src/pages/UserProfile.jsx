import React, { useState, useEffect } from "react";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const user = {
    name: "Rajesh Kumar",
    location: "Mumbai, Maharashtra",
    role: "Business Owner",
    profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    badges: ["Verified Buyer", "Premium Member"],
    upiId: "rajesh@paytm",
    bio: "Retail business owner specializing in traditional handicrafts and textiles. Supporting local artisans through direct sourcing.",
    languages: ["Hindi", "English", "Marathi"],
    trustScore: 850,
    recentOrders: [
      { id: 1, item: "Handwoven Sarees", artisan: "Meera Devi", amount: "₹12,500", status: "Delivered", date: "2024-01-15" },
      { id: 2, item: "Pottery Set", artisan: "Ram Singh", amount: "₹3,200", status: "In Transit", date: "2024-01-20" },
      { id: 3, item: "Wooden Crafts", artisan: "Sita Sharma", amount: "₹8,900", status: "Processing", date: "2024-01-22" }
    ],
    metrics: {
      totalOrders: 45,
      totalSpent: "₹2,85,000",
      activeRFQs: 3,
      savedArtisans: 12
    },
    preferences: {
      categories: ["Textiles", "Pottery", "Jewelry", "Home Decor"],
      priceRange: "₹500 - ₹50,000",
      deliveryTime: "7-14 days"
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'help', label: 'Help', icon: '❓' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-yellow-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={user.profilePic} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{user.name}</h1>
              <p className="text-gray-600 mb-2 flex items-center justify-center md:justify-start gap-1">
                <span>📍</span> {user.location}
              </p>
              <p className="text-lg font-medium mb-3" style={{ color: '#f5be67' }}>{user.role}</p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {user.badges.map((badge, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 rounded-full text-sm font-medium text-white shadow-sm"
                    style={{ backgroundColor: '#f5be67' }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                className="px-6 py-2 rounded-lg font-medium text-white shadow-sm hover:shadow-md transition-all duration-200"
                style={{ backgroundColor: '#f5be67' }}
              >
                Edit Profile
              </button>
              <button className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200">
                Share Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-current text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                style={activeTab === tab.id ? { borderColor: '#f5be67', color: '#f5be67' } : {}}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Stats */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Stats</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#f5be67', color: 'white' }}>
                    <div className="text-2xl font-bold">{user.metrics.totalOrders}</div>
                    <div className="text-sm opacity-90">Total Orders</div>
                  </div>
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">{user.metrics.totalSpent}</div>
                    <div className="text-sm text-green-600">Total Spent</div>
                  </div>
                  <div className="text-center p-4 bg-blue-100 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">{user.metrics.activeRFQs}</div>
                    <div className="text-sm text-blue-600">Active RFQs</div>
                  </div>
                  <div className="text-center p-4 bg-purple-100 rounded-lg">
                    <div className="text-2xl font-bold text-purple-700">{user.metrics.savedArtisans}</div>
                    <div className="text-sm text-purple-600">Saved Artisans</div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Orders</h2>
                <div className="space-y-4">
                  {user.recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{order.item}</h3>
                        <p className="text-sm text-gray-600">by {order.artisan}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold" style={{ color: '#f5be67' }}>{order.amount}</div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Profile Info */}
            <div className="space-y-6">
              {/* Trust Score */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Trust Score</h2>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">{user.trustScore}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(user.trustScore / 1000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    ✅ Trusted Buyer
                  </span>
                </div>
              </div>

              {/* About */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 mb-4">{user.bio}</p>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.languages.map((lang, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Preferred Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.preferences.categories.map((cat, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 text-white rounded text-sm"
                          style={{ backgroundColor: '#f5be67' }}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Info</h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <span className="text-green-700 font-medium flex items-center gap-2">
                    <span>💳</span> UPI: {user.upiId}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
            <div className="space-y-4">
              {user.recentOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{order.item}</h3>
                      <p className="text-gray-600">Artisan: {order.artisan}</p>
                      <p className="text-sm text-gray-500">Order Date: {order.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold" style={{ color: '#f5be67' }}>{order.amount}</div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Reorder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" value={user.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input type="text" value={user.location} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                    <input type="text" value={user.preferences.priceRange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Delivery Time</label>
                    <input type="text" value={user.preferences.deliveryTime} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  className="px-6 py-2 rounded-lg font-medium text-white shadow-sm hover:shadow-md transition-all duration-200"
                  style={{ backgroundColor: '#f5be67' }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'help' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Help & Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">How do I place an order?</h4>
                    <p className="text-sm text-gray-600">You can browse artisans and their products, then contact them directly or create an RFQ.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">How is my trust score calculated?</h4>
                    <p className="text-sm text-gray-600">Your trust score is based on successful transactions, reviews, and account verification.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Support</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📧</span>
                      <div>
                        <div className="font-medium text-gray-900">Email Support</div>
                        <div className="text-sm text-gray-600">support@karigarlink.com</div>
                      </div>
                    </div>
                  </button>
                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">💬</span>
                      <div>
                        <div className="font-medium text-gray-900">Live Chat</div>
                        <div className="text-sm text-gray-600">Available 24/7</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;