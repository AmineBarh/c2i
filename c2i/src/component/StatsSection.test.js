import React from 'react';
import { render, screen } from '@testing-library/react';
import StatsSection from './StatsSection';

test('renders StatsSection component', () => {
  render(<StatsSection />);

  const clientsElement = screen.getByText(/Clients satisfaits/i);
  const projectsElement = screen.getByText(/Projets réalisés/i);
  const successRateElement = screen.getByText(/Taux de réussite/i);

  expect(clientsElement).toBeInTheDocument();
  expect(projectsElement).toBeInTheDocument();
  expect(successRateElement).toBeInTheDocument();
});
