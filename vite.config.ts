import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist-renderer",
  },
  server: {
    port: process.env.LOCALHOST_ELECTRON_SERVER_PORT
      ? Number(process.env.LOCALHOST_ELECTRON_SERVER_PORT)
      : 3000,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@config": path.resolve(__dirname, "src/renderer/config"),
      "@windows": path.resolve(__dirname, "src/renderer/windows"),
      "@utils": path.resolve(__dirname, "src/renderer/utils"),
      "@hooks": path.resolve(__dirname, "src/renderer/hooks"),
      "@layouts": path.resolve(__dirname, "src/renderer/layouts"),
      "@conceptions": path.resolve(__dirname, "src/renderer/conceptions"),
      "@components": path.resolve(__dirname, "src/renderer/components"),
      "@composites": path.resolve(__dirname, "src/renderer/composites"),
      "@shared": path.resolve(__dirname, "src/renderer/shared"),
    },
  },
});
