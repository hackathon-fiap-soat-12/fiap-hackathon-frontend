import { resetPassword, ResetPasswordInput } from 'aws-amplify/auth';
import {
  CognitoForgotPasswordError,
  ForgotPasswordErrorCode,
} from './types/auth';

export class ForgotPasswordService {
  static async sendResetCode(username: string): Promise<void> {
    try {
      const input: ResetPasswordInput = { username };
      await resetPassword(input);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  private static mapError(error: CognitoForgotPasswordError): {
    code: ForgotPasswordErrorCode;
    message: string;
  } {
    const defaultError = {
      code: 'ForgotPasswordFailed' as const,
      message: 'Erro no processo de recuperação. Tente novamente.',
    };

    if (typeof error !== 'object' || error === null) return defaultError;

    const errorMap: Record<
      string,
      { code: ForgotPasswordErrorCode; message: string }
    > = {
      UserNotFoundException: {
        code: 'UserNotFoundException',
        message: 'Usuário não encontrado. Verifique o e-mail/celular.',
      },
      InvalidParameterException: {
        code: 'InvalidUsername',
        message: 'Formato de e-mail/celular inválido.',
      },
    };

    return errorMap[error.name || ''] || defaultError;
  }
}
