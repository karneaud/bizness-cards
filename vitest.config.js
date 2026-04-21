import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',              // default: safe for logic tests
    setupFiles: join(__dirname, 'tests', 'setup.js'),
    include: [join(__dirname, 'tests', '**', '*.test.{js,ts}')],
    coverage: { 
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'coverage/**',
        'tests/**',
        'vite.config.*',
        'vitest.config.*',
        'cypress/**',
        '.nyc_output/**',
        '*.d.ts',
        'src/assets/**',
        'src/lib/**',
        'src/themes/**',
        'src/routes/**'
      ]
    },
    // Enable watching
    watch: true, // Set to true if you want watch mode
    // Increase timeout for slower tests
    testTimeout: 10000,
    hookTimeout: 10000,
    // Reporters
    reporters: ['default', 'html'],
    outputFile: {
      html: './reports/test-report.html'
    }
  }
});