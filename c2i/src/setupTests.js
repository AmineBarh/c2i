import '@testing-library/jest-dom';

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

// Mock window.scrollTo
window.scrollTo = jest.fn();

// Mock axios
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
  get: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    }
  })),
}));

// Mock react-fast-marquee
jest.mock('react-fast-marquee', () => ({ children }) => <div>{children}</div>);

// Mock react-rotating-text
jest.mock('react-rotating-text', () => () => <span>Rotating Text</span>);

// Mock react-router-dom
jest.mock('react-router-dom', () => {
  return {
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
    NavLink: ({ children, to, className }) => {
        const css = typeof className === 'function' ? className({ isActive: false }) : className;
        return <a href={to} className={css}>{typeof children === 'function' ? children({ isActive: false}) : children}</a>;
    },
    useLocation: () => ({ pathname: '/' }),
    useNavigate: () => jest.fn(),
  };
}, { virtual: true });
