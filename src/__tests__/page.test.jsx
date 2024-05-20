import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', { level: 1 });
    const link = screen.getByRole('link', { name: 'About' });

    expect(heading).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });
});
