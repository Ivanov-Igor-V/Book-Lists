<template>
  <div class="list-form">
    <div class="list-form__form-field">
      <el-input
        v-model="query"
        @change="$emit('queryChanged', query)"
        autofocus
        placeholder="query"
      />
      <el-tooltip
        effect="dark"
        placement="top"
        :popper-style="{ maxWidth: '200px' }"
        :show-after="500"
      >
        <template #content>
          Here you can enter a search query. This can be, for example, the title
          of the work or the name of the author.
        </template>
        <el-icon :size="20">
          <InfoFilled />
        </el-icon>
      </el-tooltip>
    </div>
    <el-tooltip
      :popper-style="{ maxWidth: '200px' }"
      effect="dark"
      placement="top"
      :show-after="500"
      content="Pick a color"
    >
      <div class="list-form__color-picker">
        <ElColorPicker v-model="color" @change="$emit('colorPicked', color)" />
      </div>
    </el-tooltip>
    <ElButton @click="$emit('searchBook', query)"> Get books </ElButton>
  </div>
</template>


<script>
import {
  ElInput,
  ElButton,
  ElColorPicker,
  ElTooltip,
  ElIcon,
} from "element-plus";
import { InfoFilled } from "@element-plus/icons-vue";

export default {
  name: "ListForm",
  components: {
    ElInput,
    ElButton,
    ElColorPicker,
    ElTooltip,
    InfoFilled,
    ElIcon,
  },
  props: {
    listColor: {
      type: String,
    },
  },
  setup(_props) {
    const query = ref("");
    const color = ref("#800080");

    if (_props.listColor) {
      color.value = _props.listColor;
    }

    watch(
      () => _props.listColor,
      (newVal) => {
        color.value = newVal;
      }
    );

    return {
      query,
      color,
    };
  },
};
</script>

<style lang="scss" scoped>
.list-form {
  display: flex;
  width: 200px;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-bottom: 30px;
  border: 2px dotted var(--color-2);
  border-radius: 10px;
  padding: 10px;

  &__form-field {
    display: inline-flex;
    color: var(--color-2);
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
  }

  &__color-picker {
    margin-bottom: 10px;
    width: 100%;
  }
}
</style>