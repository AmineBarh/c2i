import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

beforeAll(() => {
  const mockFetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
      ok: true,
      text: () => Promise.resolve(""),
    })
  );
  global.fetch = mockFetch;
  window.fetch = mockFetch;

  process.env.REACT_APP_API_URL = 'http://localhost';
});

test('renders Navbar with ACCUEIL link', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Wait for the element to appear
  const linkElements = await screen.findAllByText(/ACCUEIL/i);
  expect(linkElements.length).toBeGreaterThan(0);
  expect(linkElements[0]).toBeInTheDocument();
});
