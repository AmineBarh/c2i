// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock IntersectionObserver
class IntersectionObserver {
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
}
window.IntersectionObserver = IntersectionObserver;

// Mock ResizeObserver
window.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock matchMedia
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // Deprecated
  removeListener: jest.fn(), // Deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

// Mock react-router-dom to bypass ESM incompatibility with Jest 27
jest.mock('react-router-dom', () => {
  return {
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
    Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
    NavLink: ({ children, to, ...props }) => {
        return typeof children === 'function' ? children({ isActive: false }) : <a href={to} {...props}>{children}</a>;
    },
    useLocation: () => ({ pathname: "/" }),
    useNavigate: () => jest.fn(),
    useHref: () => "/",
  };
}, { virtual: true });

// Mock framer-motion to bypass ESM incompatibility
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  useInView: () => true,
  useMotionValue: (val) => ({ set: jest.fn(), get: () => val, on: () => jest.fn() }),
  useSpring: (val) => ({ set: jest.fn(), get: () => val, on: () => jest.fn() }),
  AnimatePresence: ({ children }) => children,
}), { virtual: true });

// Mock axios to bypass ESM incompatibility
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(() => ({
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    }
  })),
}), { virtual: true });
