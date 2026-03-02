// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Fully mock react-router-dom without requireActual
jest.mock('react-router-dom', () => ({
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
  NavLink: ({ children }) => (typeof children === 'function' ? children({ isActive: false }) : children),
  Link: ({ children }) => <div>{children}</div>,
  BrowserRouter: ({ children }) => <div>{children}</div>,
  useLocation: () => ({ pathname: '/' }),
  useNavigate: () => jest.fn(),
  useHref: () => '',
  useLinkClickHandler: () => jest.fn(),
  useMatch: () => null,
  matchPath: () => null,
}), { virtual: true });

// Mock axios to avoid ESM issues
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(() => ({
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
  })),
}), { virtual: true });

// Mock react-markdown
jest.mock('react-markdown', () => ({ children }) => <div>{children}</div>, { virtual: true });

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Bot: () => <div>BotIcon</div>,
  Send: () => <div>SendIcon</div>,
  X: () => <div>XIcon</div>,
  Menu: () => <div>MenuIcon</div>,
  ChevronDown: () => <div>ChevronDownIcon</div>,
  Loader2: () => <div>Loader2Icon</div>,
  MessageCirclePlus: () => <div>MessageCirclePlusIcon</div>,
}), { virtual: true });

// Mock images
jest.mock('./images/c2o.png', () => 'c2o.png', { virtual: true });
