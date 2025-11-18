import React, { useState, useEffect } from 'react';

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock notifications data
    const mockNotifications = [
      {
        id: 1,
        type: 'order',
        title: 'Order Delivered',
        message: 'Your order "Handwoven Sarees" has been delivered successfully.',
        time: '2 hours ago',
        read: false,
        icon: '📦',
        color: 'green'
      },
      {
        id: 2,
        type: 'quote',
        title: 'New Quote Received',
        message: 'Meera Devi sent you a quote for your pottery set request.',
        time: '4 hours ago',
        read: false,
        icon: '💰',
        color: 'blue'
      },
      {
        id: 3,
        type: 'message',
        title: 'Message from Artisan',
        message: 'Ram Singh: "Your wooden crafts order will be ready by tomorrow."',
        time: '6 hours ago',
        read: true,
        icon: '💬',
        color: 'purple'
      },
      {
        id: 4,
        type: 'system',
        title: 'Profile Verification Complete',
        message: 'Your profile has been successfully verified. You can now access premium features.',
        time: '1 day ago',
        read: true,
        icon: '✅',
        color: 'green'
      },
      {
        id: 5,
        type: 'order',
        title: 'Order Status Update',
        message: 'Your order "Pottery Set" is now in transit and will arrive in 2-3 days.',
        time: '1 day ago',
        read: false,
        icon: '🚚',
        color: 'orange'
      },
      {
        id: 6,
        type: 'promotion',
        title: 'Special Offer',
        message: 'Get 20% off on your next order from verified artisans. Limited time offer!',
        time: '2 days ago',
        read: true,
        icon: '🎉',
        color: 'red'
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'order', label: 'Orders', count: notifications.filter(n => n.type === 'order').length },
    { id: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.read;
    return notification.type === activeFilter;
  });

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getColorClasses = (color, read) => {
    const baseClasses = {
      green: read ? 'bg-green-50 border-green-200' : 'bg-green-100 border-green-300',
      blue: read ? 'bg-blue-50 border-blue-200' : 'bg-blue-100 border-blue-300',
      purple: read ? 'bg-purple-50 border-purple-200' : 'bg-purple-100 border-purple-300',
      orange: read ? 'bg-orange-50 border-orange-200' : 'bg-orange-100 border-orange-300',
      red: read ? 'bg-red-50 border-red-200' : 'bg-red-100 border-red-300'
    };
    return baseClasses[color] || 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-1">Stay updated with your orders and messages</p>
            </div>
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              style={{ backgroundColor: '#f5be67' }}
            >
              Mark All Read
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeFilter === filter.id
                    ? 'border-current text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                style={activeFilter === filter.id ? { borderColor: '#f5be67', color: '#f5be67' } : {}}
              >
                {filter.label}
                {filter.count > 0 && (
                  <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700">
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`border rounded-xl p-6 transition-all duration-200 hover:shadow-md ${
                  getColorClasses(notification.color, notification.read)
                } ${!notification.read ? 'ring-2 ring-opacity-20' : ''}`}
                style={!notification.read ? { ringColor: '#f5be67' } : {}}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl shadow-sm">
                        {notification.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`text-lg font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f5be67' }}></div>
                        )}
                      </div>
                      <p className={`text-sm ${!notification.read ? 'text-gray-700' : 'text-gray-600'} mb-2`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        title="Mark as read"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      title="Delete notification"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Action Buttons for specific notification types */}
                {notification.type === 'quote' && (
                  <div className="mt-4 flex gap-3">
                    <button 
                      className="px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                      style={{ backgroundColor: '#f5be67' }}
                    >
                      View Quote
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200">
                      Decline
                    </button>
                  </div>
                )}

                {notification.type === 'order' && notification.title.includes('Delivered') && (
                  <div className="mt-4">
                    <button 
                      className="px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                      style={{ backgroundColor: '#f5be67' }}
                    >
                      Rate & Review
                    </button>
                  </div>
                )}

                {notification.type === 'message' && (
                  <div className="mt-4">
                    <button 
                      className="px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                      style={{ backgroundColor: '#f5be67' }}
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;