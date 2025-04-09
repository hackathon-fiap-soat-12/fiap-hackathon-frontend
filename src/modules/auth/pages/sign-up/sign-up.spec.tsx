import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SignUp } from './sign-up';

jest.mock('@/core/context/auth-context', () => ({
  useAuth: () => ({
    loading: false,
    login: jest.fn(),
  }),
}));

const renderComponent = () =>
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

describe('SignUp Component', () => {
  it('should render the component correctly', () => {
    renderComponent();

    expect(
      screen.getByRole('heading', { name: /Crie sua conta/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Preencha os dados abaixo para se cadastrar/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar Senha/i)).toBeInTheDocument();
    expect(screen.getByText(/Já possui uma conta/i)).toBeInTheDocument();
    expect(screen.getByText(/Entrar/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Cadastrar/i })
    ).toBeInTheDocument();
  });
});
