import { signOut } from '@aws-amplify/auth';
import { AuthError } from './types/auth';

export class SignOutService {
  static async signOut(): Promise<void> {
    try {
      await signOut({ global: true });

      this.clearLocalData();
    } catch (error) {
      console.error('[SignOutService] Error:', error);
      throw this.mapError(error);
    }
  }

  private static clearLocalData(): void {
    localStorage.removeItem('userPreferences');
    sessionStorage.removeItem('tempData');

    if (window.caches) {
      caches
        .keys()
        .then((names) => names.forEach((name) => caches.delete(name)));
    }
  }

  private static mapError(error: unknown): AuthError {
    return {
      name: 'SignOutFailed',
      message: 'Erro ao encerrar sessão. Tente novamente.',
      details: error instanceof Error ? error.message : String(error),
    };
  }
}
