// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

// Mock matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Mock scrollTo
window.scrollTo = jest.fn();

// Mock ResizeObserver
window.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
window.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
};

// Mock axios
jest.mock('axios', () => ({
  create: () => ({
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    }
  }),
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
}), { virtual: true });

// Mock react-router-dom with a functional mock router
jest.mock("react-router-dom", () => {
  const React = require('react');

  const MockRouterContext = React.createContext({ pathname: '/' });

  return {
    __esModule: true,

    MemoryRouter: ({ initialEntries = ['/'], children }) => {
      const [pathname] = React.useState(initialEntries[0]);
      return (
        <MockRouterContext.Provider value={{ pathname }}>
          {children}
        </MockRouterContext.Provider>
      );
    },

    BrowserRouter: ({ children }) => <div>{children}</div>,

    Routes: ({ children }) => {
      const { pathname } = React.useContext(MockRouterContext);
      let match = null;

      React.Children.forEach(children, (child) => {
        if (match) return;
        if (React.isValidElement(child) && child.props.path === pathname) {
          match = child;
        }
      });
      return match || null;
    },

    Route: ({ element }) => element,

    NavLink: ({ to, className, children }) => {
      const isActive = false;
      const resolvedClassName = typeof className === 'function' ? className({ isActive }) : className;
      const resolvedChildren = typeof children === 'function' ? children({ isActive }) : children;
      return <a href={to} className={resolvedClassName}>{resolvedChildren}</a>;
    },

    Link: ({ to, children, className, ...props }) => {
       const resolvedClassName = typeof className === 'function' ? className({ isActive: false }) : className;
       return <a href={to} className={resolvedClassName} {...props}>{children}</a>;
    },

    useLocation: () => React.useContext(MockRouterContext),
    useNavigate: () => jest.fn(),
  };
}, { virtual: true });
