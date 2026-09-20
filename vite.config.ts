import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      // GEMINI_API_KEY is deliberately NOT defined here. It is read at runtime
      // by the serverless functions in api/, so it never enters the client bundle.
      define: {
        'process.env.API_KEY': 'undefined',
        'process.env.GEMINI_API_KEY': 'undefined'
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
