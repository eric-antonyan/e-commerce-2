// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from "dotenv"
import path from "path"

dotenv.config()

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
