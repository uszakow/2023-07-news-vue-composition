import { fileURLToPath } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    styles: fileURLToPath(new URL("./assets/styles", import.meta.url)),
  },
  css: ["~/assets/styles/globals.scss"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  devtools: { enabled: true },
  devServer: {
    port: 3005,
  },
  modules: ["nuxt-icons"],
});
