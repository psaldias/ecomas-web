import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";




// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      vue(),
      // {
      //   ...basicSsl(),
      //   apply: 'serve'
      // }
    ],
    server:{
      proxy: 'http://ecomaswp.localhost',
    },
    define: {
      // enable hydration mismatch details in production build
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
    }
  }
});
