import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Error404 } from './error-404';

describe('Error404 Component', () => {
  it('should render the 404 error message correctly', () => {
    render(
      <MemoryRouter>
        <Error404 />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('404')).toHaveClass('text-4xl', 'font-bold');

    expect(screen.getByText('Página não encontrada.')).toBeInTheDocument();
    expect(screen.getByText('Página não encontrada.')).toHaveClass(
      'text-lg',
      'text-muted-foreground'
    );

    const linkElement = screen.getByRole('link', {
      name: 'Voltar para o início',
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
