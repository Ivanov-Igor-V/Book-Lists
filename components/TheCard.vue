<template>
  <div
    class="card"
    :class="{ 'card--mobile': type === 'mobile-card' }"
    :style="{
      background: info?.color,
      color: info.color ? textColor : '',
    }"
  >
    <div class="card__title">
      {{ info.title || info.name }}
    </div>

    <div class="card__icons">
      <el-tooltip
        v-if="type === 'editable-item'"
        :popper-style="{ maxWidth: '200px' }"
        effect="dark"
        placement="top"
        :show-after="500"
      >
        <template #content> Open details </template>
        <el-icon :size="28">
          <Document
            :color="textColor"
            @click="redirectToListInfo(info.id || info._id)"
          />
        </el-icon>
      </el-tooltip>

      <el-tooltip
        v-if="type === 'editable-item'"
        :popper-style="{ maxWidth: '200px' }"
        effect="dark"
        placement="top"
        :show-after="500"
      >
        <template #content> Edit list </template>
        <el-icon :size="28">
          <Edit
            :color="textColor"
            @click="$emit('edit', info.id || info._id)"
          />
        </el-icon>
      </el-tooltip>

      <el-tooltip
        v-if="type === 'deletable-item' || type === 'editable-item'"
        :popper-style="{ maxWidth: '200px' }"
        effect="dark"
        placement="top"
        :show-after="500"
      >
        <template #content> Delete list </template>
        <el-icon :size="28">
          <Delete
            v-if="type === 'deletable-item' || type === 'editable-item'"
            :color="textColor"
            @click="$emit('delete', info.id || info._id)"
          />
        </el-icon>
      </el-tooltip>

      <el-icon
        v-if="type === 'mobile-card'"
        color="white"
        @click="$emit('addItem')"
      >
        <Plus />
      </el-icon>
    </div>
  </div>
</template>

<script>
import { Delete, Edit, Document, Plus } from '@element-plus/icons-vue';
import { ElTooltip, ElIcon } from 'element-plus';
import { useContrastColor } from '@/composables/useContrastColor.js';

export default {
  name: 'TheCard',
  components: {
    Delete,
    ElTooltip,
    Edit,
    Document,
    ElIcon,
    Plus,
  },
  props: {
    type: {
      type: String,
      default: 'item',
      validator(value) {
        return [
          'item',
          'mobile-card',
          'deletable-item',
          'editable-item',
        ].includes(value);
      },
    },
    info: Object,
  },
  setup(_props) {
    const router = useRouter();
    const redirectToListInfo = (_id) => {
      router.push(`lists/${_id}`);
    };

    const textColor = useContrastColor(_props.info.color);

    return { redirectToListInfo, textColor };
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: var(--color-2);
  padding: 5px 10px;
  color: var(--color-8);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  outline: 1px solid var(--color-2);
  position: relative;

  &__title {
    width: 80%;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
  }

  &__icons {
    position: absolute;
    cursor: pointer;
    right: 0;
    margin-right: 5px;
    gap: 5px;
    display: inline-flex;
  }
}
</style>
