import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));

// Mock react-router-dom with virtual: true
jest.mock('react-router-dom', () => ({
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: () => <div data-testid="route" />,
  Link: ({ children }) => <a href="#">{children}</a>,
  NavLink: ({ children }) => {
     // children can be a function in NavLink
     if (typeof children === 'function') {
         return <a href="#">{children({ isActive: false })}</a>;
     }
     return <a href="#">{children}</a>;
  },
  useLocation: () => ({ pathname: '/' }),
  useNavigate: () => jest.fn(),
  BrowserRouter: ({ children }) => <div>{children}</div>,
}), { virtual: true });

// Mock scroll to top
jest.mock('./component/ScrollToTop', () => () => null);

test('renders app without crashing', () => {
  render(<App />);
  const routesElement = screen.getByTestId('routes');
  expect(routesElement).toBeInTheDocument();
});
