import { signUp, SignUpInput } from 'aws-amplify/auth';
import { AuthError, AuthServiceError, SignUpParams } from './types/auth';

export class SignUpService {
  static async signUp(
    params: SignUpParams
  ): Promise<
    { userId: string; isSignUpComplete: boolean | undefined } | undefined
  > {
    try {
      const { username, password, email, attributes } = params;

      const signUpInput: SignUpInput = {
        username,
        password,
        options: {
          userAttributes: {
            email,
            ...attributes,
          },
          autoSignIn: false,
        },
      };

      try {
        const { userId, isSignUpComplete } = await signUp(signUpInput);

        if (!userId) {
          throw new Error('Cadastro realizado, mas userId não foi retornado');
        }

        return { userId, isSignUpComplete };
      } catch (error) {
        throw this.handleSignUpError(error);
      }
    } catch (error) {
      const authError = error as AuthServiceError;
      console.error('[AuthService] SignUp error:', authError);
      throw this.mapError(authError);
    }
  }

  // Tratamento específico para erros de cadastro
  private static handleSignUpError(error: AuthServiceError): AuthError {
    const defaultError: AuthError = {
      code: 'UnexpectedError',
      message: 'Erro inesperado no cadastro',
      details: String(error),
    };

    if (!(error instanceof Error)) return defaultError;

    const errorMapping: Record<string, AuthError> = {
      UsernameExistsException: {
        code: 'UsernameExistsException',
        message: 'Este e-mail/nome de usuário já está cadastrado',
        details: 'Tente recuperar sua senha ou use outro e-mail',
      },
      InvalidParameterException: {
        code: 'InvalidParameterException',
        message: 'Dados de cadastro inválidos',
        details: this.getInvalidParameterDetails(error.message),
      },
      InvalidPasswordException: {
        code: 'InvalidPasswordException',
        message: 'Senha não atende aos requisitos mínimos',
        details: 'Use 8+ caracteres com letras, números e símbolos',
      },
    };

    return errorMapping[error.code] || defaultError;
  }

  private static getInvalidParameterDetails(message: string): string {
    if (message.includes('name.formatted')) {
      return 'O nome completo é obrigatório';
    }
    if (message.includes('email')) {
      return 'Formato de e-mail inválido';
    }
    return message;
  }

  private static mapError(error: AuthServiceError): AuthServiceError {
    const errorMap: Record<string, string> = {
      UsernameExistsException: 'Este usuário já está cadastrado',
      InvalidPasswordException: 'A senha não atende aos requisitos mínimos',
      CodeMismatchException: 'Código de verificação inválido',
      ExpiredCodeException: 'Código expirado. Solicite um novo.',
    };

    return {
      ...error,
      message: errorMap[error.code] || error.message,
    };
  }
}
