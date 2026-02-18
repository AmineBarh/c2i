import { render, screen, fireEvent } from '@testing-library/react';
import HomeContactForm from './HomeContactForm';

// Mock environment variable
const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules(); // Most important - it clears the cache
  process.env = { ...OLD_ENV }; // Make a copy
  process.env.REACT_APP_API_URL = 'http://localhost:5000';
});

afterAll(() => {
  process.env = OLD_ENV; // Restore old environment
});

test('renders contact form fields', () => {
  render(<HomeContactForm />);

  // Use regex for flexible matching
  expect(screen.getByLabelText(/Nom/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Numéro de téléphone/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Envoyer le message/i })).toBeInTheDocument();
});

test('updates input values on change', () => {
  render(<HomeContactForm />);

  const nameInput = screen.getByLabelText(/Nom/i);
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  expect(nameInput.value).toBe('John Doe');
});
