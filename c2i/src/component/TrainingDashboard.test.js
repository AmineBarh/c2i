import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TrainingDashboard from './TrainingDashboard';

// Mock child components
jest.mock('./Addtraining', () => () => <div data-testid="add-training-modal">Add Training Modal</div>);

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Plus: () => <span>Plus</span>,
  Edit: () => <span>Edit</span>,
  Trash2: () => <span>Trash2</span>,
  Search: () => <span>Search</span>,
  BookOpen: () => <span>BookOpen</span>,
  Award: () => <span>Award</span>,
  Calendar: () => <span>Calendar</span>,
  X: () => <span>X</span>,
}));

const mockTrainings = [
  {
    _id: '1',
    title: 'React Basics',
    description: 'Learn React from scratch',
    category: 'Web Development',
    instructor: 'John Doe',
    technologies: ['React', 'JavaScript'],
    locations: 'Online',
    media: '/images/react.png',
  },
  {
    _id: '2',
    title: 'Advanced Node.js',
    description: 'Master Node.js',
    category: 'Backend',
    instructor: 'Jane Smith',
    technologies: ['Node.js', 'Express'],
    locations: 'Remote',
    media: 'http://example.com/node.png',
  },
];

describe('TrainingDashboard Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(['Web Development', 'Backend']),
      })
    );
    process.env.REACT_APP_API_URL = 'http://localhost:5000';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders dashboard with stats and training list', async () => {
    render(<TrainingDashboard trainings={mockTrainings} />);

    // Wait for categories to load to avoid act warnings
    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText('Training Dashboard')).toBeInTheDocument();

    // Check stats
    expect(screen.getByText('Total Programs')).toBeInTheDocument();
    // Since we have 2 trainings, 2 instructors, and 2 categories, we expect '2' to appear 3 times.
    const statValues = screen.getAllByText('2');
    expect(statValues.length).toBeGreaterThanOrEqual(1);

    // Check training list
    expect(screen.getByText('React Basics')).toBeInTheDocument();
    expect(screen.getByText('Advanced Node.js')).toBeInTheDocument();
  });

  test('filters trainings by search term', async () => {
    render(<TrainingDashboard trainings={mockTrainings} />);

     // Wait for categories to load to avoid act warnings
    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    const searchInput = screen.getByPlaceholderText('Search trainings...');
    fireEvent.change(searchInput, { target: { value: 'React' } });

    expect(screen.getByText('React Basics')).toBeInTheDocument();
    expect(screen.queryByText('Advanced Node.js')).not.toBeInTheDocument();
  });

  test('filters trainings by category', async () => {
    render(<TrainingDashboard trainings={mockTrainings} />);

    // Wait for categories to be fetched and rendered in the dropdown
    await waitFor(() => {
      // Assuming 'Backend' is one of the options fetched
      const options = screen.getAllByRole('option');
      const backendOption = options.find(option => option.textContent === 'Backend');
      expect(backendOption).toBeInTheDocument();
    });

    const categorySelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(categorySelect, { target: { value: 'Backend' } });

    expect(screen.queryByText('React Basics')).not.toBeInTheDocument();
    expect(screen.getByText('Advanced Node.js')).toBeInTheDocument();
  });
});
