import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: "http://localhost:8000",
  },
  // proxy: {
  //   "/auth": {
  //     target: "http://localhost:8000",
  //     rewrite: (path) => path.replace(/^\/auth/, ""),
  //   },
  // },
});
