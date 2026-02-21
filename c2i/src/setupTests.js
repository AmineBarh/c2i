// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock window.scrollTo
window.scrollTo = jest.fn();
global.scrollTo = jest.fn();

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{typeof children === 'function' ? children({ isActive: false }) : children}</a>,
  NavLink: ({ children, to, ...props }) => {
     const className = typeof props.className === 'function' ? props.className({ isActive: false }) : props.className;
     return <a href={to} {...props} className={className}>{typeof children === 'function' ? children({ isActive: false }) : children}</a>
  },
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
}), { virtual: true });

// Mock axios
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

// Mock react-fast-marquee
jest.mock('react-fast-marquee', () => ({ children }) => <div>{children}</div>);

// Mock react-rotating-text
jest.mock('react-rotating-text', () => () => <span>Mocked Text</span>);

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => <div>{children}</div>,
  useInView: () => true,
  useMotionValue: () => ({ set: jest.fn(), on: jest.fn() }),
  useSpring: () => ({ on: jest.fn() }),
}), { virtual: true });

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
};

// Mock matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};
