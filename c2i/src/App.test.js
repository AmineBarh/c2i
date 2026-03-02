import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import React from 'react';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  NavLink: ({ children, to, className }) => {
    let content = typeof children === 'function' ? children({ isActive: false }) : children;
    let classNameValue = typeof className === 'function' ? className({ isActive: false }) : className;
    return <a href={to} className={classNameValue}>{content}</a>;
  },
  useLocation: () => ({ pathname: '/' }),
  useNavigate: jest.fn(),
}), { virtual: true });

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

// Mock react-fast-marquee
jest.mock('react-fast-marquee', () => ({ children }) => <div>{children}</div>);

// Mock react-rotating-text
jest.mock('react-rotating-text', () => () => <div>Text</div>);

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ArrowRight: () => <span>ArrowRight</span>,
  Cpu: () => <span>Cpu</span>,
  Globe: () => <span>Globe</span>,
  Cog: () => <span>Cog</span>,
  Users: () => <span>Users</span>,
  Award: () => <span>Award</span>,
  TrendingUp: () => <span>TrendingUp</span>,
  Mail: () => <span>Mail</span>,
  Phone: () => <span>Phone</span>,
  MapPin: () => <span>MapPin</span>,
  Bot: () => <span>Bot</span>,
  BookOpen: () => <span>BookOpen</span>,
  Menu: () => <span>Menu</span>,
  X: () => <span>X</span>,
  CheckCircle: () => <span>CheckCircle</span>,
  Send: () => <span>Send</span>,
  Loader2: () => <span>Loader2</span>,
  MessageCirclePlus: () => <span>MessageCirclePlus</span>,
  ChevronDown: () => <span>ChevronDown</span>,
  CircleCheckBig: () => <span>CircleCheckBig</span>,
  MoveRight: () => <span>MoveRight</span>,
  Wifi: () => <span>Wifi</span>,
  Shield: () => <span>Shield</span>,
  BarChart3: () => <span>BarChart3</span>,
}));

// Mock window.scrollTo
window.scrollTo = jest.fn();

// Mock the components that are causing issues
jest.mock('./pages/Iot', () => () => <div>Iot Page</div>);
jest.mock('./pages/Home', () => () => <div>Home Page</div>);
jest.mock('./pages/WebDev', () => () => <div>WebDev Page</div>);
jest.mock('./pages/Automation', () => () => <div>Automation Page</div>);
jest.mock('./pages/Admin', () => () => <div>Admin Page</div>);
jest.mock('./pages/Training', () => () => <div>Training Page</div>);


test('renders App with Navbar and Chatbot', async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <App />
    </React.Suspense>
  );

  // Wait for something known to be in the Navbar or Chatbot to be present.
  await waitFor(() => {
    // Check for "ACCUEIL" which is in the Navbar.
    // Use getAllByText because it might appear multiple times (desktop and mobile menu)
    const elements = screen.getAllByText('ACCUEIL');
    expect(elements.length).toBeGreaterThan(0);
  });
});
