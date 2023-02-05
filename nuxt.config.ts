// "https://express-back.onrender.com",
// "http://localhost:5000"

export default defineNuxtConfig({
  css: ["@/assets/main.scss", "element-plus/dist/index.css"],
  runtimeConfig: {
    public: {
      baseURL: "https://express-back.onrender.com",
    },
  },
  ssr: false,
  modules: [
    ['nuxt3-breakpoints', {
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      options: {
        throttle: 200,
      }
    }]
  ],
  app: {
    head: {
      charset: "utf-16",
      title: "Book-lists",
      meta: [{ name: "Book-lists", content: "Book-lists" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/colors.scss" as *;',
        },
      },
    },
  },
});
