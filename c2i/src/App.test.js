import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

// Mock `matchMedia` since it's used in some components but not available in Jest environment
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

test('renders home page content', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Use findByText to wait for the lazy-loaded component to appear
  const element = await screen.findByText(/Solutions expertes en/i);
  expect(element).toBeInTheDocument();
});
