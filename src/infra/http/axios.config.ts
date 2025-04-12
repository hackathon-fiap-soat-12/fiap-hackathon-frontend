import { fetchAuthSession } from 'aws-amplify/auth';
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'sonner';
import i18n from '../i18n/i18n';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const { tokens } = await fetchAuthSession();
      const accessToken = tokens?.idToken?.toString();

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    } catch {
      // Não interrompe a requisição se houver erro ao obter o token
      // (permite chamadas públicas)
      return config;
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor de respostas
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!axios.isAxiosError(error)) {
      toast.error(i18n.t('unknown_error', { ns: 'errors' }));
      return Promise.reject(error);
    }

    // Tratamento de erro de conexão
    if (error.code === 'ERR_NETWORK') {
      toast.error(i18n.t('network_error', { ns: 'errors' }));
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const data = error.response?.data as { message?: string };

    if (status === 401) {
      toast.error('Oops, algo deu errado', {
        description: i18n.t('session_expired', { ns: 'errors' }),
      });
      window.location.href = '/signin';
    }

    if (status === 403) {
      toast.error('Oops, algo deu errado', {
        description: i18n.t('access_denied', { ns: 'errors' }),
      });
    }

    if (status && status >= 400 && data?.message) {
      toast.error('Oops, algo deu errado', { description: data.message });
    }

    return Promise.reject(error);
  }
);

export default api;
