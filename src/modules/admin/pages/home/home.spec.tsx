// src/app/home.test.tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './home';

describe('Home Component', () => {
  it('should render the main title and subtitle', () => {
    render(<Home />);

    // Verifica o título principal
    expect(screen.getByText('Alquimia de Frames')).toBeInTheDocument();

    // Verifica o subtítulo
    expect(
      screen.getByText('Transforme seus vídeos em frames extraordinários')
    ).toBeInTheDocument();
  });

  it('should render the decorative elements', () => {
    render(<Home />);

    // Verifica as linhas decorativas
    const lines = document.querySelectorAll('.h-1.w-8');
    expect(lines).toHaveLength(2);

    // Verifica os elementos ✧
    expect(screen.getAllByText('✧')).toHaveLength(2);
  });

  it('should render the inspirational quote', () => {
    render(<Home />);

    expect(
      screen.getByText('"Cada frame é um momento de magia"')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Selecione seu vídeo abaixo para começar a transformação'
      )
    ).toBeInTheDocument();
  });

  it('should render the FileUploader component', () => {
    render(<Home />);

    expect(
      screen.getByRole('button', { name: /upload file/i })
    ).toBeInTheDocument();
  });

  it('should render the supported formats information', () => {
    render(<Home />);

    expect(
      screen.getByText('Formatos suportados: MP4, MOV, AVI (até 500MB)')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        '"Nós preservamos cada detalhe do seu conteúdo com cuidado"'
      )
    ).toBeInTheDocument();
  });

  it('should have the correct gradient background', () => {
    render(<Home />);

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('bg-gradient-to-br');
    expect(mainElement).toHaveClass('from-gray-900');
    expect(mainElement).toHaveClass('via-gray-800');
    expect(mainElement).toHaveClass('to-gray-900');
  });
});
