import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// We need to mock the lazy loaded components because we want to test App.js routing logic,
// not the content of the pages themselves, and to avoid issues with complex children components.
// Also, waiting for real lazy components might be flaky.
jest.mock('./pages/Home', () => () => <div>Home Component</div>);
jest.mock('./pages/Iot', () => () => <div>Iot Component</div>);
jest.mock('./pages/WebDev', () => () => <div>WebDev Component</div>);
jest.mock('./pages/Automation', () => () => <div>Automation Component</div>);
jest.mock('./pages/Admin', () => () => <div>Admin Component</div>);
jest.mock('./pages/Training', () => () => <div>Training Component</div>);

// Mock Layout components to isolate App testing
jest.mock('./component/navbar', () => () => <div>Navbar</div>);
jest.mock('./component/ScrollToTop', () => () => null);
jest.mock('./component/Chatbot', () => () => <div>Chatbot</div>);

test('renders Home component on default route', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // We expect to see Navbar and Chatbot
  expect(screen.getByText('Navbar')).toBeInTheDocument();
  expect(screen.getByText('Chatbot')).toBeInTheDocument();

  // We expect Home Component to be rendered
  const homeElement = await screen.findByText('Home Component');
  expect(homeElement).toBeInTheDocument();

  // Verify other routes are NOT rendered
  expect(screen.queryByText('Iot Component')).not.toBeInTheDocument();
});

test('renders Iot component on /iot route', async () => {
  render(
    <MemoryRouter initialEntries={['/iot']}>
      <App />
    </MemoryRouter>
  );

  const iotElement = await screen.findByText('Iot Component');
  expect(iotElement).toBeInTheDocument();

  // Verify Home is NOT rendered
  expect(screen.queryByText('Home Component')).not.toBeInTheDocument();
});
