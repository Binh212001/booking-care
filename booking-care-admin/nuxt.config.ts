import Aura from "@primeuix/themes/aura";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@primevue/nuxt-module"],
  css: ["~/assets/css/main.css", "primeicons/primeicons.css"],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
  runtimeConfig: {
    // Private keys (only available on server-side)
    // Public keys (exposed to client-side)
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:3001",
      s3Url:
        process.env.NUXT_PUBLIC_S3_URL ||
        "https://booking-care-212002.s3.ap-southeast-1.amazonaws.com",
    },
  },
});
