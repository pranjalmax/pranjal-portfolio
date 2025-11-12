import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Your Pages URL is /pranjal-portfolio/
  base: '/pranjal-portfolio/',
  plugins: [react()],
})
