<template>
  <div class="book-info" :style="{ background: listColor }">
    <div
      class="book-info__title"
      :style="{ background: listColor, color: textColor }"
      @click="isInfoDialogOpen = true"
    >
      {{ info.title }}
    </div>
    <div class="book-info__icons">
      <InfoFilled
        :height="16"
        :color="textColor"
        @click="isInfoDialogOpen = true"
      />
    </div>
    <el-dialog
      v-model="isInfoDialogOpen"
      :show-close="false"
      :lock-scroll="false"
      center
      :fullscreen="breakpoints.width < 500"
      width="80%"
    >
      <div class="book-details" v-if="breakpoints.width > 500">
        <div class="book-details__text">
          <h2>{{ info.title }}</h2>
          <div class="book-details__item">
            <h4>Author:</h4>
            <span> {{ info.authors[0].name }} </span>
          </div>
          <div v-if="info.bookshelves.length > 0" class="book-details__item">
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

      <div class="book-details book-details--mobile" v-else>
        <h2>{{ info.title }}</h2>

        <el-image :src="info.formats['image/jpeg']" :alt="info.title" />

        <div class="book-details__text">
          <div class="book-details__item book-details__item--mobile">
            <h4>Author:</h4>
            <span> {{ info.authors[0].name }} </span>
          </div>
          <div
            v-if="info.bookshelves.length > 0"
            class="book-details__item book-details__item--mobile"
          >
            <h4>Genres:</h4>
            <p v-for="(genre, index) in info.bookshelves" :key="index">
              {{ genre }}
            </p>
          </div>
          <div class="book-details__item book-details__item--mobile">
            <h4>Link for reading:</h4>
            <a :href="linkToRead" target="_blank">
              {{ info.title }}
            </a>
          </div>
        </div>
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
import { ElDialog, ElButton, ElImage } from "element-plus";
import { useContrastColor } from "@/composables/useContrastColor.js";

export default {
  name: "BookInfo",
  components: {
    InfoFilled,
    ElDialog,
    ElButton,
    ElImage,
  },
  props: {
    info: Object,
    listColor: {
      type: String,
      default: "#800080",
    },
  },
  setup(_props) {
    const isInfoDialogOpen = ref(false);
    const breakpoints = useBreakpoints();

    const textColor = useContrastColor(_props.listColor);

    const linkToRead = computed(() => _props.info.formats["text/html"]);

    return { isInfoDialogOpen, linkToRead, textColor, breakpoints };
  },
};
</script>

<style lang="scss" scoped>
.book-info {
  background: var(--color-2);
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  position: relative;
  border-radius: 10px;

  h2 {
    word-break: keep-all;
  }

  &__title {
    width: 80%;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
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

  &__item--mobile {
    justify-content: center;
  }

  img {
    margin-left: 20px;
  }
}

.book-details--mobile {
  flex-direction: column;
  text-align: center;
  gap: 15px;
}
</style>
