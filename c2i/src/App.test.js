import { render, screen, act } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders app home page by default', async () => {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
  });

  // Wait for the Home component to load (Suspense)
  // "Commencer" is text found on the Home page (from previous knowledge/tests)
  const startButtons = await screen.findAllByText(/Commencer/i);
  expect(startButtons.length).toBeGreaterThan(0);
});
