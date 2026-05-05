import React, { Suspense } from 'react';
import { render, act, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Need to mock component implementations to avoid testing errors and rendering issues from other parts of the app
jest.mock('./component/navbar', () => () => <div data-testid="navbar" />);
jest.mock('./pages/Home', () => () => <div data-testid="home" />);
// Mock Chatbot to avoid axios ESM errors
jest.mock('./component/Chatbot', () => () => <div data-testid="chatbot" />);
// Mock ScrollToTop
jest.mock('./component/ScrollToTop', () => () => <div data-testid="scroll-to-top" />);
// Mock other route components resolving from suspense lazily, which cause act warning and test failure
jest.mock('./pages/Admin', () => () => <div data-testid="admin" />);
jest.mock('./pages/Iot', () => () => <div data-testid="iot" />);
jest.mock('./pages/Automation', () => () => <div data-testid="automation" />);
jest.mock('./pages/WebDev', () => () => <div data-testid="webdev" />);
jest.mock('./pages/Training', () => () => <div data-testid="training" />);

test('renders App successfully', async () => {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
  });
  const homeElement = screen.getByTestId('home');
  expect(homeElement).toBeInTheDocument();
});
