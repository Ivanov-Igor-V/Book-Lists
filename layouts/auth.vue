<template>
  <div class="auth-layout">
    <div v-if="breakpoints.width > 500" class="auth-layout__desktop">
      <div class="auth-layout__content">
        <slot />
      </div>
    </div>
    <div v-else class="auth-layout__mobile">
      <div class="auth-layout__content auth-layout__content--mobile">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
  setup() {
    const breakpoints = useBreakpoints();
    return { breakpoints };
  },
};
</script>

<style lang="scss" scoped>
.auth-layout {
  height: 100vh;
  background: var(--color-1);

  &__desktop {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  &__content {
    background: white;
    min-width: 215px;
    min-height: 300px;
    overflow: auto;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    color: var(--color-2);
    padding: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    position: relative;
  }

  &__mobile,
  &__content--mobile {
    height: 100%;
  }
  // &__mobile {
  //   height: 100%;
  // }
}

.dropdown {
  position: absolute;
  left: 5px;
}
</style>
