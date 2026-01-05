import React from 'react';
import { render, screen } from '@testing-library/react';
import StatsSection from './StatsSection';

// Mock the CountUp component to avoid framer-motion issues in tests and simplify output
jest.mock('../blocks/CountUp/CountUp', () => {
  return function MockCountUp({ to }) {
    return <span>{to}</span>;
  };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Users: () => <div data-testid="icon-users" />,
  Award: () => <div data-testid="icon-award" />,
  TrendingUp: () => <div data-testid="icon-trending-up" />,
}));

describe('StatsSection', () => {
  test('renders all stats correctly', () => {
    render(<StatsSection />);

    // Check for text content
    expect(screen.getByText('Clients satisfaits')).toBeInTheDocument();
    expect(screen.getByText('Projets réalisés')).toBeInTheDocument();
    expect(screen.getByText('Taux de réussite')).toBeInTheDocument();

    // Check for mocked CountUp values
    expect(screen.getByText('150')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();

    // Check for icons
    expect(screen.getByTestId('icon-users')).toBeInTheDocument();
    expect(screen.getByTestId('icon-award')).toBeInTheDocument();
    expect(screen.getByTestId('icon-trending-up')).toBeInTheDocument();
  });
});
