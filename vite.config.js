// Import Vite's function for setting up the project configuration.
import { defineConfig } from 'vite';
// Import the React plugin so Vite can work with React and JSX.
import react from '@vitejs/plugin-react';
// Configure Vite and enable the React plugin.
export default defineConfig({
  plugins: [react()],
});
