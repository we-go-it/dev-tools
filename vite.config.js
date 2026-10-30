import path from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// One ES module in dist/, Vue and the styles inside it: the site imports it as
// it is, with no Vue or Tailwind of its own. The CSS goes in as a string
// (src/styles.css?inline), for the shadow root.
export default defineConfig({
  plugins: [ vue(), tailwindcss() ],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') }
  },
  // a library build leaves these to the bundler that imports it; Vue's own
  // checks need them settled here, as the site's bundler never sees Vue
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    '__VUE_OPTIONS_API__': 'false',
    '__VUE_PROD_DEVTOOLS__': 'false',
    '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': 'false'
  },
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, 'src/index.js'),
      formats: [ 'es' ],
      fileName: () => 'dev-tools.js'
    },
    emptyOutDir: true,
    cssCodeSplit: false
  }
})
