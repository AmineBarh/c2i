const React = require('react');

module.exports = {
  BrowserRouter: ({ children }) => React.createElement('div', null, children),
  Routes: ({ children }) => React.createElement('div', null, children),
  Route: ({ element }) => React.createElement('div', null, element),
  Link: ({ children }) => React.createElement('a', null, children),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  MemoryRouter: ({ children }) => React.createElement('div', null, children),
};
