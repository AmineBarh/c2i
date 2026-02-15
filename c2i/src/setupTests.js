// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';

jest.mock('react-router-dom', () => {
  const React = require('react');
  return {
    MemoryRouter: ({ children }) => <div>{children}</div>,
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
    Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
    NavLink: ({ children, to, ...props }) => <a href={to} {...props}>{typeof children === 'function' ? children({ isActive: false }) : children}</a>,
    useLocation: () => ({ pathname: '/' }),
    useNavigate: () => jest.fn(),
    Outlet: () => null,
  };
}, { virtual: true });

jest.mock('axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
  create: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    }
  })),
}));

window.scrollTo = jest.fn();
