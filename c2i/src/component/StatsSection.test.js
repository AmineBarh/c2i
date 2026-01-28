import { render, screen } from '@testing-library/react';
import StatsSection from './StatsSection';

describe('StatsSection', () => {
  test('renders stats correctly', () => {
    render(<StatsSection />);

    expect(screen.getByText('Clients satisfaits')).toBeInTheDocument();
    expect(screen.getByText('Projets réalisés')).toBeInTheDocument();
    expect(screen.getByText('Taux de réussite')).toBeInTheDocument();
  });
});
