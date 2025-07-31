import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import paths from 'vite-tsconfig-paths'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
/// <reference types="vitest/config" />
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_VERSION || 'development'),
      __IS_STAGING__: JSON.stringify(mode === 'staging'),
    },
    plugins: [
      react(),
      tailwindcss(),
      paths(),
      visualizer({ open: true }),
      ...(isProduction || mode === 'staging'
        ? [
            sentryVitePlugin({
              org: 'ramsscr',
              project: 'javascript-react',
              authToken: process.env.SENTRY_AUTH_TOKEN,
              release: { 
                name: env.VITE_VERSION,
                deploy: { env: mode }
              },
            }),
          ]
        : []),
    ],
    build: {
      target: 'esnext',
      minify: isProduction ? 'esbuild' : false,
      sourcemap: isProduction ? 'hidden' : true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor'
            if (id.includes('src/utils')) return 'utils'
          },
        },
      },
    },
    server: {
      open: true,
    },
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [],
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './test/setupTest.ts',
      reporters: ['default', 'html'],
      css: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/**',
          'src/App.tsx',
          'src/main.tsx',
          'src/views/**',
          'src/data/**',
          'src/@types/**',
          'src/utils/env.config.ts',
          'src/utils/constants.ts',
          'src/variants/**',
          'dist/**',
          'coverage/**',
          'test/**',
          'html/**',
          '*config.*',
          'src/vite-env.d.ts',
          'src/hooks/useFPS.ts',
        ],
        all: true,
        threshold: {
          statements: 90,
          branches: 90,
          functions: 90,
          lines: 90,
        }
      },
    },
  }
})