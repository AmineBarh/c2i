import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home link and lazy loaded content', async () => {
  render(<App />);
  const linkElements = screen.getAllByText(/ACCUEIL/i);
  expect(linkElements[0]).toBeInTheDocument();

  // Verify lazy loaded content appears (this waits for Suspense)
  const homeText = await screen.findByText(/Solutions expertes en/i);
  expect(homeText).toBeInTheDocument();
});
