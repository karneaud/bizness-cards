import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import inkline from '@inkline/plugin/vite';

const inklineConfig = {
    outputDir: 'src/css/variables'
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), inkline(inklineConfig) ],
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
