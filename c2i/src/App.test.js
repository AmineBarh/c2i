import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders App component without crashing', async () => {
  render(<App />);
  // "ACCUEIL" appears multiple times (desktop and mobile menu).
  // GetAllByText will return an array, we just need to ensure at least one exists.
  const navbarElements = screen.getAllByText(/ACCUEIL/i);
  expect(navbarElements.length).toBeGreaterThan(0);
});
