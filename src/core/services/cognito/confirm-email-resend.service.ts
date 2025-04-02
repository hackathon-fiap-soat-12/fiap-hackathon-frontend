import { resendSignUpCode, ResendSignUpCodeInput } from '@aws-amplify/auth';
import {
  AuthError,
  AuthServiceError,
  ResendConfirmationCodeParams,
} from './types/auth';

export class ConfirmEmailResendService {
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
