import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App with Navbar', async () => {
  render(<App />);
  const navElements = await screen.findAllByText(/ACCUEIL/i);
  expect(navElements.length).toBeGreaterThan(0);
  expect(navElements[0]).toBeInTheDocument();
});
