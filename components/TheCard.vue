<template>
  <div
    class="card"
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
        placement="right"
        :show-after="500"
      >
        <template #content> Open details </template>
        <el-icon>
          <Document
            :height="16"
            :color="textColor"
            @click="redirectToListInfo(info.id || info._id)"
          />
        </el-icon>
      </el-tooltip>

      <el-tooltip
        v-if="type === 'editable-item'"
        :popper-style="{ maxWidth: '200px' }"
        effect="dark"
        placement="right"
        :show-after="500"
      >
        <template #content> Edit list </template>
        <el-icon>
          <Edit
            :height="16"
            :color="textColor"
            @click="$emit('edit', info.id || info._id)"
          />
        </el-icon>
      </el-tooltip>

      <el-tooltip
        v-if="type === 'deletable-item' || type === 'editable-item'"
        :popper-style="{ maxWidth: '200px' }"
        effect="dark"
        placement="right"
        :show-after="500"
      >
        <template #content> Delete list </template>
        <el-icon>
          <Delete
            v-if="type === 'deletable-item' || type === 'editable-item'"
            :height="16"
            :color="textColor"
            @click="$emit('delete', info.id || info._id)"
          />
        </el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { Delete, Edit, Document } from "@element-plus/icons-vue";
import { ElTooltip, ElIcon } from "element-plus";

export default {
  name: "TheCard",
  components: {
    Delete,
    ElTooltip,
    Edit,
    Document,
    ElIcon,
  },
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
  setup(_props) {
    const router = useRouter();
    const redirectToListInfo = (_id) => {
      router.push(`lists/${_id}`);
    };

    const textColor = useContrastColor(_props.info.color);

    return { redirectToListInfo, getContrastColor, textColor };
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
  outline: 1px solid var(--color-2);
  position: relative;

  &__title {
    width: 80%;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
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