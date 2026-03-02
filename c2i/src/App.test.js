import { render, screen, waitFor } from '@testing-library/react';
import React, { Suspense } from 'react';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Routes: ({ children }) => <div>{children}</div>,
  Route: () => <div>Route</div>,
  Link: ({ children }) => <div>{children}</div>,
  BrowserRouter: ({ children }) => <div>{children}</div>,
  NavLink: ({ children }) => <div>{typeof children === 'function' ? children({ isActive: false }) : children}</div>,
  useLocation: () => ({ pathname: '/' }),
  useNavigate: () => jest.fn(),
}));

// Mock window.scrollTo
window.scrollTo = jest.fn();

// Mock Axios
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
  get: jest.fn(() => Promise.resolve({ data: {} })),
}));

// Mock other dependencies
jest.mock('react-rotating-text', () => () => <div>Rotating Text</div>);
jest.mock('react-fast-marquee', () => ({ children }) => <div>{children}</div>);
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children }) => <div>{children}</div>,
  },
  useInView: () => false,
  useAnimation: () => ({ start: jest.fn() }),
}));

// Import App after mocks
import App from './App';

test('renders navbar and main content without crashing', async () => {
  render(<App />);

  // Navbar contains "ACCUEIL" - getAllByText because it might appear in mobile menu too
  const homeLinks = screen.getAllByText(/ACCUEIL/i);
  expect(homeLinks.length).toBeGreaterThan(0);

  const automationLinks = screen.getAllByText(/AUTOMATISATION/i);
  expect(automationLinks.length).toBeGreaterThan(0);
});
