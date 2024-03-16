import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base:"/Jobber-Jobs-for-you/Frontend/",
  plugins: [react()],
})
