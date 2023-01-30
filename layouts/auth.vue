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
import { ElPageHeader, ElDropdown, ElDropdownMenu, ElDropdownItem, ElButton, ElIcon } from "element-plus";
import { Expand } from "@element-plus/icons-vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
export default {
  name: "DefaultLayout",
  components: { ElPageHeader, ElIcon, Expand, ElDropdown, ElDropdownMenu, ElDropdownItem },
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
  }

  &__content {
    background: white;
    width: 100%;
    overflow: auto;
    margin: 20%;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    color: var(--color-2);
    padding: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    position: relative;
  }

  &__header {
    background-color: transparent;
    color: var(--color-2);
    font-weight: 600;
    font-size: 20px;
    text-align: center;
    line-height: 60px;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.dropdown {
  position: absolute;
  left: 5px;
}
</style>
