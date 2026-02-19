import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  const navbarElements = screen.getAllByText(/ACCUEIL/i);
  expect(navbarElements.length).toBeGreaterThan(0);
});
