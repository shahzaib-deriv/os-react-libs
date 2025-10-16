import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    lib: {
      // The entry point is now our combined index file
      entry: resolve(__dirname, 'src/index.jsx'),
      name: 'ReactLibs',
      // We want both ES and UMD formats
      formats: ['umd', 'es'],
      fileName: (format) => `react-libs.${format}.js`,
    },
    rollupOptions: {
      // Include all dependencies in the bundle for a self-contained package
      external: [],
      output: {
        // No need for globals as we're bundling everything
        globals: {},
      },
    },
  },
});
