import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import inkline from '@inkline/plugin/vite';
import { VitePWA } from 'vite-plugin-pwa'

const inklineConfig = {
    outputDir: 'src/css/variables'
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), inkline(inklineConfig), VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },
        includeAssets: ['favicon.svg'],
        manifest: {
          name: 'BiznzCard',
          short_name: 'BiznzCard',
          description: 'Digital business cards',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'favicon.svg',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'favicon.svg',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })  ],
      
    define: {
        _global: ({})
    },
    optimizeDeps : { extension: ['.jsx', '.vue'] },
    server: {
        host: '0.0.0.0',
        port: 3000,
        cors: true,
        warmup: {
            clientFiles: ['./src/components/*.vue', './src/css/**/*.scss']
        },
    }
});
