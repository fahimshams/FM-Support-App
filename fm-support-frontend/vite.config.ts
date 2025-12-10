import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config so the dev server is visible on iPhone hotspot
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // listen on all interfaces
    port: 5173,
    strictPort: true,
  },
});
