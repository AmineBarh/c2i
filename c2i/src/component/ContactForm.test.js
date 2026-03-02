import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from './ContactForm';

// Mock fetch
global.fetch = jest.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    fetch.mockClear();
    process.env.REACT_APP_API_URL = 'http://localhost:5000';
  });

  test('renders contact form fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/Nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Numéro de téléphone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Envoyer le message/i })).toBeInTheDocument();
  });

  test('updates input values on change', () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/Nom/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');
  });

  test('submits form with correct data', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Success' }),
    });

    // Mock window.alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Nom/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Numéro de téléphone/i), { target: { value: '12345678' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello' } });

    fireEvent.click(screen.getByRole('button', { name: /Envoyer le message/i }));

    expect(screen.getByText(/Envoi.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:5000/api/contact',
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
    });

    await waitFor(() => {
       expect(alertMock).toHaveBeenCalledWith('Message sent successfully!');
    });

    alertMock.mockRestore();
  });
});
