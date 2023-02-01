<template>
  <div class="book-info">
    <div class="book-info__toggler" @click="isInfoDialogOpen = true">
      <div class="book-info__title">{{ info.title }}</div>
      <div class="book-info__icons">
        <InfoFilled :height="16" color="white" />
      </div>
    </div>
    <el-dialog
      :show-close="false"
      v-model="isInfoDialogOpen"
      :lock-scroll="false"
      center
      width="80%"
    >
      <div class="book-details">
        <div>
          <h2>{{ info.title }}</h2>
          <div :style="{ display: 'inline-flex', alignItems: 'center' }">
            <h4>Author:</h4>
            <span> {{ info.authors[0].name }} </span>
          </div>
          <div>
            <h4>Genres:</h4>
            <p v-for="(genre, index) in info.bookshelves" :key="index">
              {{ genre }}
            </p>
          </div>
          <div>
            <h4>Link for reading:</h4>
            <ElLink :href="linkToReElLinkd" target="_blank">
              {{ info.title }}
            </ElLink>
          </div>
        </div>

        <img :src="info.formats['image/jpeg']" :alt="info.title" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="isInfoDialogOpen = false">
            OK
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { InfoFilled } from "@element-plus/icons-vue";
import { ElTooltip, ElDialog, ElButton, ElLink } from "element-plus";
import { onClickOutside } from "@vueuse/core";

export default {
  name: "BookInfo",
  props: {
    info: Object,
  },
  components: {
    InfoFilled,
    ElTooltip,
    ElDialog,
    ElButton,
    ElLink
  },
  setup(_props) {
    const isInfoDialogOpen = ref(false);

    const linkToRead = computed(() => _props.info.formats['text/html']);

    // onClickOutside(dropdown, () => (isInfoDialogOpen.value = false));

    return { isInfoDialogOpen, linkToRead };
  },
};
</script>

<style lang="scss" scoped>
.book-info {
  color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  &__toggler {
    background: var(--color-2);
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    position: relative;
    border-radius: 10px;
    cursor: pointer;
  }

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
    right: 10px;
    margin-right: 5px;
    gap: 5px;
    display: inline-flex;
  }
}

.book-details {
  display: flex;
  justify-content: space-around;

  img {
    margin-left: 20px;
  }
}
</style>
