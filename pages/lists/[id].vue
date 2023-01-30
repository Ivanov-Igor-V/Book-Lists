<template>
  <div class="book-list">
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
      <ElButton @click="updateList" type="success">Save</ElButton>
    </div>
  </div>
</template>

<script>
import { ElMessage, ElInput, ElButton } from "element-plus";
import Table from "@/components/Table.vue";

export default {
  components: {
    ElInput,
    ElButton,
    Table,
  },
  setup() {
    const query = ref("");
    const route = useRoute();
    const router = useRouter();

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

      fetchBooks,
      updateList,
      deleteItem,
      getListDetails,
    };
  },
};
</script>

<style lang="scss">
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
</style>
