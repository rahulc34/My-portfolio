import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/My-portfolio/",
  build: { chunkSizeWarningLimit: 1000 }, // three.js is large but lazy-loaded
});
