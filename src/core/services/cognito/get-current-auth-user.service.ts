import {
  AuthSession,
  AuthTokens,
  fetchAuthSession,
  getCurrentUser,
} from 'aws-amplify/auth';
import {
  AuthError,
  AuthServiceError,
  AuthUser,
  AuthUserDetails,
  CustomAuthTokens,
} from './types/auth';

export class GetCurrentAuthUserService {
  static async getCurrentAuthUser(): Promise<AuthUser> {
    try {
      const [session, user] = await Promise.all([
        this.getValidatedSession(),
        getCurrentUser(),
      ]);

      if (!user || !session) {
        throw new Error('No authenticated user');
      }

      return this.mapUserData(user as AuthUserDetails, session);
    } catch (error) {
      console.error('[GetCurrentSession] Get user error:', error);
      throw this.mapAuthError(error);
    }
  }

  private static async getValidatedSession(): Promise<AuthSession> {
    const session = await fetchAuthSession();
    if (!session.tokens?.accessToken) {
      throw new Error('Invalid session');
    }
    return session;
  }

  private static mapUserData(
    user: AuthUserDetails,
    session: AuthSession
  ): AuthUser {
    const tokens = this.extractTokens(session.tokens);

    return {
      id: user.userId || '',
      username: user.username,
      email: this.getUserEmail(user, session),
      attributes: this.getUserAttributes(user),
      name: this.getUserName(session),
      tokens,
    };
  }

  private static extractTokens(tokens?: AuthTokens): CustomAuthTokens {
    return {
      accessToken: tokens?.accessToken?.toString() || '',
      idToken: tokens?.idToken?.toString() || '',
    };
  }

  private static getUserEmail(
    user: AuthUserDetails,
    session: AuthSession
  ): string {
    return (user.signInDetails?.loginId ||
      session.tokens?.idToken?.payload.email ||
      '') as string;
  }

  private static getUserName(session: AuthSession): string {
    return (session.tokens?.idToken?.payload.name as string) || '';
  }

  private static getUserAttributes(
    user: AuthUserDetails
  ): Record<string, string> {
    return {
      ...user.attributes,
      emailVerified: user.attributes?.email_verified?.toString() || 'false',
    };
  }

  private static mapAuthError(error: AuthServiceError): AuthError {
    const defaultError: AuthError = {
      code: 'UnexpectedError',
      message: 'Erro ao verificar sessão',
    };

    if (!(error instanceof Error)) return defaultError;

    if (error.message.includes('No tokens')) {
      return {
        code: 'NoSession',
        message: 'Nenhuma sessão ativa encontrada',
      };
    }

    return defaultError;
  }
}
