import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders app with suspense fallback', async () => {
  render(<App />);
  const loadingElement = document.querySelector('.animate-spin');
  expect(loadingElement).toBeInTheDocument();
});
