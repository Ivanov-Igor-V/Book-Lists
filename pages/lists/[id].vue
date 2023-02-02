<template>
  <div class="book-list">
    <div v-if="isEditMode">
      <div class="book-list__form">
        <div class="book-list__form-field">
          <el-input autofocus placeholder="query" v-model="query" />
          <el-tooltip
            effect="dark"
            placement="right"
            :popper-style="{ maxWidth: '200px' }"
            :show-after="500"
          >
            <template #content>
              Here you can enter a search query. This can be, for example, the
              title of the work or the name of the author.
            </template>
            <el-icon :size="20"><InfoFilled /></el-icon>
          </el-tooltip>
        </div>
        <el-tooltip
          :popper-style="{ maxWidth: '200px' }"
          effect="dark"
          placement="right"
          :show-after="500"
          content="Pick a color"
        >
          <div class="color-picker">
            <ElColorPicker v-model="color" :label="'lol'" />
          </div>
        </el-tooltip>
        <ElButton @click="fetchBooks" :loading="loading">Get books</ElButton>
      </div>
      <Table
        @listUpdated="list = $event"
        @listNameUpdated="listName = $event"
        :books="catalog"
        :list="list"
        :listName="listName"
      />
      <div class="book-list__footer">
        <ElButton @click="updateList">Save</ElButton>
        <ElButton @click="$router.go(-1)">Cancel</ElButton>
      </div>
    </div>
    <div v-else>
      <h2>{{ listName }}</h2>
      <div class="books-info" v-for="(book, index) in list" :key="index">
        <BookInfo class="books-info__item" :info="book" />
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
import Table from "@/components/Table.vue";
import BookInfo from "@/components/BookInfo.vue";
import { InfoFilled } from "@element-plus/icons-vue";

definePageMeta({
  keepalive: false,
});

export default {
  components: {
    ElInput,
    ElButton,
    Table,
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
      useFetch(`${config.public.baseURL}/lists/:${route.params.id}`, {
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
      const { data, error } = useFetch(
        `${config.public.baseURL}/lists/:${route.params.id}`,
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
