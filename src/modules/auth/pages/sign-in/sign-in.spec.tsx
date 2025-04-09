import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SignIn } from './sign-in';

jest.mock('@/core/context/auth-context', () => ({
  useAuth: () => ({
    loading: false,
    login: jest.fn(),
  }),
}));

const renderComponent = () =>
  render(
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>
  );

describe('SignIn Component', () => {
  it('should render the component correctly', () => {
    renderComponent();

    expect(
      screen.getByRole('heading', { name: /Bem-vindo de volta/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Acesse sua conta para continuar/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Esqueceu sua senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
  });
});
