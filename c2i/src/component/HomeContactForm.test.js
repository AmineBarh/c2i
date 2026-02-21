import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomeContactForm from './HomeContactForm';

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;
window.fetch = mockFetch;

// Mock window.alert
window.alert = jest.fn();

describe('HomeContactForm', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    window.alert.mockClear();

    // Default success implementation
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: 'Success' }),
    });
  });

  test('renders contact form correctly', () => {
    render(<HomeContactForm />);
    expect(screen.getByLabelText(/^Nom$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Numéro de téléphone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Envoyer le message/i })).toBeInTheDocument();
  });

  test('updates input values', () => {
    render(<HomeContactForm />);

    const nameInput = screen.getByLabelText(/^Nom$/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');

    const emailInput = screen.getByLabelText(/^Email$/i);
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(emailInput.value).toBe('john@example.com');
  });

  test('submits form successfully', async () => {
    render(<HomeContactForm />);

    fireEvent.change(screen.getByLabelText(/^Nom$/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Numéro de téléphone/i), { target: { value: '12345678' } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello' } });

    fireEvent.click(screen.getByRole('button', { name: /Envoyer le message/i }));

    expect(screen.getByText(/Envoi.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/contact'),
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          phone: '12345678',
          email: 'john@example.com',
          message: 'Hello',
        }),
      })
    );

    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Message sent successfully!');
    });

    // Check if form is reset
    expect(screen.getByLabelText(/^Nom$/i).value).toBe('');
  });

  test('handles submission error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Error occurred' }),
    });

    render(<HomeContactForm />);

    fireEvent.change(screen.getByLabelText(/^Nom$/i), { target: { value: 'John Doe' } });
    fireEvent.click(screen.getByRole('button', { name: /Envoyer le message/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Error occurred');
    });
  });
});
