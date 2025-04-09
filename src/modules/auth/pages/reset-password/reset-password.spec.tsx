import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ResetPassword } from './reset-password';

jest.mock('@/core/context/auth-context', () => ({
  useAuth: () => ({
    loading: false,
    resetPassword: jest.fn(),
  }),
}));

const renderComponent = () =>
  render(
    <BrowserRouter>
      <ResetPassword />
    </BrowserRouter>
  );

describe('ResetPassword Component', () => {
  it('should render the component correctly', () => {
    renderComponent();

    expect(
      screen.getByRole('heading', { name: /Redefinir senha/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Utilize o código de verificação enviado para o seu e-mail/i
      )
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirme seu E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nova senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar senha/i)).toBeInTheDocument();
    expect(screen.getByText(/Lembrou sua senha/i)).toBeInTheDocument();
    expect(screen.getByText(/Faça login/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Redefinir senha/i })
    ).toBeInTheDocument();
  });
});
