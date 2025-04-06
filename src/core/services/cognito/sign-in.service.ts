import { signIn } from 'aws-amplify/auth';
import { GetCurrentAuthUserService } from './get-current-auth-user.service';
import {
  AuthUser,
  CognitoSignInError,
  LoginParams,
  SignInErrorCode,
} from './types/auth';

export class SignInService {
  static async signIn(params: LoginParams): Promise<Partial<AuthUser>> {
    try {
      const { isSignedIn } = await signIn(params);

      if (!isSignedIn) {
        throw {
          name: 'UserNotConfirmedException',
        } as CognitoSignInError;
      }

      return GetCurrentAuthUserService.getCurrentAuthUser();
    } catch (error) {
      const authError = error as CognitoSignInError;
      console.error(`[AuthService] Login error: ${authError.name}`, authError);
      throw this.mapAuthError(error);
    }
  }

  private static mapAuthError(error: CognitoSignInError): {
    code: SignInErrorCode;
    message: string;
  } {
    const defaultError = {
      code: 'UnexpectedError' as const,
      message: 'Erro inesperado durante o login',
    };

    if (typeof error !== 'object' || error === null) return defaultError;

    const errorMap: Record<string, { code: SignInErrorCode; message: string }> =
      {
        UserNotFoundException: {
          code: 'UserNotFoundException',
          message: 'Usuário não encontrado. Verifique suas credenciais.',
        },
        NotAuthorizedException: {
          code: 'NotAuthorizedException',
          message: 'Senha incorreta. Tente novamente.',
        },
        UserNotConfirmedException: {
          code: 'UserNotConfirmedException',
          message: 'Confirme seu e-mail antes de fazer login.',
        },
        PasswordResetRequiredException: {
          code: 'PasswordResetRequiredException',
          message: 'Redefina sua senha para continuar.',
        },
        UserAlreadyAuthenticatedException: {
          code: 'UserAlreadyAuthenticatedException',
          message: 'Usuário já possui uma sessão ativa.',
        },
        TooManyFailedAttemptsException: {
          code: 'TooManyFailedAttemptsException',
          message: 'Muitas tentativas. Tente mais tarde.',
        },
      };

    return errorMap[error.name || ''] || defaultError;
  }
}
