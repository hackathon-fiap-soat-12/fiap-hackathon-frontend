import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ForgotPassword } from './forgot-password';

jest.mock('@/core/context/auth-context', () => ({
  useAuth: () => ({
    loading: false,
    forgotPassword: jest.fn(),
  }),
}));

const renderComponent = () =>
  render(
    <BrowserRouter>
      <ForgotPassword />
    </BrowserRouter>
  );

describe('ForgotPassword Component', () => {
  it('should render the component correctly', () => {
    renderComponent();

    expect(
      screen.getByRole('heading', { name: /Esqueceu sua senha/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Solicite um código de recuperação/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Ainda não tem uma conta/i)).toBeInTheDocument();
    expect(screen.getByText(/Cadastre-se/i)).toBeInTheDocument();
    expect(screen.getByText(/Já possui uma conta/i)).toBeInTheDocument();
    expect(screen.getByText(/Entrar/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Solicitar/i })
    ).toBeInTheDocument();
  });
});
