// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

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
      response: { use: jest.fn(), eject: jest.fn() },
    },
  })),
}));

// Mock react-router-dom v7
jest.mock('react-router-dom', () => {
  const React = require('react');
  return {
    __esModule: true,
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{React.Children.toArray(children)[0]}</div>, // Only render first route (Home)
    Route: ({ element }) => element,
    Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
    NavLink: ({ children, to, className: classNameProp, ...props }) => {
      // Handle function children for NavLink
      const content = typeof children === 'function' ? children({ isActive: false, isPending: false }) : children;
      // Handle className function
      const className = typeof classNameProp === 'function' ? classNameProp({ isActive: false, isPending: false }) : classNameProp;
      return <a href={to} className={className} {...props}>{content}</a>;
    },
    useNavigate: () => jest.fn(),
    useLocation: () => ({ pathname: '/' }),
    useParams: () => ({}),
    MemoryRouter: ({ children }) => <div>{children}</div>,
  };
}, { virtual: true });

// Mock other potential ESM packages
jest.mock('react-fast-marquee', () => ({ children }) => <div>{children}</div>, { virtual: true });
jest.mock('react-rotating-text', () => () => <div>Running Text</div>, { virtual: true });

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
  useInView: () => true,
  useMotionValue: (v) => ({ set: jest.fn(), on: jest.fn(() => jest.fn()) }),
  useSpring: (v) => ({ on: jest.fn(() => jest.fn()) }),
  AnimatePresence: ({ children }) => <>{children}</>,
}), { virtual: true });


// Mock IntersectionObserver
const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();
window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
  disconnect,
}));

// Mock ResizeObserver
window.ResizeObserver = jest.fn(() => ({
  observe,
  unobserve,
  disconnect,
}));

// Mock window.scrollTo
window.scrollTo = jest.fn();
