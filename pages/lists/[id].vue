<template>
  <div class="book-list">
    <div v-if="isEditMode">
      <div class="book-list__form">
        <el-input
          placeholder="Please input"
          class="book-list__input"
          v-model="query"
        />
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
        <ElButton @click="updateList" >Save</ElButton>
        <ElButton @click="$router.go(-1)" >Cancel</ElButton>
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
import { ElMessage, ElInput, ElButton } from "element-plus";
import Table from "@/components/Table.vue";
import BookInfo from "@/components/BookInfo.vue";

export default {
  components: {
    ElInput,
    ElButton,
    Table,
    BookInfo,
  },
  setup() {
    const query = ref("");
    const route = useRoute();
    const router = useRouter();

    const isEditMode = computed(() => !!route.query.edit);

    const catalog = ref([]);
    const list = ref([]);
    const listName = ref(null);

    const loading = ref(false);

    const fetchBooks = () => {
      if (!query.value) return ElMessage("Please enter name of the author");
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
        },
      });
    };

    getListDetails();

    const updateList = () => {
      useFetch(`${config.public.baseURL}/lists/:${route.params.id}`, {
        method: "PUT",
        body: { list: list.value, name: listName.value },
        onResponse() {
          router.push("/");
        },
      });
    };

    const deleteItem = (_id) => {
      const index = list.value.findIndex((el) => el.id === _id);
      if (index >= 0) list.value.splice(index, 1);
    };

    return {
      query,
      catalog,
      list,
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

  &__input {
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
</style>
