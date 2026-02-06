import '@testing-library/jest-dom';

// Mock window functions not available in JSDOM
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

window.scrollTo = jest.fn();

// Mock react-router-dom v7
jest.mock('react-router-dom', () => {
  return {
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: () => null,
    Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
    NavLink: ({ to, children, className, ...props }) => {
      const computedClassName = typeof className === 'function' ? className({ isActive: false }) : className;
      return <a href={to} className={computedClassName} {...props}>{typeof children === 'function' ? children({ isActive: false }) : children}</a>;
    },
    useLocation: () => ({ pathname: '/' }),
    useNavigate: () => jest.fn(),
  };
}, { virtual: true });

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }) => <li {...props}>{children}</li>,
    img: ({ children, ...props }) => <img {...props} />,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useInView: () => true,
  useAnimation: () => ({ start: jest.fn(), set: jest.fn() }),
  useMotionValue: (initial) => ({ set: jest.fn(), get: () => initial, on: () => () => {} }),
  useSpring: (value) => ({ on: (event, callback) => { callback(value.get()); return () => {}; } }),
}));

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(() => ({
     get: jest.fn(() => Promise.resolve({ data: [] })),
     post: jest.fn(() => Promise.resolve({ data: {} })),
     interceptors: {
       request: { use: jest.fn(), eject: jest.fn() },
       response: { use: jest.fn(), eject: jest.fn() }
     }
  })),
}));

// Mock react-fast-marquee
jest.mock('react-fast-marquee', () => ({ children }) => <div>{children}</div>);

// Mock react-rotating-text
jest.mock('react-rotating-text', () => () => <span>Rotating Text Mock</span>);

// Mock lucide-react just in case
jest.mock('lucide-react', () => new Proxy({}, {
  get: (target, prop) => (props) => <svg {...props} data-icon={prop} />
}));
