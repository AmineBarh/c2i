const React = require('react');

const MemoryRouter = ({ children }) => React.createElement('div', { 'data-testid': 'memory-router' }, children);
const Routes = ({ children }) => React.createElement('div', { 'data-testid': 'routes' }, children);
const Route = ({ element }) => React.createElement('div', { 'data-testid': 'route' }, element);
const Link = ({ children, to }) => React.createElement('a', { href: to }, children);
const NavLink = ({ children, to, className }) => {
  const cn = typeof className === 'function' ? className({ isActive: false }) : className;
  const child = typeof children === 'function' ? children({ isActive: false }) : children;
  return React.createElement('a', { href: to, className: cn }, child);
};

const useNavigate = () => () => {};
const useLocation = () => ({ pathname: '/' });
const useParams = () => ({});

module.exports = {
  MemoryRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
  useLocation,
  useParams,
};
