import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock Chatbot BEFORE importing App to avoid axios ESM issues
jest.mock('./component/Chatbot', () => () => <div>Chatbot Mock</div>);

// Mock react-router-dom to bypass ESM resolution issues with Jest 27
jest.mock('react-router-dom', () => ({
  Routes: ({ children }) => <div>{children}</div>,
  Route: () => null,
  NavLink: ({ children, className }) => {
    const isActive = false;
    const content = typeof children === 'function' ? children({ isActive }) : children;
    const classes = typeof className === 'function' ? className({ isActive }) : className;
    return <a href="#" className={classes}>{content}</a>;
  },
  useLocation: () => ({ pathname: '/' }),
  BrowserRouter: ({ children }) => <div>{children}</div>,
}), { virtual: true });

import App from './App';

// Mock window.scrollTo
beforeAll(() => {
  window.scrollTo = jest.fn();
});

test('renders App with Navbar', async () => {
  render(<App />);
  // Use findAllByText because "ACCUEIL" appears in both desktop and mobile menus
  const linkElements = await screen.findAllByText(/ACCUEIL/i);
  expect(linkElements.length).toBeGreaterThan(0);
});
