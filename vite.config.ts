import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Set the threshold for inlining assets to 4MB (4 * 1024 * 1024 bytes)
    assetsInlineLimit: 4 * 1024 * 1024, // 4MB
  },
});
