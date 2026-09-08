import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    // Output to "build/" so the existing Hostinger deploy workflow keeps working.
    outDir: 'build',
    // Put built JS/CSS/images in "static/" instead of the default "assets/".
    // The SPA has a route at /assets, and a real "assets/" folder on the server
    // shadows that route (Apache serves the folder → 403). "static/" avoids the clash.
    assetsDir: 'static',
  },
  server: {
    // Mimic Create React App: dev server on port 3000 and auto-open the browser.
    port: 3000,
    open: true,
  },
})
