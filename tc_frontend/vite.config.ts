import path from 'path';
import { defineConfig, loadEnv } from 'vite';


export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          // Use /dev-api to avoid conflict with /api directory in source code
          '/dev-api': {
            target: 'http://localhost:8080/api',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/dev-api/, '')
          },
          '/uploads': {
            target: 'http://localhost:8080',
            changeOrigin: true,
          }
        }
      },
      plugins: [],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
