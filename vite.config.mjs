import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    // Output to "build/" so the existing Hostinger deploy workflow keeps working.
    outDir: 'build',
  },
  server: {
    // Mimic Create React App: dev server on port 3000 and auto-open the browser.
    port: 3000,
    open: true,
  },
})
