import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CardNav from "../components/CardNav";
import PhoneMockup from "../components/PhoneMockup";
import PopularServices from "../components/PopularServices";

const Home = () => {
  const heroRef = useRef(null);
  const shapesRef = useRef([]);

  useEffect(() => {
    const shapes = shapesRef.current;

    // Animate floating shapes
    shapes.forEach((shape, index) => {
      if (shape) {
        const duration = 3000 + index * 500;
        const delay = index * 200;

        const animate = () => {
          shape.style.transform = `translateY(-20px) rotate(${index * 45}deg)`;
          setTimeout(() => {
            shape.style.transform = `translateY(20px) rotate(${
              index * 45 + 180
            }deg)`;
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
        <div
          className="phone-hero-right animate-slideInUp"
          style={{ animationDelay: "1s" }}
        >
          <PhoneMockup
            image="/farmer-image.png"
            alt="Farmer working - KarigarLink connects you with skilled professionals"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 transform perspective-1000">
                <span
                  className="inline-block animate-slideInUp"
                  style={{ animationDelay: "0.2s" }}
                >
                  Connect with Skilled
                </span>
                <span
                  className="block font-bold animate-slideInUp transform hover:scale-105 transition-transform duration-300"
                  style={{
                    animationDelay: "0.4s",
                    color: "#f5be67",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Karigars
                </span>
              </h1>
              <p
                className="text-2xl text-gray-600 mb-12 leading-relaxed animate-slideInUp"
                style={{ animationDelay: "0.6s" }}
              >
                Find trusted local service providers for all your home and
                business needs. From plumbing to electrical work, we connect you
                with verified professionals.
              </p>
              <div
                className="flex flex-col sm:flex-row gap-6 animate-slideInUp"
                style={{ animationDelay: "0.8s" }}
              >
                <Link
                  to="/register"
                  className="group relative text-white px-12 py-4 rounded-full text-xl font-bold shadow-2xl transition-all duration-300 hover:shadow-3xl transform hover:-translate-y-2 overflow-hidden"
                  style={{ backgroundColor: "#f5be67" }}
                >
                  <span className="relative z-10">Find Services</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <Link
                  to="/register"
                  className="group relative border-4 text-gray-700 hover:text-white px-12 py-4 rounded-full text-xl font-bold transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 overflow-hidden"
                  style={{ borderColor: "#f5be67" }}
                >
                  <span className="relative z-10">Become a Provider</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Section with Timeline Animation */}
      <PopularServices />

      {/* How it Works - Enhanced */}
      <section className="py-24 bg-white relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50 to-yellow-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-slideInUp">
              How It <span style={{ color: "#f5be67" }}>Works</span>
            </h2>
            <p
              className="text-xl text-gray-600 max-w-2xl mx-auto animate-slideInUp"
              style={{ animationDelay: "0.1s" }}
            >
              Get your work done in three simple steps with our trusted network
              of skilled professionals
            </p>
          </div>

          <div className="relative">
            {/* Connection Lines */}
            <div
              className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-orange-300 via-yellow-400 to-orange-300 transform -translate-y-1/2 animate-slideInUp"
              style={{ animationDelay: "0.8s" }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discover & Verify",
                  desc: "Explore thousands of unique crafts and verify any product's story with our QR code.",
                  icon: "🔍",
                },
                {
                  step: "02",
                  title: "Connect Directly",
                  desc: "Buy directly from artisans or post your bulk order (RFQ) for B2B sourcing.",
                  icon: "🤝",
                },
                {
                  step: "03",
                  title: "Secure Payments",
                  desc: "Pay securely using our trusted platform.",
                  icon: "🔒",
                },
                {
                  step: "04",
                  title: "Track Your Impact",
                  desc: "Receive your authentic product and see the positive social impact of your purchase.",
                  icon: "📊",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative group animate-slideInUp"
                  style={{ animationDelay: `${index * 0.2 + 0.4}s` }}
                >
                  {/* Card */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Step Number */}
                    <div className="relative z-10 mb-6">
                      <div className="flex items-center justify-center">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                          style={{
                            backgroundColor: "#f5be67",
                            boxShadow: "0 8px 25px rgba(245, 190, 103, 0.4)",
                          }}
                        >
                          {item.step}
                        </div>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="text-center mb-6 relative z-10">
                      <div className="text-4xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                        {item.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center relative z-10">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-300 transition-colors duration-300" />
                  </div>

                  {/* Connection Dots for Mobile */}
                  {index < 3 && (
                    <div className="lg:hidden flex justify-center mt-6 mb-6">
                      <div className="w-2 h-2 bg-orange-300 rounded-full animate-pulse" />
                      <div
                        className="w-2 h-2 bg-orange-300 rounded-full mx-2 animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 bg-orange-300 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div
            className="text-center mt-16 animate-slideInUp"
            style={{ animationDelay: "1s" }}
          >
            <Link
              to="/register"
              className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              style={{ backgroundColor: "#f5be67" }}
            >
              <span className="relative z-10 mr-2">Proceed</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section
        className="py-24 relative z-10 overflow-hidden"
        style={{ backgroundColor: "#f5be67" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-400 opacity-30" />

        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Badge */}
          <div className="inline-block mb-6">
            <span className="bg-white bg-opacity-20 text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider animate-slideInUp backdrop-blur-sm">
              Join Us Today
            </span>
          </div>

          <h2
            className="text-5xl md:text-6xl font-bold text-white mb-6 animate-slideInUp"
            style={{ animationDelay: "0.1s" }}
          >
            Ready to Get{" "}
            <span className="text-white drop-shadow-lg">Started?</span>
          </h2>

          <p
            className="text-xl md:text-2xl text-white opacity-95 mb-12 max-w-3xl mx-auto leading-relaxed animate-slideInUp"
            style={{ animationDelay: "0.2s" }}
          >
            Join thousands of satisfied customers and skilled artisans in our
            growing marketplace
          </p>

          {/* Stats */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-slideInUp"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-white opacity-80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">5,000+</div>
              <div className="text-white opacity-80">Skilled Artisans</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50,000+</div>
              <div className="text-white opacity-80">Products Delivered</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slideInUp"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              to="/register"
              className="group relative bg-white text-xl font-bold px-10 py-4 rounded-full shadow-2xl transition-all duration-300 hover:shadow-3xl transform hover:-translate-y-2 overflow-hidden"
              style={{ color: "#f5be67" }}
            >
              <span className="relative z-10 flex items-center">
                Join KarigarLink
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              to="/about"
              className="group relative border-2 border-white text-white text-xl font-semibold px-10 py-4 rounded-full transition-all duration-300 hover:bg-white hover:text-orange-600 transform hover:-translate-y-1"
            >
              Learn More
            </Link>
          </div>

          {/* Trust Indicators */}
          <div
            className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-80 animate-slideInUp"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center text-white text-sm">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Verified Artisans
            </div>
            <div className="flex items-center text-white text-sm">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Secure Payments
            </div>
            <div className="flex items-center text-white text-sm">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Quality Guaranteed
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3
              className="text-3xl font-bold mb-4"
              style={{ color: "#f5be67" }}
            >
              KarigarLink
            </h3>
            <p className="text-gray-400 mb-6 text-lg">
              Connecting you with skilled professionals across India
            </p>
            <p className="text-gray-500">
              &copy; 2024 KarigarLink. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
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
          right: 8rem;
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
