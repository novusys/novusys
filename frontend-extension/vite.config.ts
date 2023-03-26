import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import * as dotenv from "dotenv";

dotenv.config();

//@ts-ignore
import manifest from "./src/manifest";
//@ts-ignore
import { config } from "./src/read_pages_folder";

// https://vitejs.dev/config/
//@ts-ignore
export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: "build",
      rollupOptions: {
        input: config,
        output: {
          chunkFileNames: "assets/chunk-[hash].js",
        },
      },
    },

    plugins: [crx({ manifest }), terser(), react()],
  };
});
