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
    instructor: 'John Doe',
    category: 'Web Development',
    technologies: ['React', 'JavaScript'],
    locations: 'Online',
    media: 'image1.jpg'
  },
  {
    _id: '2',
    title: 'Advanced Node.js',
    description: 'Master Node.js',
    instructor: 'Jane Smith',
    category: 'Backend',
    technologies: ['Node.js', 'Express'],
    locations: 'New York',
    media: 'image2.jpg'
  }
];

const mockHandlers = {
  handleCreateTraining: jest.fn(),
  handleUpdateTraining: jest.fn(),
  handleDeleteTraining: jest.fn(),
};

describe('TrainingDashboard', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(['Web Development', 'Backend']),
      })
    );
    process.env.REACT_APP_API_URL = 'http://test-api.com';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders dashboard with stats and trainings', async () => {
    render(<TrainingDashboard trainings={mockTrainings} {...mockHandlers} />);

    // Wait for categories to load to avoid act warnings
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    // Check stats
    expect(screen.getByText('Total Programs')).toBeInTheDocument();
    expect(screen.getAllByText('2').length).toBeGreaterThan(0);

    // Check trainings list
    expect(screen.getByText('React Basics')).toBeInTheDocument();
    expect(screen.getByText('Advanced Node.js')).toBeInTheDocument();
  });

  test('filters trainings by search term', async () => {
    render(<TrainingDashboard trainings={mockTrainings} {...mockHandlers} />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const searchInput = screen.getByPlaceholderText('Search trainings...');
    fireEvent.change(searchInput, { target: { value: 'React' } });

    expect(screen.getByText('React Basics')).toBeInTheDocument();
    expect(screen.queryByText('Advanced Node.js')).not.toBeInTheDocument();
  });

  test('filters trainings by category', async () => {
    render(<TrainingDashboard trainings={mockTrainings} {...mockHandlers} />);

    // Wait for categories to load
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    // Ensure options are rendered inside the select
    const categorySelect = screen.getByRole('combobox');
    await waitFor(() => {
        expect(categorySelect).toHaveTextContent('Backend');
    });

    fireEvent.change(categorySelect, { target: { value: 'Backend' } });

    await waitFor(() => {
        expect(screen.getByText('Advanced Node.js')).toBeInTheDocument();
    });

    expect(screen.queryByText('React Basics')).not.toBeInTheDocument();
  });
});
