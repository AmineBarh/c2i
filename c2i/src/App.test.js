import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders home page content', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  // Wait for the Home component to load and render "Solutions expertes en"
  const textElement = await screen.findByText(/Solutions expertes en/i, {}, { timeout: 3000 });
  expect(textElement).toBeInTheDocument();
});
