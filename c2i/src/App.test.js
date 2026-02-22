import { render, screen } from '@testing-library/react';
import Navbar from './component/navbar';
import { BrowserRouter } from 'react-router-dom';

test('renders ACCUEIL link', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  const linkElements = screen.getAllByText(/ACCUEIL/i);
  expect(linkElements[0]).toBeInTheDocument();
});
