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
        <div class="book-details__text">
          <h2>{{ info.title }}</h2>
          <div class="book-details__item">
            <h4>Author:</h4>
            <span> {{ info.authors[0].name }} </span>
          </div>
          <div class="book-details__item" v-if="info.bookshelves.length > 0">
            <h4>Genres:</h4>
            <p v-for="(genre, index) in info.bookshelves" :key="index">
              {{ genre }}
            </p>
          </div>
          <div class="book-details__item">
            <h4>Link for reading:</h4>
            <a :href="linkToRead" target="_blank">
              {{ info.title }}
            </a>
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
    ElLink,
  },
  setup(_props) {
    const isInfoDialogOpen = ref(false);

    const linkToRead = computed(() => _props.info.formats["text/html"]);

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

  h2 {
    word-break: keep-all;
  }

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

  &__text {
    display: flex;
    flex-direction: column;
  }

  &__item {
    display: inline-flex;
    gap: 5px;
    align-items: center;
    justify-content: flex-start;
  }

  img {
    margin-left: 20px;
  }
}
</style>