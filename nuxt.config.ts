// "https://express-back.onrender.com"

export default defineNuxtConfig({
  css: ["@/assets/main.scss", "element-plus/dist/index.css"],
  runtimeConfig: {
    public: {
      baseURL: "http://localhost:5000",
    },
  },
  ssr: false,
  app: {
    head: {
      charset: "utf-16",
      title: "Book-lists",
      meta: [{ name: "Book-lists", content: "Book-lists" }],
    },
    pageTransition: { name: 'page', mode: 'out-in' }
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
