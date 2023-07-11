import { fileURLToPath } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 3005,
  },
  css: ["~/assets/styles/globals.scss"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  alias: {
    styles: fileURLToPath(new URL("./assets/styles", import.meta.url)),
  },
});
