<template>
  <div class="default-layout">
    <div class="default-layout__main">
      <div class="default-layout__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
export default {
  name: "DefaultLayout",
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind);

    const smAndLarger = breakpoints.greaterOrEqual("sm"); // sm and larger
    const smSmaller = breakpoints.smaller("sm");

    return { breakpoints, smAndLarger, smSmaller };
  },
};
</script>

<style lang="scss" scoped>
.default-layout {
  height: 100vh;
  color: black;
  background: var(--color-1);

  &__main {
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
}

.dropdown {
  position: absolute;
  left: 5px;
}
</style>
