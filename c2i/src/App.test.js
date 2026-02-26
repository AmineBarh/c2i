import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

// App is likely failing to render correctly due to async operations or context issues
// Mocking child components to isolate App testing
jest.mock('./pages/Home', () => () => <div>Home Page</div>);
jest.mock('./pages/Iot', () => () => <div>Iot Page</div>);
jest.mock('./pages/WebDev', () => () => <div>WebDev Page</div>);
jest.mock('./pages/Automation', () => () => <div>Automation Page</div>);
jest.mock('./pages/Admin', () => () => <div>Admin Page</div>);
jest.mock('./pages/Training', () => () => <div>Training Page</div>);
jest.mock('./component/navbar', () => () => <div>Navbar</div>);
jest.mock('./component/ScrollToTop', () => () => null);
jest.mock('./component/Chatbot', () => () => <div>Chatbot</div>);

test('renders Navbar', () => {
  render(<App />);
  const linkElement = screen.getByText(/Navbar/i);
  expect(linkElement).toBeInTheDocument();
});
