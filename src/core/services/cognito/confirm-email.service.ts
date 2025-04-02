import {
  confirmSignUp,
  ConfirmSignUpInput,
  resendSignUpCode,
  ResendSignUpCodeInput,
} from 'aws-amplify/auth';
import {
  AuthError,
  AuthServiceError,
  ConfirmEmailParams,
  ResendConfirmationCodeParams,
} from './types/auth';

export class ConfirmEmailService {
  static async confirmEmail(params: ConfirmEmailParams): Promise<void> {
    try {
      const input: ConfirmSignUpInput = {
        username: params.email,
        confirmationCode: params.confirmationCode,
      };
      await confirmSignUp(input);
    } catch (error) {
      console.error('[AuthService] ConfirmEmail error:', error);
      throw this.mapAuthError(error);
    }
  }

  static async resendConfirmationCode(
    params: ResendConfirmationCodeParams
  ): Promise<void> {
    try {
      const input: ResendSignUpCodeInput = {
        username: params.email,
      };
      await resendSignUpCode(input);
    } catch (error) {
      console.error('[AuthService] ResendCode error:', error);
      throw this.mapAuthError(error);
    }
  }

  private static mapAuthError(error: AuthServiceError): AuthError {
    const defaultError: AuthError = {
      code: 'UnexpectedError',
      message: 'Erro inesperado',
    };

    if (typeof error !== 'object' || error === null) return defaultError;
    if (!(error instanceof Error)) return defaultError;

    const errorMap: Record<string, AuthError> = {
      CodeMismatchException: {
        code: 'CodeMismatchException',
        message: 'Código inválido. Verifique e tente novamente.',
      },
      ExpiredCodeException: {
        code: 'ExpiredCodeException',
        message: 'Código expirado. Solicite um novo.',
      },
      UserNotFoundException: {
        code: 'UserNotFoundException',
        message: 'Usuário não encontrado. Verifique o e-mail.',
      },
    };

    return errorMap[error.code || ''] || defaultError;
  }
}
