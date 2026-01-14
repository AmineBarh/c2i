import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: ({ element }) => <div data-testid="route">{element}</div>,
  NavLink: ({ children }) => <a>{children}</a>,
  useLocation: () => ({ pathname: '/' }),
  Link: ({ children }) => <a>{children}</a>,
  useNavigate: () => jest.fn(),
}), { virtual: true });

// Mock components
jest.mock('./component/navbar', () => () => <div>Navbar</div>);
jest.mock('./component/ScrollToTop', () => () => <div>ScrollToTop</div>);
jest.mock('./component/Chatbot', () => () => <div>Chatbot</div>);
jest.mock('./component/Loading', () => () => <div>Loading...</div>);

// Mock pages
jest.mock('./pages/Home', () => () => <div>Home Page</div>);
jest.mock('./pages/Iot', () => () => <div>Iot Page</div>);
jest.mock('./pages/WebDev', () => () => <div>WebDev Page</div>);
jest.mock('./pages/Automation', () => () => <div>Automation Page</div>);
jest.mock('./pages/Admin', () => () => <div>Admin Page</div>);
jest.mock('./pages/Training', () => () => <div>Training Page</div>);

test('renders app and routes', async () => {
  render(<App />);

  expect(screen.getByText('Navbar')).toBeInTheDocument();
  expect(screen.getByText('Chatbot')).toBeInTheDocument();

  // Wait for lazy loaded components
  await waitFor(() => {
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
