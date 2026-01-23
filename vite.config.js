import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { CDE_NAME } from './src/cde-config'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import terser from '@rollup/plugin-terser';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  base: './',
  plugins: [
    vue({
      // This allows us to use the style tags within the vue components
      customElement: true,
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-') // Treat all tags with a dash as custom elements
        }
      }
    }),
    vueDevTools(),
    cssInjectedByJsPlugin(),
    // polyfill to support use of process in libraries like Q
    nodePolyfills({
      globals: {
        process: true,
        global: true
      }
    }),
  ],
  optimizeDeps: {
    include: ['vue-echarts', 'resize-detector']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: 'dist/src',
    assetsInlineLimit: 10000000,
    cssCodeSplit: false,
    lib: {
      entry: 'src/main.js',
      name: `${CDE_NAME}`,
      fileName: `${CDE_NAME}.umd.min.js`,
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['echarts', 'vue-echarts', 'resize-detector'],
      output: [
       // ** Non minified version, uncomment below ** //
        // {
        //   inlineDynamicImports: true,
        //   entryFileNames: `${CDE_NAME}.umd.js`,
        //   format: 'umd',
        //   name: CDE_NAME,
        // },
        {
          inlineDynamicImports: true,
          entryFileNames: `${CDE_NAME}.umd.min.js`,
          format: 'umd',
          name: CDE_NAME,
          plugins: [terser()],
        },
      ],
    },
    target: 'es2019',
    sourcemap: false,
  }
})