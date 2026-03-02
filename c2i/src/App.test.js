import { render, screen } from '@testing-library/react';
import App from './App';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: () => <div>Route</div>,
  NavLink: ({ children }) => <div>{typeof children === 'function' ? children({ isActive: false }) : children}</div>,
  Link: ({ children }) => <div>{children}</div>,
  useLocation: () => ({ pathname: '/' }),
  useNavigate: () => jest.fn(),
}), { virtual: true });

// Mock axios
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
  get: jest.fn(() => Promise.resolve({ data: {} })),
}));

// Mock ScrollToTop
jest.mock('./component/ScrollToTop', () => () => <div>ScrollToTop</div>);

// Mock other components that might cause trouble or are heavy
jest.mock('react-fast-marquee', () => ({ children }) => <div>{children}</div>);
jest.mock('react-rotating-text', () => () => <div>RotatingText</div>);

test('renders Navbar with navigation items', () => {
  render(<App />);
  const homeLinks = screen.getAllByText(/ACCUEIL/i);
  expect(homeLinks.length).toBeGreaterThan(0);
});
