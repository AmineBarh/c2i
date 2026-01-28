// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback, options) {}
  observe(element) {}
  unobserve(element) {}
  disconnect() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(callback) {}
  observe(element) {}
  unobserve(element) {}
  disconnect() {}
};

// Mock window.scrollTo
window.scrollTo = jest.fn();

// Mock matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Mock Axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  // Add other methods if needed
}));

// Mock react-fast-marquee
jest.mock('react-fast-marquee', () => ({ children }) => <div>{children}</div>);

// Mock react-rotating-text
jest.mock('react-rotating-text', () => () => <div>Rotating Text</div>);

// Mock react-router-dom
jest.mock('react-router-dom', () => {
  return {
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
    Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
    NavLink: ({ children, to, className, ...props }) => {
      const content = typeof children === 'function' ? children({ isActive: false }) : children;
      const css = typeof className === 'function' ? className({ isActive: false }) : className;
      return <a href={to} className={css} {...props}>{content}</a>;
    },
    useLocation: () => ({ pathname: '/' }),
    useNavigate: () => jest.fn(),
    BrowserRouter: ({ children }) => <div>{children}</div>,
  };
}, { virtual: true });
