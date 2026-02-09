
const React = require('react');

const mockUseLocation = jest.fn(() => ({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: 'default'
}));

const mockUseNavigate = jest.fn();

module.exports = {
  __esModule: true,
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
  NavLink: ({ children, to, className, ...props }) => {
      const active = false;
      let finalClassName = className;
      if (typeof className === 'function') {
        finalClassName = className({ isActive: active });
      }

      if (typeof children === 'function') {
          return <a href={to} className={finalClassName} {...props}>{children({ isActive: active })}</a>;
      }
      return <a href={to} className={finalClassName} {...props}>{children}</a>;
  },
  useLocation: mockUseLocation,
  useNavigate: mockUseNavigate,
  MemoryRouter: ({ children }) => <div>{children}</div>,
};
