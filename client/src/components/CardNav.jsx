import { useEffect, useRef, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./CardNav.css";

const CardNav = ({ className = "" }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const { user, logoutUser, isAuthenticated } = useAuth();

  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  // Close nav when route changes
  useEffect(() => {
    setIsHamburgerOpen(false);
    setIsExpanded(false);
    const navEl = navRef.current;
    if (navEl) {
      navEl.style.height = "60px";
      navEl.classList.remove("open");
    }
  }, [location.pathname]);

  /**
   * Build items for each role.
   * IMPORTANT: This function only changes logic/data, not styles — your CSS remains identical.
   */
  const getItemsForRole = (role) => {
    // default items (guest / fallback)
    const defaultItems = [
      {
        label: "Services",
        bgColor: "rgba(245, 190, 103, 0.9)",
        textColor: "white",
        links: [
          {
            label: "Browse All Services",
            href: "/services",
            ariaLabel: "Browse all available services",
          },
          {
            label: "Plumbing Services",
            href: "/services/plumbing",
            ariaLabel: "Find plumbing services",
          },
          {
            label: "Electrical Work",
            href: "/services/electrical",
            ariaLabel: "Find electrical services",
          },
          {
            label: "Home Cleaning",
            href: "/services/cleaning",
            ariaLabel: "Find cleaning services",
          },
        ],
      },
      {
        label: "For Providers",
        bgColor: "rgba(255, 255, 255, 0.95)",
        textColor: "#f5be67",
        links: [
          {
            label: "Join as Provider",
            href: "/register",
            ariaLabel: "Register as service provider",
          },
          {
            label: "How it Works",
            href: "/how-it-works",
            ariaLabel: "Learn how our platform works",
          },
          {
            label: "Provider Benefits",
            href: "/benefits",
            ariaLabel: "See provider benefits",
          },
          {
            label: "Success Stories",
            href: "/stories",
            ariaLabel: "Read success stories",
          },
        ],
      },
      {
        label: "Support",
        bgColor: "rgba(245, 190, 103, 0.85)",
        textColor: "white",
        links: [
          {
            label: "Help Center",
            href: "/help",
            ariaLabel: "Get help and support",
          },
          {
            label: "Contact Us",
            href: "/contact",
            ariaLabel: "Contact our team",
          },
          { label: "Sign In", href: "/login", ariaLabel: "Sign in to account" },
          {
            label: "Register",
            href: "/register",
            ariaLabel: "Create new account",
          },
        ],
      },
    ];

    // CUSTOMER (buyer) - show RFQ creation, browsing, my-rfqs, suppliers, samples
    if (role === "customer") {
      return [
        {
          label: "Sourcing",
          bgColor: "rgba(245, 190, 103, 0.9)",
          textColor: "white",
          links: [
            { label: "Browse RFQs", href: "/rfqs", ariaLabel: "Browse RFQs" }, // public RFQ listing (buyers/providers can browse)
            {
              label: "Post RFQ",
              href: "/rfq/create",
              ariaLabel: "Create a new RFQ",
            },
            { label: "My RFQs", href: "/my-rfqs", ariaLabel: "View my RFQs" },
            {
              label: "Supplier Directory",
              href: "/suppliers",
              ariaLabel: "Browse verified suppliers",
            },
          ],
        },
        {
          label: "Shopping",
          bgColor: "rgba(255, 255, 255, 0.95)",
          textColor: "#f5be67",
          links: [
            { label: "Cart", href: "/cart", ariaLabel: "View cart" },
            {
              label: "Sample Orders",
              href: "/orders/samples",
              ariaLabel: "View sample orders",
            },
            { label: "Orders", href: "/orders", ariaLabel: "View orders" },
            {
              label: "Suppliers",
              href: "/suppliers",
              ariaLabel: "Supplier directory",
            },
          ],
        },
        {
          label: "Account",
          bgColor: "rgba(245, 190, 103, 0.85)",
          textColor: "white",
          links: [
            {
              label: "Dashboard",
              href: "/dashboard",
              ariaLabel: "Go to dashboard",
            },
            { label: "Profile", href: "/profile", ariaLabel: "Edit profile" },
            {
              label: "Notifications",
              href: "/notifications",
              ariaLabel: "View notifications",
            },
            {
              label: "Logout",
              href: "#",
              ariaLabel: "Sign out",
              onClick: logoutUser,
            },
          ],
        },
      ];
    }

    // PROVIDER (artisan) - show RFQs to bid, my bids, supplier profile management
    if (role === "provider") {
      return [
        {
          label: "Opportunities",
          bgColor: "rgba(245, 190, 103, 0.9)",
          textColor: "white",
          links: [
            {
              label: "Browse RFQs",
              href: "/rfqs",
              ariaLabel: "Browse RFQs to bid on",
            },
            { label: "My Bids", href: "/bids/me", ariaLabel: "View your bids" },
            {
              label: "Manage Replies",
              href: "/provider/replies",
              ariaLabel: "Manage quotes and replies",
            },
            {
              label: "Supplier Profile",
              href: "/provider/profile",
              ariaLabel: "Manage supplier profile",
            },
          ],
        },
        {
          label: "Business",
          bgColor: "rgba(255, 255, 255, 0.95)",
          textColor: "#f5be67",
          links: [
            {
              label: "Dashboard",
              href: "/provider/dashboard",
              ariaLabel: "Provider dashboard",
            },
            {
              label: "My Services",
              href: "/provider/services",
              ariaLabel: "Manage services",
            },
            {
              label: "Earnings",
              href: "/provider/earnings",
              ariaLabel: "View earnings",
            },
            {
              label: "Analytics",
              href: "/provider/analytics",
              ariaLabel: "View analytics",
            },
          ],
        },
        {
          label: "Account",
          bgColor: "rgba(245, 190, 103, 0.85)",
          textColor: "white",
          links: [
            {
              label: "Business Info",
              href: "/provider/business",
              ariaLabel: "Manage business info",
            },
            {
              label: "Support",
              href: "/provider/support",
              ariaLabel: "Get support",
            },
            {
              label: "Logout",
              href: "#",
              ariaLabel: "Sign out",
              onClick: logoutUser,
            },
          ],
        },
      ];
    }

    // default fallback (guest)
    return defaultItems;
  };

  const items = getItemsForRole(user?.role);

  // toggle menu
  const toggleMenu = () => {
    const navEl = navRef.current;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      if (navEl) {
        navEl.style.height = "260px";
        navEl.classList.add("open");
      }
    } else {
      setIsHamburgerOpen(false);
      setIsExpanded(false);
      if (navEl) {
        navEl.style.height = "60px";
        navEl.classList.remove("open");
      }
    }
  };

  const handleLinkClick = async (link) => {
    // if the link has an onClick (like logout), call it
    if (link.onClick) {
      try {
        await link.onClick();
      } catch (err) {
        console.error("link onClick error:", err);
      }
    }
    // collapse menu on mobile
    if (window.innerWidth < 1024) {
      const navEl = navRef.current;
      setIsHamburgerOpen(false);
      setIsExpanded(false);
      if (navEl) {
        navEl.style.height = "60px";
        navEl.classList.remove("open");
      }
    }
  };

  if (hideNavbar) return null;

  return (
    <div className={`card-nav-container ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""}`}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
      >
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            tabIndex={0}
            style={{ color: "#f5be67" }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleMenu();
            }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <div className="logo-container">
            <Link to="/" className="logo-text" style={{ color: "#f5be67" }}>
              KarigarLink
            </Link>
          </div>

          {!isAuthenticated ? (
            <Link
              to="/register"
              className="card-nav-cta-button"
              style={{ backgroundColor: "#f5be67", color: "white" }}
              onClick={() => {
                // collapse on mobile when clicking CTA
                if (window.innerWidth < 1024) toggleMenu();
              }}
            >
              Get Started
            </Link>
          ) : (
            <div
              className="user-info"
              style={{ color: "#f5be67", fontWeight: "600" }}
            >
              Hi, {user?.fullname?.firstname || user?.name || "User"}
            </div>
          )}
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {items.map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card glass-card"
              style={{
                backgroundColor: item.bgColor,
                color: item.textColor,
                border: item.bgColor.includes("255, 255, 255")
                  ? "1px solid rgba(245, 190, 103, 0.3)"
                  : "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) =>
                  lnk.onClick ? (
                    <button
                      key={`${lnk.label}-${i}`}
                      className="nav-card-link"
                      onClick={() => handleLinkClick(lnk)}
                      aria-label={lnk.ariaLabel}
                      style={{
                        background: "none",
                        border: "none",
                        color: "inherit",
                        textAlign: "left",
                      }}
                    >
                      <GoArrowUpRight className="nav-card-link-icon" />
                      {lnk.label}
                    </button>
                  ) : (
                    <Link
                      key={`${lnk.label}-${i}`}
                      className="nav-card-link"
                      to={lnk.href}
                      aria-label={lnk.ariaLabel}
                      onClick={() => {
                        // also collapse the menu on mobile for normal links
                        if (window.innerWidth < 1024) {
                          const navEl = navRef.current;
                          setIsHamburgerOpen(false);
                          setIsExpanded(false);
                          if (navEl) {
                            navEl.style.height = "60px";
                            navEl.classList.remove("open");
                          }
                        }
                      }}
                    >
                      <GoArrowUpRight className="nav-card-link-icon" />
                      {lnk.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
