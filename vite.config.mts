import { defineConfig } from "vite";
import zaloMiniApp from "zmp-vite-plugin";
import react from "@vitejs/plugin-react";

export default () => {
  return defineConfig({
    root: "./src",
    base: "",
    plugins: [zaloMiniApp(), react()],
    build: {
      assetsInlineLimit: 0,
      cssCodeSplit: true,
      target: "es2017",
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  });
};
