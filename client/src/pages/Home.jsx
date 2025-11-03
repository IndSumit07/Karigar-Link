import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CardNav from '../components/CardNav';
import PhoneMockup from '../components/PhoneMockup';

const Home = () => {
  const heroRef = useRef(null);
  const shapesRef = useRef([]);

  useEffect(() => {
    const shapes = shapesRef.current;
    
    // Animate floating shapes
    shapes.forEach((shape, index) => {
      if (shape) {
        const duration = 3000 + (index * 500);
        const delay = index * 200;
        
        const animate = () => {
          shape.style.transform = `translateY(-20px) rotate(${index * 45}deg)`;
          setTimeout(() => {
            shape.style.transform = `translateY(20px) rotate(${index * 45 + 180}deg)`;
          }, duration / 2);
        };
        
        setTimeout(() => {
          animate();
          setInterval(animate, duration);
        }, delay);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 relative overflow-hidden">


      {/* Animated Navigation */}
      <CardNav />

      {/* Hero Section with Left-Aligned Content */}
      <section ref={heroRef} className="pt-32 pb-24 relative z-10">
        {/* Phone Mockup - Positioned in front of hero section at right end */}
        <div className="phone-hero-right animate-slideInUp" style={{ animationDelay: '1s' }}>
          <PhoneMockup 
            image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=800&fit=crop"
            alt="KarigarLink mobile app interface"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 transform perspective-1000">
                <span className="inline-block animate-slideInUp" style={{ animationDelay: '0.2s' }}>
                  Connect with Skilled
                </span>
                <span 
                  className="block font-bold animate-slideInUp transform hover:scale-105 transition-transform duration-300"
                  style={{ 
                    animationDelay: '0.4s',
                    color: '#f5be67',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  Karigars
                </span>
              </h1>
              <p className="text-2xl text-gray-600 mb-12 leading-relaxed animate-slideInUp" style={{ animationDelay: '0.6s' }}>
                Find trusted local service providers for all your home and business needs. 
                From plumbing to electrical work, we connect you with verified professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 animate-slideInUp" style={{ animationDelay: '0.8s' }}>
                <Link
                  to="/register"
                  className="group relative text-white px-12 py-4 rounded-full text-xl font-bold shadow-2xl transition-all duration-300 hover:shadow-3xl transform hover:-translate-y-2 overflow-hidden"
                  style={{ backgroundColor: '#f5be67' }}
                >
                  <span className="relative z-10">Find Services</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <Link
                  to="/register"
                  className="group relative border-4 text-gray-700 hover:text-white px-12 py-4 rounded-full text-xl font-bold transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 overflow-hidden"
                  style={{ borderColor: '#f5be67' }}
                >
                  <span className="relative z-10">Become a Provider</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative z-10" style={{ backgroundColor: 'rgba(245, 190, 103, 0.95)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-400 opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6 animate-slideInUp">Popular Services</h2>
            <p className="text-xl text-white opacity-90 animate-slideInUp" style={{ animationDelay: '0.2s' }}>Choose from a wide range of professional services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Plumbing', icon: '🔧', desc: 'Pipe repairs, installations & maintenance' },
              { name: 'Electrical', icon: '⚡', desc: 'Wiring, repairs & installations' },
              { name: 'Cleaning', icon: '🧹', desc: 'Home & office deep cleaning' },
              { name: 'Carpentry', icon: '🔨', desc: 'Furniture, repairs & custom work' }
            ].map((service, index) => (
              <div 
                key={index} 
                className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 animate-slideInUp"
                style={{ 
                  animationDelay: `${index * 0.1 + 0.4}s`,
                  perspective: '1000px'
                }}
              >
                <div className="text-5xl mb-6 text-center transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-orange-600 transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50 to-yellow-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slideInUp">How It Works</h2>
            <p className="text-xl text-gray-600 animate-slideInUp" style={{ animationDelay: '0.2s' }}>Simple steps to get your work done</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '1', title: 'Post Your Need', desc: 'Describe what service you need in detail' },
              { step: '2', title: 'Get Quotes', desc: 'Receive competitive quotes from verified providers' },
              { step: '3', title: 'Hire & Pay', desc: 'Choose the best provider and get quality work done' }
            ].map((item, index) => (
              <div key={index} className="text-center group animate-slideInUp" style={{ animationDelay: `${index * 0.2 + 0.4}s` }}>
                <div 
                  className="w-20 h-20 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                  style={{ 
                    backgroundColor: '#f5be67',
                    boxShadow: '0 10px 30px rgba(245, 190, 103, 0.4)'
                  }}
                >
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10 overflow-hidden" style={{ backgroundColor: '#f5be67' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-400 opacity-30" />
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6 animate-slideInUp">Ready to Get Started?</h2>
          <p className="text-xl text-white opacity-90 mb-8 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            Join thousands of satisfied customers and skilled professionals
          </p>
          <Link
            to="/register"
            className="group relative bg-white text-xl font-bold px-12 py-4 rounded-full shadow-2xl transition-all duration-300 hover:shadow-3xl transform hover:-translate-y-2 animate-slideInUp overflow-hidden"
            style={{ 
              color: '#f5be67',
              animationDelay: '0.4s'
            }}
          >
            <span className="relative z-10">Join KarigarLink Today</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#f5be67' }}>KarigarLink</h3>
            <p className="text-gray-400 mb-6 text-lg">Connecting you with skilled professionals across India</p>
            <p className="text-gray-500">&copy; 2024 KarigarLink. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gridPulse {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.15; }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        /* Phone positioned in front of hero section at right end */
        .phone-hero-right {
          position: absolute;
          top: 30%;
          right: 1rem;
          transform: translateY(-50%);
          z-index: 20;
        }

        /* Hero Layout - Full Width for Text */
        .hero-container {
          display: flex;
          align-items: center;
          min-height: 60vh;
        }

        .hero-content {
          flex: 1;
          max-width: 70%;
          text-align: left;
        }

        /* Responsive Layout */
        @media (max-width: 1024px) {
          .phone-hero-right {
            display: none;
          }
          
          .hero-content {
            max-width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 3rem;
          }
          
          .hero-content p {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;