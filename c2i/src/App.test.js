import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navbar with ACCUEIL', () => {
  render(<App />);
  const linkElements = screen.getAllByText(/ACCUEIL/i);
  expect(linkElements.length).toBeGreaterThan(0);
});
