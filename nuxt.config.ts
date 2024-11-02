// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt','@nuxt/ui'],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },
  colorMode: {
    preference: 'light', // Set the default theme to light
    fallback: 'light', // Use light theme if preference isn't specified
  }
})