// "https://express-back.onrender.com",
// "http://localhost:5000"
// https://lazy-tan-rooster-cap.cyclic.app

export default defineNuxtConfig({
  css: ["@/assets/main.scss", "element-plus/dist/index.css"],
  imports: {
    autoImport: true,
  },
  ssr: false,
  modules: ["nuxt3-breakpoints"],
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
