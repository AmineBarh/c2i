import { render, screen } from '@testing-library/react';
import Navbar from './component/navbar';
import { MemoryRouter } from 'react-router-dom';

test('renders navbar', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Check for navbar item "ACCUEIL"
  const navLinks = screen.getAllByText(/ACCUEIL/i);
  expect(navLinks.length).toBeGreaterThan(0);
});
