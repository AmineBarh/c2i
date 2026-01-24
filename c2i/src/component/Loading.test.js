import { render } from '@testing-library/react';
import Loading from './Loading';

test('renders loading spinner', () => {
  const { container } = render(<Loading />);
  const spinner = container.querySelector('.animate-spin');
  expect(spinner).toBeInTheDocument();
  expect(spinner).toHaveClass('border-bluec2i-500');
});
