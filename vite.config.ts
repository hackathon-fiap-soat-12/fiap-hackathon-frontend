import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const build = (mode: string) => {
  if (mode === 'production') {
    return {
      outDir: 'dist',
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          ui: ['@mui/material', 'tailwindcss'],
        },
      },
    };
  }

  return {
    outDir: 'dist',
    sourcemap: mode !== 'production',
  };
};

export default defineConfig(({ mode }) => {
  return {
    plugins: [tailwindcss(), react()],
    define: {
      __APP_ENV__: JSON.stringify(mode),
    },
    build: build(mode),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
