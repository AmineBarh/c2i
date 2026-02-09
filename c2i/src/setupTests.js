// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock window.scrollTo
window.scrollTo = jest.fn();
global.scrollTo = jest.fn();

// Mock global fetch
global.fetch = jest.fn((url) => {
    return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
        status: 200,
        headers: new Headers(),
    });
});

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
  })),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    // add other elements as needed
  },
  useInView: () => true,
  useMotionValue: (v) => ({ set: jest.fn(), get: () => v }),
  useSpring: (v) => ({ on: jest.fn(() => jest.fn()), set: jest.fn(), get: () => v }),
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock react-fast-marquee
jest.mock('react-fast-marquee', () => {
    return function Marquee({ children }) {
        return <div>{children}</div>;
    };
});

// Mock react-rotating-text
jest.mock('react-rotating-text', () => {
    return function ReactRotatingText() {
        return <div>Rotating Text</div>;
    };
});

// Manual mock for react-router-dom v7 compatibility with Jest 27
// Using manual mocks in __mocks__ folder
jest.mock('react-router-dom');
jest.mock('react-router');
