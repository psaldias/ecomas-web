import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import basicSsl from '@vitejs/plugin-basic-ssl'




// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(mode);
  return {
    plugins: [
      vue(),
      {
        ...basicSsl(),
        apply: 'serve'
      }
    ],
    server:{
      proxy: 'http://ecomaswp.localhost',
    },
  }
});
