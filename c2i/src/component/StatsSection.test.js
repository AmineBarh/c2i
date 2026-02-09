import { render, screen } from '@testing-library/react';
import StatsSection from './StatsSection';

test('renders StatsSection correctly', () => {
  render(<StatsSection />);
  // Check if text is present
  expect(screen.getByText('Clients satisfaits')).toBeInTheDocument();
  expect(screen.getByText('Projets réalisés')).toBeInTheDocument();
  expect(screen.getByText('Taux de réussite')).toBeInTheDocument();
});
