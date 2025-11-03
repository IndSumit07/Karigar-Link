import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const success = await loginUser(formData);
    if (success) {
      navigate('/'); // Redirect to landing page
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5be67' }}>
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link to="/" className="text-5xl font-bold text-white hover:text-gray-100 transition-colors">
            KarigarLink
          </Link>
          <p className="text-white text-lg mt-2 opacity-90">Welcome back to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border-4 border-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 border-3 rounded-2xl text-lg focus:outline-none transition-all duration-300"
                style={{ 
                  borderColor: '#f5be67',
                  ':focus': { borderColor: '#e6a855', boxShadow: '0 0 0 3px rgba(245, 190, 103, 0.1)' }
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#e6a855';
                  e.target.style.boxShadow = '0 0 0 3px rgba(245, 190, 103, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#f5be67';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-5 py-4 border-3 rounded-2xl text-lg focus:outline-none transition-all duration-300"
                style={{ borderColor: '#f5be67' }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#e6a855';
                  e.target.style.boxShadow = '0 0 0 3px rgba(245, 190, 103, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#f5be67';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 rounded border-2"
                  style={{ accentColor: '#f5be67' }}
                />
                <label htmlFor="remember-me" className="ml-3 text-sm font-medium text-gray-700">
                  Remember me
                </label>
              </div>
              <Link 
                to="/forgot-password" 
                className="text-sm font-semibold hover:underline transition-colors"
                style={{ color: '#f5be67' }}
                onMouseEnter={(e) => e.target.style.color = '#e6a855'}
                onMouseLeave={(e) => e.target.style.color = '#f5be67'}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              style={{ backgroundColor: '#f5be67' }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#e6a855')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#f5be67')}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="font-bold hover:underline transition-colors"
                style={{ color: '#f5be67' }}
                onMouseEnter={(e) => e.target.style.color = '#e6a855'}
                onMouseLeave={(e) => e.target.style.color = '#f5be67'}
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-white hover:text-gray-100 font-semibold transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;