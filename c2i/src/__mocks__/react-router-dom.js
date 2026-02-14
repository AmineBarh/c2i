import React, { createContext, useContext } from 'react';

const LocationContext = createContext({ pathname: '/' });

export const MemoryRouter = ({ initialEntries = ['/'], children }) => {
  const pathname = initialEntries[0];
  return (
    <LocationContext.Provider value={{ pathname }}>
      {children}
    </LocationContext.Provider>
  );
};

export const Routes = ({ children }) => {
  const { pathname } = useContext(LocationContext);
  let match = null;

  React.Children.forEach(children, (child) => {
    if (!match && React.isValidElement(child)) {
      const { path, element } = child.props;
      if (path === pathname) {
        match = element;
      }
    }
  });

  return match || null;
};

export const Route = () => null;

export const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;

export const NavLink = ({ to, children, className, ...props }) => {
  const { pathname } = useContext(LocationContext);
  const isActive = pathname === to;

  const resolvedClassName = typeof className === 'function'
    ? className({ isActive })
    : className;

  const resolvedChildren = typeof children === 'function'
    ? children({ isActive })
    : children;

  return <a href={to} className={resolvedClassName} {...props}>{resolvedChildren}</a>;
};

export const useLocation = () => useContext(LocationContext);
export const useNavigate = () => jest.fn();
