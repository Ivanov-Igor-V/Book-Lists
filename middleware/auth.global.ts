export default defineNuxtRouteMiddleware((to, from) => {
  let token;
  if (process.client) {
    token = localStorage?.token;
  }

  if (!token && to.path !== "/auth") return navigateTo("/auth");

  if (token && to.path === "/auth") {
    console.log(from);

    return navigateTo('/');
  }
});
