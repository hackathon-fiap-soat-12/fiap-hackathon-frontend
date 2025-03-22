import i18n from '@/i18n/i18n';
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { isAfter } from 'date-fns';
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from 'react';
import { toast } from 'sonner';

const BASE_URL = '';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

interface Session {
  expires_in: string | number | Date;
  token: string;
}

interface UserData {
  session: Session;
}

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = localStorage.getItem('user');

    if (user) {
      const { session } = JSON.parse(user) as UserData;

      if (isAfter(new Date(), new Date(session.expires_in))) {
        return Promise.reject('Token expired');
      }

      config.headers.Authorization = `Bearer ${session.token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: any) => response,
  (error: {
    code: string;
    response: {
      status: number;
      data: {
        message:
          | string
          | number
          | bigint
          | boolean
          | (() => React.ReactNode)
          | ReactElement<unknown, string | JSXElementConstructor<any>>
          | Iterable<ReactNode>
          | ReactPortal
          | Promise<
              | string
              | number
              | bigint
              | boolean
              | ReactPortal
              | ReactElement<unknown, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | null
              | undefined
            >
          | null
          | undefined;
      };
    };
  }) => {
    if (error.code === 'ERR_NETWORK') {
      toast.error(i18n.t('network_error', { ns: 'errors' }));
    }

    if (error?.response?.status === 409) {
      return Promise.reject(error);
    }

    if (error?.response?.status !== 200 && error?.response?.data?.message) {
      toast.error(error?.response?.data?.message);
    }

    return Promise.reject(error);
  }
);

export default api;
