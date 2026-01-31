// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock window functions not present in JSDOM
window.scrollTo = jest.fn();
global.scrollTo = jest.fn();
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

const IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
window.IntersectionObserver = IntersectionObserver;

// Mock global fetch
const mockFetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
    ok: true,
    text: () => Promise.resolve(""),
  })
);
global.fetch = mockFetch;
window.fetch = mockFetch;

// Mock external libraries that might cause issues in JSDOM/Jest environment
jest.mock('react-fast-marquee', () => ({ children }) => <div>{children}</div>);
jest.mock('react-rotating-text', () => () => <div>Rotating Text</div>);
jest.mock('framer-motion', () => ({
  useInView: () => true,
  useMotionValue: () => ({ set: jest.fn(), on: jest.fn() }),
  useSpring: () => ({ on: jest.fn() }),
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}), { virtual: true });
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

// Manual mock for react-router-dom due to ESM incompatibility with Jest 27
global.mockCurrentPath = '/';
jest.mock('react-router-dom', () => {
  return {
    BrowserRouter: ({ children }) => <div>{children}</div>,
    MemoryRouter: ({ children, initialEntries }) => {
      if (initialEntries && initialEntries.length > 0) {
        global.mockCurrentPath = initialEntries[0];
      }
      return <div>{children}</div>;
    },
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ path, element }) => {
       // Simple matching logic
       return path === global.mockCurrentPath ? <div>{element}</div> : null;
    },
    NavLink: ({ children, className, to }) => {
      const isActive = false;
      const finalClassName = typeof className === 'function' ? className({ isActive }) : className;
      const renderedChildren = typeof children === 'function' ? children({ isActive }) : children;
      return <a href={to} className={finalClassName}>{renderedChildren}</a>;
    },
    Link: ({ children, to, className }) => <a href={to} className={className}>{children}</a>,
    useLocation: () => ({ pathname: global.mockCurrentPath }),
    useNavigate: () => jest.fn(),
  };
}, { virtual: true });
