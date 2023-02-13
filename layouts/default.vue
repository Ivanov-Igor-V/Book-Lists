<template>
  <div class="default-layout">
    <header class="default-layout__header">
      <el-dropdown
        class="dropdown"
        trigger="click"
        @visible-change="onDropdownVisibilityChange"
      >
        <el-icon :size="50">
          <transition name="fade" mode="out-in">
            <!-- <Expand v-if="!isDropdownOpen" />
            <Fold v-else /> -->
            <Expand
              class="dropdown__toggler"
              :class="{ 'dropdown__toggler-reflected': isDropdownOpen }"
            />
          </transition>
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item ref="dropdown" @click="$router.push('/')">
              Main
            </el-dropdown-item>
            <el-dropdown-item
              ref="dropdown"
              @click="$router.push('/about-app')"
            >
              About app
            </el-dropdown-item>
            <el-dropdown-item @click="$router.push('/about-author')">
              About author
            </el-dropdown-item>
            <el-dropdown-item divided @click="LogOut">
              Log Out
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="default-layout__title" @click="$router.push('/')">
        My book lists
      </div>
    </header>
    <div v-if="breakpoints.width > 500" class="default-layout__desktop">
      <div class="default-layout__content">
        <slot />
      </div>
    </div>
    <div v-else class="default-layout__mobile">
      <div class="default-layout__content default-layout__content--mobile">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import {
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElIcon,
} from 'element-plus';
import { Expand, Fold } from '@element-plus/icons-vue';
export default {
  name: 'DefaultLayout',
  components: {
    ElIcon,
    Expand,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    Fold,
  },
  setup() {
    const breakpoints = useBreakpoints();

    const LogOut = () => {
      localStorage.clear();
      location.reload();
    };

    const isDropdownOpen = ref(false);

    const onDropdownVisibilityChange = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    return {
      LogOut,
      isDropdownOpen,
      onDropdownVisibilityChange,
      breakpoints,
    };
  },
};
</script>

<style lang="scss" scoped>
.default-layout {
  height: 100vh;
  background: var(--color-1);

  &__desktop {
    display: flex;
    height: 100%;
  }

  &__mobile {
    display: flex;
    height: 100%;
  }

  &__content {
    background: white;
    width: 80%;
    overflow: auto;
    margin: 80px auto;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    color: var(--color-2);
    padding: 10px;
    text-align: center;
  }

  &__content--mobile {
    box-shadow: none;
    border-radius: none;
    margin: 0;
    width: 100%;
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
    position: sticky;
  }

  &__title {
    cursor: pointer;
  }
}

.dropdown {
  position: absolute;
  left: 5px;

  &__toggler {
    transition: transform 0.2s;
  }
  &__toggler-reflected {
    transform: rotate(180deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
