import React from "react";
import { Link } from "react-router-dom";
import CardNav from "../components/CardNav";
import {
  ArrowRight,
  Search,
  Shield,
  Zap,
  Users,
  CheckCircle,
  Star,
  TrendingUp,
  Package,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Search,
      title: "Discover & Verify",
      description: "Explore thousands of unique crafts and verify authenticity with QR codes",
    },
    {
      icon: Users,
      title: "Connect Directly",
      description: "Buy directly from artisans or post bulk orders for B2B sourcing",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Pay securely using our trusted platform with buyer protection",
    },
    {
      icon: TrendingUp,
      title: "Track Impact",
      description: "See the positive social impact of your purchases in real-time",
    },
  ];

  const stats = [
    { label: "Happy Customers", value: "10,000+", icon: Users },
    { label: "Skilled Artisans", value: "5,000+", icon: Package },
    { label: "Products Delivered", value: "50,000+", icon: CheckCircle },
    { label: "Success Rate", value: "98%", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Navigation */}
      <CardNav />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full border border-orange-200 text-orange-700 text-sm font-semibold mb-8">
              <Zap className="w-4 h-4" />
              Connecting Artisans with Opportunities
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Connect with Skilled
              <span className="block bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Karigars
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
              Find trusted local service providers for all your needs. From crafts to services,
              we connect you with verified professionals across India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Find Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-orange-300 text-orange-600 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all"
              >
                Become a Provider
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-lg hover:scale-105 transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your work done in four simple steps with our trusted network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border border-orange-200 p-8 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-3">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-400">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of satisfied customers and skilled artisans today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Join KarigarLink
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all"
              >
                Learn More
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-white text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Verified Artisans
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Secure Payments
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Quality Guaranteed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">KarigarLink</span>
          </div>
          <p className="text-gray-400 mb-4">
            Connecting you with skilled professionals across India
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 KarigarLink. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
