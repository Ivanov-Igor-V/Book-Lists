<template>
  <div class="card">
    <div class="card__title">{{ info.title || info.name }}</div>

    <div class="card__icons">
      <Edit
        :height="16"
        v-if="type === 'editable-item'"
        color="white"
        @click="$emit('edit', info.id)"
      />
      <Delete
        :height="16"
        v-if="type === 'deletable-item' || type === 'editable-item'"
        color="white"
        @click="$emit('delete', info.id)"
      />
    </div>
  </div>
</template>

<script>
import { Delete, Edit } from "@element-plus/icons-vue";
import { ElTooltip } from "element-plus";

export default {
  props: {
    type: {
      type: String,
      default: "item",
      validator(value) {
        return ["item", "deletable-item", "editable-item"].includes(value);
      },
    },
    info: Object,
  },
  components: {
    Delete,
    ElTooltip,
    Edit,
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: var(--color-2);
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  position: relative;

  &__title {
    width: 80%;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
