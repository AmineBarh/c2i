// Manual mock for react-router-dom
module.exports = {
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  NavLink: ({ children, className }) => {
    // Handle function-as-child pattern often used in NavLink
    if (typeof children === 'function') {
      return <div>{children({ isActive: false })}</div>;
    }
    // Handle function-as-className pattern
    let computedClassName = className;
    if (typeof className === 'function') {
      computedClassName = className({ isActive: false });
    }
    return <div className={computedClassName}>{children}</div>;
  },
  Link: ({ children }) => <div>{children}</div>,
  useLocation: () => ({ pathname: '/' }),
  useNavigate: () => jest.fn(),
};
