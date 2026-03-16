// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  NavLink: ({ children, to, className }) => {
    const isActive = false;
    const computedClassName = typeof className === 'function' ? className({ isActive }) : className;
    return <a href={to} className={computedClassName}>{typeof children === 'function' ? children({ isActive }) : children}</a>;
  },
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
  BrowserRouter: ({ children }) => <div>{children}</div>,
  MemoryRouter: ({ children }) => <div>{children}</div>,
}), { virtual: true });

jest.mock('react-fast-marquee', () => ({ children }) => <div>{children}</div>, { virtual: true });
jest.mock('react-rotating-text', () => () => <div>Rotating Text</div>, { virtual: true });

window.scrollTo = jest.fn();
global.scrollTo = jest.fn();

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = MockIntersectionObserver;
global.IntersectionObserver = MockIntersectionObserver;

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = MockResizeObserver;
global.ResizeObserver = MockResizeObserver;

window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useInView: () => true,
  useMotionValue: () => ({ get: () => 0, set: () => {}, onChange: () => {} }),
  useSpring: () => ({ get: () => 0, set: () => {}, onChange: () => {} }),
}), { virtual: true });

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
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } }
  })),
  defaults: { headers: { common: {} } }
}), { virtual: true });
