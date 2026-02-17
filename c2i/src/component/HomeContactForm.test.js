import { render, screen } from '@testing-library/react';
import HomeContactForm from './HomeContactForm';

test('renders contact form fields', () => {
  render(<HomeContactForm />);

  // Check for the heading
  expect(screen.getByRole('heading', { name: /Contactez Nous/i })).toBeInTheDocument();

  // Check for input fields using labels
  // Note: getByLabelText relies on <label for="id"> matching <input id="id">
  expect(screen.getByLabelText(/^Nom$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Numéro de téléphone$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Message$/i)).toBeInTheDocument();

  // Check for the submit button
  expect(screen.getByRole('button', { name: /Envoyer le message/i })).toBeInTheDocument();
});
