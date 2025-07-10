import React from "react";
import logoC2I from "../images/c2o.png";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-around fixed top-0 w-screen h-14 backdrop-blur-md bg-white/80 z-50">
      <Link to="/">
        <img src={logoC2I} alt="logo" className="object-contain h-10" />
      </Link>
      <div className="hidden sm:flex gap-6 items-center">
        <Link
          to="/"
          className="font-medium text-black-500 hover:text-transparent hover:bg-gradient-to-r hover:from-greenc2i-500 hover:via-bluec2i-500 hover:to-orangec2i-500 hover:bg-clip-text transition-all duration-300"
        >
          Home
        </Link>
        <NavLink
          to="/iot"
          className={({ isActive }) =>
            isActive
              ? "text-greenc2i-500 font-medium"
              : "font-medium hover:text-greenc2i-500"
          }
        >
          IoT Solutions
        </NavLink>
        <NavLink
          to="/web-dev"
          className={({ isActive }) =>
            isActive
              ? "text-bluec2i-500 font-medium"
              : "font-medium hover:text-bluec2i-500"
          }
        >
          Web Development
        </NavLink>
        <NavLink
          to="/automation"
          className={({ isActive }) =>
            isActive
              ? "text-orangec2i-500 font-medium"
              : "font-medium hover:text-orangec2i-500"
          }
        >
          Automation
        </NavLink>
        <NavLink
          to="/training"
          className={({ isActive }) =>
            isActive
              ? "text-purplec2i-500 font-medium"
              : "font-medium hover:text-purplec2i-500"
          }
        >
          Training
        </NavLink>
        <button className="font-medium bg-gradient-to-r from-greenc2i-600 to-bluec2i-900 text-white rounded-md px-7 py-2">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Navbar;
