import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    proxy: {
      "/auth": {
        target: "http://3.235.214.44:8000",
        changeOrigin: true,
      },
      "/rent-store": {
        target: "http://3.235.214.44:8000",
        changeOrigin: true,
      },
    },
  },
});
