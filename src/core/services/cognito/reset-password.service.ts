import { confirmResetPassword } from '@aws-amplify/auth';
import {
  CognitoResetPasswordError,
  ResetPasswordErrorCode,
  ResetPasswordSubmitParams,
} from './types/auth';

export class ResetPasswordService {
  static async confirmResetPassword(
    params: ResetPasswordSubmitParams
  ): Promise<void> {
    try {
      await confirmResetPassword({
        username: params.email,
        confirmationCode: params.code,
        newPassword: params.newPassword,
      });
    } catch (error) {
      console.error('[ResetPasswordService] Error confirming reset:', error);
      throw this.mapAuthError(error);
    }
  }

  private static mapAuthError(error: CognitoResetPasswordError): {
    code: ResetPasswordErrorCode;
    message: string;
  } {
    const defaultError = {
      code: 'UnexpectedError' as const,
      message: 'Erro inesperado durante o login',
    };

    if (typeof error !== 'object' || error === null) return defaultError;

    const errorMap: Record<
      string,
      { code: ResetPasswordErrorCode; message: string }
    > = {
      CodeMismatchException: {
        code: 'CodeMismatchException',
        message: 'Código inválido. Verifique e tente novamente.',
      },
      ExpiredCodeException: {
        code: 'ExpiredCodeException',
        message: 'Código expirado. Solicite um novo código.',
      },
      InvalidPasswordException: {
        code: 'InvalidPasswordException',
        message: 'Senha não atende aos requisitos de segurança.',
      },
      LimitExceededException: {
        code: 'LimitExceededException',
        message: 'Limite de tentativas excedido. Tente mais tarde.',
      },
      UserNotFoundException: {
        code: 'UserNotFoundException',
        message: 'Usuário não encontrado.',
      },
      TooManyRequestsException: {
        code: 'TooManyRequestsException',
        message: 'Muitas solicitações. Tente novamente mais tarde.',
      },
    };

    return errorMap[error.name || ''];
  }
}
