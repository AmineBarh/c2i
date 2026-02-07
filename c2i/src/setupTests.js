// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mocks for IntersectionObserver, ResizeObserver, matchMedia, and scrollTo
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

window.scrollTo = jest.fn();
global.scrollTo = jest.fn();

// Mock react-router-dom manually to avoid ESM issues with Jest 27
jest.mock('react-router-dom', () => {
  const React = require('react');
  return {
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => <div>{element}</div>,
    Link: ({ children, to, ...props }) => {
        // Handle function children if necessary (though Link usually doesn't have them)
        const content = typeof children === 'function' ? children({ isActive: false }) : children;
        return <a href={to} {...props}>{content}</a>;
    },
    NavLink: ({ children, to, className, ...props }) => {
        // Handle function children
        const content = typeof children === 'function' ? children({ isActive: false }) : children;
        // Handle function className
        const resolvedClassName = typeof className === 'function' ? className({ isActive: false }) : className;
        return <a href={to} className={resolvedClassName} {...props}>{content}</a>;
    },
    useLocation: () => ({ pathname: '/' }),
    useNavigate: () => jest.fn(),
    MemoryRouter: ({ children }) => <div>{children}</div>,
  };
}, { virtual: true });

// Mock framer-motion manually
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    useInView: () => true, // Force in view for tests
    useMotionValue: (initial) => ({ set: jest.fn(), on: jest.fn(() => () => {}) }),
    useSpring: (source) => ({ on: jest.fn(() => () => {}) }),
    AnimatePresence: ({ children }) => <>{children}</>,
    motion: {
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
      span: ({ children, ...props }) => <span {...props}>{children}</span>,
    },
  };
}, { virtual: true });

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));
