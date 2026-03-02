// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock react-router-dom due to ESM/Jest 27 incompatibility
jest.mock('react-router-dom', () => {
  return {
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
    useNavigate: () => jest.fn(),
    useLocation: () => ({ pathname: '/' }),
    Link: ({ children, to }) => <a href={to}>{children}</a>,
    NavLink: ({ children, to, className }) => {
      const classStr = typeof className === 'function' ? className({ isActive: false }) : className;
      return <a href={to} className={classStr}>{typeof children === 'function' ? children({ isActive: false }) : children}</a>;
    }
  };
}, { virtual: true });
