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
      // The entry point is our combined index file
      entry: resolve(__dirname, 'src/index.jsx'),
      name: 'ReactLibs',
      // Only UMD format as requested
      formats: ['umd'],
      fileName: (format) => `react-libs.${format}.js`,
    },
    // Use terser for better minification
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console statements
        drop_console: true,
        drop_debugger: true,
        // Remove unused code
        dead_code: true,
        // Remove unreachable code
        unused: true,
        // Multiple optimization passes
        passes: 2,
        // Optimize for gzip compression
        sequences: true,
        // Optimize property access
        properties: true,
        // Join consecutive statements with comma operator
        join_vars: true,
        // Optimize if statements
        if_return: true,
      },
      mangle: {
        // More aggressive mangling for better compression
        toplevel: true,
      },
      format: {
        // Remove comments
        comments: false,
        // Minimize whitespace
        beautify: false,
        // Use shorter variable names when possible
        max_line_len: 0,
      },
      // Set ECMAScript target version
      ecma: 5,
      module: false,
      toplevel: true,
    },
    rollupOptions: {
      // Include all dependencies in the bundle for a self-contained package
      external: [],
      output: {
        // No need for globals as we're bundling everything
        globals: {},
        // Ensure we generate a single file
        inlineDynamicImports: true,
        // Optimize chunk size
        compact: true,
      },
      // Simple but effective tree-shaking
      treeshake: true,
    },
    // Ensure source maps are not generated for production
    sourcemap: false,
    // Ensure we don't generate multiple chunks
    cssCodeSplit: false,
    // Ensure assets are inlined
    assetsInlineLimit: 100000000,
  },
});
