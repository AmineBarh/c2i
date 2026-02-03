// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import React from "react";

// Mock window.scrollTo
window.scrollTo = jest.fn();
global.scrollTo = jest.fn();

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock matchMedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

// Mock react-router-dom
jest.mock("react-router-dom", () => {
  return {
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => <div>{element}</div>,
    NavLink: ({ children, to, className }) => {
      const isActive = false;
      const content =
        typeof children === "function" ? children({ isActive }) : children;
      const classes =
        typeof className === "function" ? className({ isActive }) : className;
      return (
        <a href={to} className={classes}>
          {content}
        </a>
      );
    },
    Link: ({ children, to, className }) => (
      <a href={to} className={className}>
        {children}
      </a>
    ),
    useLocation: () => ({ pathname: "/" }),
    useNavigate: () => jest.fn(),
  };
}, { virtual: true });

// Mock framer-motion
jest.mock("framer-motion", () => {
  const actual = jest.requireActual("react");
  return {
    motion: {
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
      span: ({ children, ...props }) => <span {...props}>{children}</span>,
    },
    AnimatePresence: ({ children }) => <>{children}</>,
    useInView: () => true,
    useMotionValue: (v) => ({
      get: () => v,
      set: () => {},
      on: () => () => {},
    }),
    useSpring: (v) => ({ on: (event, callback) => () => {} }),
  };
});

// Mock axios
jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(() => ({
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
  })),
}));

// Mock react-fast-marquee
jest.mock("react-fast-marquee", () => {
  return function MockMarquee({ children }) {
    return <div>{children}</div>;
  };
});

// Mock react-rotating-text
jest.mock("react-rotating-text", () => {
  return function MockRotatingText() {
    return <span>Text</span>;
  };
});
