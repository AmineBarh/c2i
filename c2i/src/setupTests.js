import '@testing-library/jest-dom';

// Mocks for JSDOM
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

window.scrollTo = jest.fn();
global.scrollTo = jest.fn();

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
};

global.ResizeObserver = class ResizeObserver {
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
};

// Mock fetch
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => [],
});
window.fetch = global.fetch;

// Mock react-router-dom to bypass ESM issues
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ path, element }) => {
    // Only render the Home route (/) to avoid mounting all pages and triggering their side effects
    return path === '/' ? element : null;
  },
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
  NavLink: ({ children, to, className, ...props }) => {
    const isActive = false;
    const classes = typeof className === 'function' ? className({ isActive }) : className;
    return <a href={to} className={classes} {...props}>{typeof children === 'function' ? children({ isActive }) : children}</a>;
  },
  useLocation: () => ({ pathname: '/' }),
  useNavigate: () => jest.fn(),
  Outlet: () => null,
}), { virtual: true });

// Mock axios to bypass ESM issues
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

// Mock framer-motion to bypass ESM issues
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useInView: () => true,
  useAnimation: () => ({ start: jest.fn() }),
  useMotionValue: (v) => ({ set: jest.fn(), on: jest.fn() }),
  useSpring: () => ({ on: jest.fn() }),
}), { virtual: true });

// Mock other ESM libraries
jest.mock('react-fast-marquee', () => ({ children }) => <div>{children}</div>, { virtual: true });
jest.mock('react-rotating-text', () => () => <span>Rotating Text</span>, { virtual: true });
