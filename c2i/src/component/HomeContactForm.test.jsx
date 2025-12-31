import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomeContactForm from './HomeContactForm';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Success' }),
  })
);

describe('HomeContactForm', () => {
  beforeEach(() => {
    fetch.mockClear();
    // Mock alert
    window.alert = jest.fn();
  });

  test('renders contact form fields', () => {
    render(<HomeContactForm />);
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

  test('submits form with correct data', async () => {
    render(<HomeContactForm />);

    fireEvent.change(screen.getByLabelText(/Nom/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Numéro de téléphone/i), { target: { value: '123456789' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello' } });

    fireEvent.click(screen.getByRole('button', { name: /Envoyer le message/i }));

    expect(screen.getByText(/Envoi.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/api/contact`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          phone: '123456789',
          email: 'test@example.com',
          message: 'Hello',
        }),
      })
    );
  });
});
