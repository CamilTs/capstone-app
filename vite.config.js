import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "https://CamilTs.github.io/capstone-app/",
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/socket.io": {
  //       target: "http://localhost:3000",
  //       ws: true,
  //     },
  //   },
  // },
});
