<template>
  <div class="card">
    <div class="card__title">{{ info.title || info.name }}</div>

    <div class="card__icons">
      <Document
        :height="16"
        v-if="type === 'editable-item'"
        color="white"
        @click="redirectToListInfo(info.id || info._id)"
      />
      <Edit
        :height="16"
        v-if="type === 'editable-item'"
        color="white"
        @click="$emit('edit', info.id || info._id)"
      />
      <Delete
        :height="16"
        v-if="type === 'deletable-item' || type === 'editable-item'"
        color="white"
        @click="$emit('delete', info.id || info._id)"
      />
    </div>
  </div>
</template>

<script>
import { Delete, Edit, Document } from "@element-plus/icons-vue";
import { ElTooltip, ElDialog, ElButton } from "element-plus";

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
    Document,
    ElDialog,
    ElButton,
  },
  setup() {
    const router = useRouter();
    const redirectToListInfo = (_id) => {
      router.push(`lists/${_id}`);
    };

    return { redirectToListInfo };
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
