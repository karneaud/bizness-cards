import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [
    tailwindcss(),
    viteCommonjs(),
    vue(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   devOptions: { enabled: true },
    //   includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'mask-icon.svg'],
    //   manifest: {
    //     name: 'BiznzCard',
    //     short_name: 'BiznzCard',
    //     description: 'Digital business cards for mobile professionals',
    //     theme_color: '#ffffff',
    //     background_color: '#ffffff',
    //     display: 'standalone',
    //     display_override: ['fullscreen'],
    //     orientation: 'portrait',
    //     scope: '/',
    //     start_url: '/',
    //     icons: [
    //       { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    //       { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    //       { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    //     ]
    //   },
    //   workbox: {
    //     globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
    //     runtimeCaching: [
    //       {
    //         urlPattern: ({ request }) =>
    //           request.destination === 'script' ||
    //           request.destination === 'style' ||
    //           request.destination === 'image',
    //         handler: 'StaleWhileRevalidate',
    //         options: {
    //           cacheName: 'static-resources',
    //           expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 }
    //         }
    //       }
    //     ]
    //   }
    // })
  ],
  define: {
    _global: 'window' // for swing/hammerjs expecting browser global
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(['swing'])]
    }
  },
  css: {
		devSourcemap: "development",
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'~': fileURLToPath(new URL('./node_modules', import.meta.url))
		}
  },
  content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
  server: {
    host: '0.0.0.0',
    port: 3000,
    cors: true,
    strictPort: true,
    allowedHosts:true
  },
  preview: {
    host: '0.0.0.0',
    port: 3002,
    strictPort: true
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome86',
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',              // default: safe for logic tests
    setupFiles: join(__dirname, 'tests', 'setup.js'),
    include: [join(__dirname, 'tests', '**', '*.test.{js,ts}')],
    coverage: { reporter: ['text', 'json', 'html'] }
  }
})
