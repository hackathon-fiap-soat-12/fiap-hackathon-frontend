import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ConfirmEmail } from './confirm-email';

const renderComponent = () =>
  render(
    <BrowserRouter>
      <ConfirmEmail />
    </BrowserRouter>
  );

describe('ConfirmEmail Component', () => {
  it('should render the component correctly', () => {
    renderComponent();

    expect(
      screen.getByRole('heading', { name: /verificação de e-mail/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/confirme seu e-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/código de confirmação/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /verificar/i })
    ).toBeInTheDocument();
  });
});
