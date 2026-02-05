// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock window.scrollTo
window.scrollTo = jest.fn();
global.scrollTo = jest.fn();

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
    ok: true,
  })
);

// Manual mock for react-router-dom to fix ESM issues with Jest 27
jest.mock('react-router-dom', () => {
  return {
    __esModule: true,
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
    Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
    NavLink: ({ children, className, to, ...props }) => {
      const isActive = false;
      const appliedClassName = typeof className === 'function' ? className({ isActive }) : className;
      const content = typeof children === 'function' ? children({ isActive }) : children;
      return <a href={to} className={appliedClassName} {...props}>{content}</a>;
    },
    useNavigate: () => jest.fn(),
    useLocation: () => ({ pathname: '/' }),
  };
}, { virtual: true });

// Manual mock for axios to fix ESM issues with Jest 27
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(() => ({
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    }
  })),
}), { virtual: true });

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    // Add other HTML elements as needed
  },
  useInView: () => true,
  useMotionValue: (v) => ({ get: () => v, set: () => {}, on: () => () => {} }),
  useSpring: (v) => ({ on: () => () => {} }),
  AnimatePresence: ({ children }) => <>{children}</>,
}), { virtual: true });
