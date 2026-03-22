// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

window.scrollTo = jest.fn();
global.scrollTo = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    MemoryRouter: ({ children }) => children,
    Routes: ({ children }) => children,
    Route: ({ element }) => element,
    Link: ({ children }) => children,
    useNavigate: () => jest.fn(),
    useLocation: () => ({ pathname: '/' }),
    NavLink: ({ children }) => children
  };
}, { virtual: true });

jest.mock('axios', () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    create: jest.fn()
  };
});
