import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import c2i from "../images/c2o.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navigation = [
    { name: "ACCUEIL", href: "/" },
    { name: "AUTOMATISATION", href: "/automation" },
    { name: "DÉVELOPPEMENT WEB", href: "/web-dev" },
    { name: "SOLUTIONS IOT", href: "/iot" },
    { name: "FORMATION", href: "/training" },
  ];

  const getActiveClass = (isActive, route) => {
    if (!isActive)
      return "text-gray-700 hover:text-greenc2i-600 hover:from-greenc2i-500 hover:via-bluec2i-500 hover:to-orangec2i-500";

    switch (route) {
      case "/":
        return "bg-gradient-to-r from-greenc2i-500 to-bluec2i-500 text-white";
      case "/web-dev":
        return "bg-gradient-to-r from-bluec2i-500 to-greenc2i-500 text-white";
      case "/automation":
        return "bg-gradient-to-r from-orangec2i-500 to-bluec2i-500 text-white";
      case "/iot":
        return "bg-gradient-to-r to-purplec2i-500 from-greenc2i-500 text-white";
      case "/training":
        return "bg-purplec2i-500 text-white";
      default:
        return "text-greenc2i-600 bg-green-50";
    }
  };

  const getBarColor = (isActive, route) => {
    if (!isActive) return "bg-gradient-to-r from-greenc2i-500 to-bluec2i-500";

    switch (route) {
      case "/":
        return "from-purplec2i-500 to-greenc2i-500";
      case "/web-dev":
        return "from-bluec2i-500 to-orangec2i-500";
      case "/automation":
        return "from-orangec2i-500 to-purplec2i-500";
      case "/iot":
        return "from-greenc2i-500 to-bluec2i-500";
      case "/training":
        return "bg-purplec2i-500";
      default:
        return "from-greenc2i-500 to-bluec2i-500";
    }
  };

  const goToAndScrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
      delay: 300,
    });
  }; // Delay ensures page has time to load

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-white/80 backdrop-blur-md border-b border-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-18">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src={c2i}
                  alt="C2I Logo"
                  className={`object-contain h-10 lg:h-12 transition-all duration-300 group-hover:scale-105 ${
                    isScrolled ? "drop-shadow-md" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-greenc2i-500/20 via-bluec2i-500/20 to-orangec2i-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `${getActiveClass(
                      isActive,
                      item.href
                    )} relative px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 group`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{item.name}</span>
                      <div
                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-300 ${
                          isActive
                            ? `w-fit bg-gradient-to-r ${getBarColor(
                                true,
                                item.href
                              )}`
                            : "w-0 group-hover:w-6 bg-gradient-to-r from-orange-500 to-bluec2i-500"
                        } rounded-full`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={goToAndScrollToBottom}
                className={`relative ${
                  location.pathname === "/training"
                    ? "bg-gradient-to-r from-purplec2i-500 to-orangec2i-500"
                    : "bg-gradient-to-r from-greenc2i-600 to-bluec2i-900"
                } text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group overflow-hidden`}
              >
                <span className="relative z-10 flex items-center">
                  {location.pathname === "/training"
                    ? "Obtenir une formation"
                    : "Commencer"}
                  <ChevronDown className="ml-2 w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative inline-flex items-center justify-center p-2 rounded-xl text-gray-600 hover:text-greenc2i-600 hover:bg-greenc2i-bg focus:outline-none transition-all duration-300 ${
                  isOpen ? "bg-greenc2i-50 text-greenc2i-600" : ""
                }`}
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative w-6 h-6">
                  <Menu
                    className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                      isOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"
                    }`}
                  />
                  <X
                    className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                      isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-100">
            <div className="px-4 py-6 space-y-2">
              {navigation.map((item, index) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-base font-bold rounded-xl transition-all duration-300 transform ${
                      isActive
                        ? `${getActiveClass(isActive, item.href)}`
                        : "text-gray-700 hover:text-greenc2i-600 hover:bg-gray-50"
                    }`
                  }
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen
                      ? "slideInFromRight 0.3s ease-out forwards"
                      : "none",
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {({ isActive }) => (
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      {isActive && (
                        <div
                          className={`w-2 h-2 rounded-full ${
                            getBarColor(true, item.href).includes("bg-")
                              ? getBarColor(true, item.href)
                              : `bg-gradient-to-r ${getBarColor(
                                  true,
                                  item.href
                                )}`
                          }`}
                        />
                      )}
                    </div>
                  )}
                </NavLink>
              ))}

              {/* Mobile CTA Button */}
              {/* Mobile CTA Button */}
              <div className="pt-4 border-t border-gray-100 mt-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    goToAndScrollToBottom();
                  }}
                  className={`w-full ${
                    location.pathname === "/training"
                      ? "bg-gradient-to-r from-purplec2i-500 to-orangec2i-500"
                      : "bg-gradient-to-r from-greenc2i-600 to-bluec2i-900"
                  } text-white px-6 py-3  rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5`}
                >
                  {location.pathname === "/training"
                    ? "Obtenir une formation"
                    : "Commencer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
