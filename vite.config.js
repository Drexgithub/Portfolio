import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        skills: resolve(__dirname, 'skills.html'),
        projects: resolve(__dirname, 'projects.html'),
        experience: resolve(__dirname, 'experience.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
