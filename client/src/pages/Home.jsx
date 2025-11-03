import React from 'react';
import { Link } from 'react-router-dom';
import CardNav from '../components/CardNav';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Animated Navigation - automatically shows based on user role */}
      <CardNav />

      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
              Connect with Skilled
              <span className="block" style={{ color: '#f5be67' }}>Karigars</span>
            </h1>
            <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Find trusted local service providers for all your home and business needs. 
              From plumbing to electrical work, we connect you with verified professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/register"
                className="text-white px-12 py-4 rounded-full text-xl font-bold shadow-2xl transition-all duration-300 hover:shadow-3xl transform hover:-translate-y-1"
                style={{ backgroundColor: '#f5be67' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e6a855'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f5be67'}
              >
                Find Services
              </Link>
              <Link
                to="/register"
                className="border-4 text-gray-700 hover:text-white px-12 py-4 rounded-full text-xl font-bold transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
                style={{ borderColor: '#f5be67' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f5be67';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#374151';
                }}
              >
                Become a Provider
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20" style={{ backgroundColor: '#f5be67' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Popular Services</h2>
            <p className="text-xl text-white opacity-90">Choose from a wide range of professional services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Plumbing', icon: '🔧', desc: 'Pipe repairs, installations & maintenance' },
              { name: 'Electrical', icon: '⚡', desc: 'Wiring, repairs & installations' },
              { name: 'Cleaning', icon: '🧹', desc: 'Home & office deep cleaning' },
              { name: 'Carpentry', icon: '🔨', desc: 'Furniture, repairs & custom work' }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-5xl mb-6 text-center">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{service.name}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to get your work done</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '1', title: 'Post Your Need', desc: 'Describe what service you need in detail' },
              { step: '2', title: 'Get Quotes', desc: 'Receive competitive quotes from verified providers' },
              { step: '3', title: 'Hire & Pay', desc: 'Choose the best provider and get quality work done' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-20 h-20 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl"
                  style={{ backgroundColor: '#f5be67' }}
                >
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#f5be67' }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white opacity-90 mb-8">Join thousands of satisfied customers and skilled professionals</p>
          <Link
            to="/register"
            className="bg-white text-xl font-bold px-12 py-4 rounded-full shadow-2xl transition-all duration-300 hover:shadow-3xl transform hover:-translate-y-1"
            style={{ color: '#f5be67' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          >
            Join KarigarLink Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#f5be67' }}>KarigarLink</h3>
            <p className="text-gray-400 mb-6 text-lg">Connecting you with skilled professionals across India</p>
            <p className="text-gray-500">&copy; 2024 KarigarLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;