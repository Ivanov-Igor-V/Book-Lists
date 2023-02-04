<template>
  <div class="book-list">
    <div v-if="isEditMode">
      <div class="book-list__form">
        <div class="book-list__form-field">
          <el-input v-model="query" autofocus placeholder="query" />
          <el-tooltip
            effect="dark"
            placement="top"
            :popper-style="{ maxWidth: '200px' }"
            :show-after="500"
          >
            <template #content>
              Here you can enter a search query. This can be, for example, the
              title of the work or the name of the author.
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
          <div class="color-picker">
            <ElColorPicker v-model="color" />
          </div>
        </el-tooltip>
        <ElButton :loading="loading" @click="fetchBooks"> Get books </ElButton>
      </div>
      <TheTable
        :books="catalog"
        :list="list"
        :list-name="listName"
        @listUpdated="list = $event"
        @listNameUpdated="listName = $event"
      />
      <div class="book-list__footer">
        <ElButton @click="updateList"> Save </ElButton>
        <ElButton @click="$router.go(-1)"> Cancel </ElButton>
      </div>
    </div>
    <div v-else>
      <h2>{{ listName }}</h2>

      <div v-for="(book, index) in list" :key="index" class="books-info">
        <BookInfo class="books-info__item" :info="book" :list-color="color" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  ElMessage,
  ElInput,
  ElButton,
  ElColorPicker,
  ElTooltip,
  ElIcon,
} from "element-plus";
import TheTable from "~~/components/TheTable.vue";
import BookInfo from "@/components/BookInfo.vue";
import { InfoFilled } from "@element-plus/icons-vue";

definePageMeta({
  keepalive: false,
});

export default {
  components: {
    ElInput,
    ElButton,
    TheTable,
    BookInfo,
    ElColorPicker,
    ElTooltip,
    InfoFilled,
    ElIcon,
  },
  setup() {
    const query = ref("");
    const route = useRoute();
    const router = useRouter();

    const isEditMode = computed(() => !!route.query.edit);

    const catalog = ref([]);
    const list = ref([]);
    const listName = ref(null);
    const color = ref("#800080");

    const loading = ref(false);

    const fetchBooks = () => {
      if (!query.value) return ElMessage("Please enter your query");
      loading.value = true;

      useFetch("https://gutendex.com/books", {
        query: { search: query.value },
        onResponse({ response }) {
          catalog.value = response._data.results;
          loading.value = false;
        },
      });
    };

    const config = useRuntimeConfig();

    const getListDetails = () => {
      useFetch(`${config.public.baseURL}/lists/${route.params.id}`, {
        method: "GET",
        onResponse({ response }) {
          listName.value = response._data?.name;
          list.value = response._data?.list;
          color.value = response._data?.color;
        },
      });
    };

    getListDetails();

    const updateList = async () => {
      const { error } = await useFetch(
        `${config.public.baseURL}/lists/${route.params.id}`,
        {
          method: "PUT",
          body: {
            name: listName.value,
            list: list.value,
            color: color.value,
          },
        }
      );
      if (error.value) {
        ElMessage(error.value.data.errors[0]);
        return;
      }
      router.push("/");
    };

    const deleteItem = (_id) => {
      const index = list.value.findIndex((el) => el.id === _id);
      if (index >= 0) list.value.splice(index, 1);
    };

    return {
      query,
      catalog,
      list,
      color,
      listName,
      loading,

      isEditMode,

      fetchBooks,
      updateList,
      deleteItem,
      getListDetails,
    };
  },
};
</script>

<style lang="scss" scoped>
.book-list {
  padding: 20px;
  text-align: center;

  &__form {
    display: flex;
    width: 200px;
    flex-direction: column;
    align-items: center;
    margin: auto;
    margin-bottom: 10px;
  }

  &__form-field {
    display: inline-flex;
    color: var(--color-2);
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
  }

  &__main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10%;
    margin-bottom: 20px;
  }
}

.books-info {
  &__item {
    margin-bottom: 10px;
  }
}

.color-picker {
  margin-bottom: 10px;
  width: 100%;
}
</style>
