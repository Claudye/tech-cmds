import { defineConfig } from "vite";

export default defineConfig({
  mode: "production",
  build: {
    target: "ES6",
    minify: true,
    lib: {
      entry: "./src/index.ts",
      fileName: "index",
      name: "tech-cmds",
      formats: ["es"],
    },
  },
  resolve: {
    extensions: [".ts"],
  },
});
