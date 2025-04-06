import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { configureAmplify } from './app/config/aws-amplify.config';
import { ConfigureAwsAmplifyError } from './errors/aws-amplify-config.error';
import './index.css';

try {
  configureAmplify({
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
  });
} catch (error: unknown) {
  const originalError =
    error instanceof Error ? error : new Error(String(error));

  throw new ConfigureAwsAmplifyError({
    component: 'Dashboard',
    expected: 'loaded',
    received: 'undefined',
    originalError,
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
