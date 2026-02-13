// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock react-router-dom with basic routing logic to avoid rendering all routes simultaneously
// and to bypass ESM incompatibility issues with Jest.
jest.mock('react-router-dom', () => {
  const React = require('react');
  // Create a simple context to hold the current path
  const MockRouterContext = React.createContext('/');

  const MemoryRouter = ({ children, initialEntries }) => {
    const path = initialEntries && initialEntries.length > 0 ? initialEntries[0] : '/';
    return React.createElement(MockRouterContext.Provider, { value: path }, children);
  };

  const Routes = ({ children }) => <div>{children}</div>;

  const Route = ({ path, element }) => {
    const currentPath = React.useContext(MockRouterContext);

    // Logic to determine if the route should render
    // 1. Exact match
    if (path === currentPath) {
      return element;
    }
    // 2. Root match
    if ((path === '/' || path === '' || path === undefined) && currentPath === '/') {
      return element;
    }
    // 3. Catch-all (simplified) - usually '*' but we might not want to render 404 in tests unless checking for it.
    if (path === '*') {
       // Only render catch-all if explicitly testing for it or if nothing else matched?
       // For now, let's render it if currentPath is not handled by others?
       // Difficult to know without more complex logic.
       // Let's assume for our tests we target specific routes.
       return null;
    }

    return null;
  };

  return {
    __esModule: true,
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes,
    Route,
    Link: ({ children }) => React.createElement('a', { href: '#' }, children),
    NavLink: ({ children }) => React.createElement('a', { href: '#' }, typeof children === 'function' ? children({ isActive: false }) : children),
    useLocation: () => ({ pathname: '/' }),
    useNavigate: () => jest.fn(),
    MemoryRouter,
    Outlet: () => null,
  };
}, { virtual: true });

// Mock react-fast-marquee
jest.mock('react-fast-marquee', () => ({ children }) => <div>{children}</div>, { virtual: true });

// Mock react-rotating-text
jest.mock('react-rotating-text', () => () => <span>Rotating Text</span>, { virtual: true });

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({ data: {} })),
      post: jest.fn(() => Promise.resolve({ data: {} })),
      put: jest.fn(() => Promise.resolve({ data: {} })),
      delete: jest.fn(() => Promise.resolve({ data: {} })),
      interceptors: {
          request: { use: jest.fn(), eject: jest.fn() },
          response: { use: jest.fn(), eject: jest.fn() }
      }
  })),
}), { virtual: true });

// Mock window.scrollTo
window.scrollTo = jest.fn();

// Mock global.fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

// Mock IntersectionObserver
class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = IntersectionObserver;

// Mock matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Mock SVG methods
global.SVGElement.prototype.getBBox = () => ({
  x: 0,
  y: 0,
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
});
