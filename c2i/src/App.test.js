import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

// Define mocks BEFORE importing App
jest.mock('react-router-dom', () => ({
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
  NavLink: ({ children, to, className }) => {
     const isActive = false;
     const content = typeof children === 'function' ? children({ isActive }) : children;
     const classNames = typeof className === 'function' ? className({ isActive }) : className;
     return <a href={to} className={classNames}>{content}</a>
  },
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useLocation: () => ({ pathname: '/' }),
  useNavigate: () => jest.fn(),
  BrowserRouter: ({ children }) => <div>{children}</div>,
  MemoryRouter: ({ children }) => <div>{children}</div>,
}), { virtual: true });

// Mock axios because it is ESM and Jest fails
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
  get: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn(),
    interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() }
    }
  })),
}));

// Now import App
import App from './App';

// Mock intersection observer
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

window.scrollTo = jest.fn();

test('renders Navbar and initial home content', async () => {
  render(
      <App />
  );

  const accueilElements = screen.getAllByText(/ACCUEIL/i);
  expect(accueilElements.length).toBeGreaterThan(0);
  expect(accueilElements[0]).toBeInTheDocument();

  const automationElements = screen.getAllByText(/AUTOMATISATION/i);
  expect(automationElements.length).toBeGreaterThan(0);
});
