import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      GATEWAY_API_BASE_URL: JSON.stringify(process.env.GATEWAY_API_BASE_URL),
    },
  },
})
