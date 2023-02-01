<template>
  <div class="default-layout">
    <header class="default-layout__header">
      <el-dropdown class="dropdown" trigger="click" @visible-change="test">
        <el-icon class="dropdown__toggler" :size="50">
          <Expand v-if="!isDropdownOpen" />
          <Fold v-else />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              ref="dropdown"
              @click="$router.push('/about-app')"
            >
              About app</el-dropdown-item
            >
            <el-dropdown-item @click="$router.push('/about-author')">
              About author
            </el-dropdown-item>
            <el-dropdown-item @click="LogOut" divided>
              Log Out
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="default-layout__title" @click="$router.push('/')">
        My book lists
      </div>
    </header>
    <div class="default-layout__main">
      <div class="default-layout__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import {
  ElPageHeader,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElIcon,
} from "element-plus";
import { Expand, Fold } from "@element-plus/icons-vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
export default {
  name: "DefaultLayout",
  components: {
    ElPageHeader,
    ElIcon,
    Expand,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    Fold,
  },
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind);

    const smAndLarger = breakpoints.greaterOrEqual("sm"); // sm and larger
    const smSmaller = breakpoints.smaller("sm");

    const LogOut = () => {
      localStorage.clear();
      location.reload();
    };

    const isDropdownOpen = ref(false);

    const test = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    return {
      breakpoints,
      smAndLarger,
      smSmaller,
      LogOut,
      isDropdownOpen,
      test,
    };
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
    margin: 100px;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    color: var(--color-2);
    padding: 10px;
    text-align: center;
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

  &__title {
    cursor: pointer;
  }
}

.dropdown {
  position: absolute;
  left: 5px;
}
</style>
