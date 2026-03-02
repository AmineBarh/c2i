import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page content', async () => {
  render(<App />);
  const linkElement = await screen.findByText(/Solutions expertes en/i);
  expect(linkElement).toBeInTheDocument();
});
