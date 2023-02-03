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
