// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
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
Element.prototype.scrollIntoView = jest.fn();

// Mock global fetch
process.env.REACT_APP_API_URL = "http://localhost:3000";
const mockFetch = jest.fn((url) => {
  console.log("Fetch called with:", url);
  return Promise.resolve({
    json: () => Promise.resolve([]),
    ok: true,
  });
});
global.fetch = mockFetch;
window.fetch = mockFetch;

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
  NavLink: ({ children, to, className, ...props }) => {
    const active = false;
    const finalClassName = typeof className === "function" ? className({ isActive: active }) : className;
    return (
      <a href={to} className={finalClassName} {...props}>
        {typeof children === "function" ? children({ isActive: active }) : children}
      </a>
    );
  },
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: "/" }),
}), { virtual: true });

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    img: ({ children, ...props }) => <img {...props} />,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useInView: () => true,
  useAnimation: () => ({ start: jest.fn() }),
  useMotionValue: (v) => ({ get: () => v, set: jest.fn(), on: jest.fn() }),
  useSpring: (v) => ({ on: jest.fn() }),
  useTransform: () => 0,
}));

// Mock other libs
jest.mock("react-fast-marquee", () => ({ children }) => <div>{children}</div>);
jest.mock("react-rotating-text", () => () => <div>Rotating Text</div>);
jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(() => ({
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    }
  }))
}), { virtual: true });
