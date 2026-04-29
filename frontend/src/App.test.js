import { render, screen } from '@testing-library/react';
import App from './App';

test('renders HSLU City Hotel heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /HSLU City Hotel/i });
  expect(heading).toBeInTheDocument();
});

test('renders date selection step on load', () => {
  render(<App />);
  expect(screen.getByText(/Select Your Stay Dates/i)).toBeInTheDocument();
});

test('renders Search Available Rooms button', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /Search Available Rooms/i })).toBeInTheDocument();
});
