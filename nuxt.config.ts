// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    transpile: [
        "three"
    ],
    target: 'static',
    ssr: false,
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
    },
    css: [
        '@/assets/css/tailwind.css',
    ],
})
