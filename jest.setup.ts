import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

Object.defineProperty(globalThis, 'import.meta', {
  value: {
    env: {
      VITE_API_BASE_URL: 'http://localhost:3000/api',
    },
  },
});

jest.mock('axios', () => ({
  create: () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }),
}));

afterEach(() => {
  cleanup();
});
