import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Project Pages serves from a subpath, so every asset URL must be rooted
  // at the repo name. Anything Vite does not process (the picture() srcset in
  // app.js, the @font-face url() values in main.css) is prefixed by hand.
  base: '/skyConnect/',
  plugins: [
    tailwindcss(),
  ],
})
