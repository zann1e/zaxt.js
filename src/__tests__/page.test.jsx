import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Logo from '../components/logo';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Logo />);

    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
  });
});
