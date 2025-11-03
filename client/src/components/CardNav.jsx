import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './CardNav.css';

const CardNav = ({ className = '', ease = 'power3.out' }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  const location = useLocation();
  const { user, isAuthenticated, logoutUser } = useAuth();

  // Hide navbar on login/register pages
  const hideNavbar = ['/login', '/register'].includes(location.pathname);

  // Get navigation items based on user role
  const getNavItems = () => {
    if (!isAuthenticated) {
      return [
        {
          label: 'Services',
          bgColor: 'rgba(245, 190, 103, 0.9)',
          textColor: 'white',
          links: [
            { label: 'Browse All Services', href: '/services', ariaLabel: 'Browse all available services' },
            { label: 'Plumbing Services', href: '/services/plumbing', ariaLabel: 'Find plumbing services' },
            { label: 'Electrical Work', href: '/services/electrical', ariaLabel: 'Find electrical services' },
            { label: 'Home Cleaning', href: '/services/cleaning', ariaLabel: 'Find cleaning services' }
          ]
        },
        {
          label: 'For Providers',
          bgColor: 'rgba(255, 255, 255, 0.95)',
          textColor: '#f5be67',
          links: [
            { label: 'Join as Provider', href: '/register', ariaLabel: 'Register as service provider' },
            { label: 'How it Works', href: '/how-it-works', ariaLabel: 'Learn how our platform works' },
            { label: 'Provider Benefits', href: '/benefits', ariaLabel: 'See provider benefits' },
            { label: 'Success Stories', href: '/stories', ariaLabel: 'Read success stories' }
          ]
        },
        {
          label: 'Support',
          bgColor: 'rgba(245, 190, 103, 0.85)',
          textColor: 'white',
          links: [
            { label: 'Help Center', href: '/help', ariaLabel: 'Get help and support' },
            { label: 'Contact Us', href: '/contact', ariaLabel: 'Contact our team' },
            { label: 'Sign In', href: '/login', ariaLabel: 'Sign in to account' },
            { label: 'Register', href: '/register', ariaLabel: 'Create new account' }
          ]
        }
      ];
    }

    if (user?.role === 'customer') {
      return [
        {
          label: 'Services',
          bgColor: 'rgba(245, 190, 103, 0.9)',
          textColor: 'white',
          links: [
            { label: 'Browse Services', href: '/services', ariaLabel: 'Browse all services' },
            { label: 'My Bookings', href: '/bookings', ariaLabel: 'View my bookings' },
            { label: 'Book Service', href: '/book-service', ariaLabel: 'Book new service' },
            { label: 'Service History', href: '/history', ariaLabel: 'View service history' }
          ]
        },
        {
          label: 'My Account',
          bgColor: 'rgba(255, 255, 255, 0.95)',
          textColor: '#f5be67',
          links: [
            { label: 'Dashboard', href: '/dashboard', ariaLabel: 'Go to dashboard' },
            { label: 'Profile Settings', href: '/profile', ariaLabel: 'Edit profile' },
            { label: 'Payment Methods', href: '/payments', ariaLabel: 'Manage payments' },
            { label: 'Notifications', href: '/notifications', ariaLabel: 'View notifications' }
          ]
        },
        {
          label: 'Support',
          bgColor: 'rgba(245, 190, 103, 0.85)',
          textColor: 'white',
          links: [
            { label: 'Help Center', href: '/help', ariaLabel: 'Get help' },
            { label: 'Contact Support', href: '/contact', ariaLabel: 'Contact support' },
            { label: 'Rate Services', href: '/reviews', ariaLabel: 'Rate and review services' },
            { label: 'Logout', href: '#', ariaLabel: 'Sign out', onClick: logoutUser }
          ]
        }
      ];
    }

    if (user?.role === 'provider') {
      return [
        {
          label: 'My Business',
          bgColor: 'rgba(245, 190, 103, 0.9)',
          textColor: 'white',
          links: [
            { label: 'Dashboard', href: '/provider/dashboard', ariaLabel: 'Provider dashboard' },
            { label: 'My Services', href: '/provider/services', ariaLabel: 'Manage services' },
            { label: 'Add Service', href: '/provider/add-service', ariaLabel: 'Add new service' },
            { label: 'Analytics', href: '/provider/analytics', ariaLabel: 'View analytics' }
          ]
        },
        {
          label: 'Bookings',
          bgColor: 'rgba(255, 255, 255, 0.95)',
          textColor: '#f5be67',
          links: [
            { label: 'New Requests', href: '/provider/requests', ariaLabel: 'View new requests' },
            { label: 'Active Jobs', href: '/provider/active', ariaLabel: 'View active jobs' },
            { label: 'Completed Jobs', href: '/provider/completed', ariaLabel: 'View completed jobs' },
            { label: 'Earnings', href: '/provider/earnings', ariaLabel: 'View earnings' }
          ]
        },
        {
          label: 'Account',
          bgColor: 'rgba(245, 190, 103, 0.85)',
          textColor: 'white',
          links: [
            { label: 'Profile Settings', href: '/provider/profile', ariaLabel: 'Edit profile' },
            { label: 'Business Info', href: '/provider/business', ariaLabel: 'Manage business info' },
            { label: 'Support', href: '/provider/support', ariaLabel: 'Get support' },
            { label: 'Logout', href: '#', ariaLabel: 'Sign out', onClick: logoutUser }
          ]
        }
      ];
    }

    return [];
  };

  const items = getNavItems();

  const toggleMenu = () => {
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      
      const navEl = navRef.current;
      if (navEl) {
        navEl.style.height = '260px';
        navEl.classList.add('open');
      }
    } else {
      setIsHamburgerOpen(false);
      setIsExpanded(false);
      
      const navEl = navRef.current;
      if (navEl) {
        navEl.style.height = '60px';
        navEl.classList.remove('open');
      }
    }
  };

  const handleLinkClick = async (link) => {
    if (link.onClick) {
      await link.onClick();
      toggleMenu();
    }
  };

  if (hideNavbar) return null;

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: '#f5be67' }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <div className="logo-container">
            <Link to="/" className="logo-text" style={{ color: '#f5be67' }}>
              KarigarLink
            </Link>
          </div>

          {!isAuthenticated ? (
            <Link
              to="/register"
              className="card-nav-cta-button"
              style={{ backgroundColor: '#f5be67', color: 'white' }}
            >
              Get Started
            </Link>
          ) : (
            <div className="user-info" style={{ color: '#f5be67', fontWeight: '600' }}>
              Hi, {user?.name?.split(' ')[0]}
            </div>
          )}
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card glass-card"
              style={{ 
                backgroundColor: item.bgColor, 
                color: item.textColor,
                border: item.bgColor.includes('255, 255, 255') ? '1px solid rgba(245, 190, 103, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  lnk.onClick ? (
                    <button
                      key={`${lnk.label}-${i}`}
                      className="nav-card-link"
                      onClick={() => handleLinkClick(lnk)}
                      aria-label={lnk.ariaLabel}
                      style={{ background: 'none', border: 'none', color: 'inherit', textAlign: 'left' }}
                    >
                      <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                      {lnk.label}
                    </button>
                  ) : (
                    <Link 
                      key={`${lnk.label}-${i}`} 
                      className="nav-card-link" 
                      to={lnk.href} 
                      aria-label={lnk.ariaLabel}
                    >
                      <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                      {lnk.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;