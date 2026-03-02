// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: () => <div>Route</div>,
  NavLink: ({ children }) => <div>{typeof children === 'function' ? children({ isActive: false }) : children}</div>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
}), { virtual: true });

jest.mock('react-fast-marquee', () => ({ children }) => <div>{children}</div>);
jest.mock('react-rotating-text', () => () => <div>Text</div>);

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
}));

Object.defineProperty(window, 'scrollTo', { value: jest.fn(), writable: true });
