import '@testing-library/jest-dom';

// Mock react-router-dom to handle ESM incompatibility with Jest/CRA
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
  NavLink: ({ children, className, to }) => {
      const computedClassName = typeof className === 'function' ? className({ isActive: false }) : className;
      return <a href={to} className={computedClassName}>{typeof children === 'function' ? children({ isActive: false }) : children}</a>;
  },
  useLocation: () => ({ pathname: '/' }),
  useNavigate: () => jest.fn(),
  Outlet: () => null,
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
  }))
}));

// Mock window.scrollTo
window.scrollTo = jest.fn();

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

// Mock react-fast-marquee
jest.mock('react-fast-marquee', () => ({ children }) => <div>{children}</div>);

// Mock react-rotating-text
jest.mock('react-rotating-text', () => () => <div>Rotating Text</div>);
