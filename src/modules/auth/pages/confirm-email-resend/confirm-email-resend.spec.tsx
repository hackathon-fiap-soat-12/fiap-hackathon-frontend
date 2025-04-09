import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ConfirmEmailResend } from './confirm-email-resend';

const renderComponent = () =>
  render(
    <BrowserRouter>
      <ConfirmEmailResend />
    </BrowserRouter>
  );

describe('ConfirmEmailResend Component', () => {
  it('should render the component correctly', () => {
    renderComponent();

    expect(
      screen.getByRole('heading', { name: /Reenviar Verificação/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Insira seu e-mail para receber um novo link de verificação/i
      )
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Já verificou seu e-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Faça login/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Reenviar Email de Verificação/i })
    ).toBeInTheDocument();
  });
});
