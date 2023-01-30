<template>
  <div class="book-list">
    <div class="book-list__form">
      <div class="book-list__form-field">
        <el-input autofocus placeholder="query" v-model="query" />
        <el-tooltip
          trigger="click"
          effect="dark"
          placement="right"
          :show-after="500"
        >
          <template #content>
            Here you can enter a search query. This can be, for example, the
            title of the work or the name of the author.
          </template>
          <el-icon :size="20"><InfoFilled /></el-icon>
        </el-tooltip>
      </div>

      <ElButton @click="fetchBooks" :loading="loading">Get books</ElButton>
    </div>
    <Table
      @listUpdated="list = $event"
      :books="catalog"
      :list="list"
      :listName="listName"
      @listNameUpdated="listName = $event"
    />
    <div class="book-list__footer">
      <ElButton @click="addList" type="success">Save</ElButton>
    </div>
  </div>
</template>

<script>
import { ElMessage, ElInput, ElButton, ElIcon, ElTooltip } from "element-plus";
import { InfoFilled } from "@element-plus/icons-vue";
import Table from "@/components/Table.vue";
export default {
  components: {
    ElInput,
    ElButton,
    Table,
    InfoFilled,
    ElIcon,
    ElTooltip,
  },
  setup() {
    const query = ref("");

    const router = useRouter();

    const catalog = ref([]);
    const list = ref([]);
    const listName = ref("");

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

    const addList = () => {
      useFetch(`${config.public.baseURL}/lists`, {
        method: "POST",
        body: { name: listName.value, list: list.value, user: localStorage.id },
        onResponse({ response }) {
          listName.value = response._data?.name;
          list.value = response._data?.list;
          router.push("/");
        },
      });
    };

    return {
      query,
      fetchBooks,
      catalog,
      list,
      loading,
      listName,

      addList,
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
    margin-bottom: 30px;
    border: 2px dotted var(--color-2);
    border-radius: 10px;
    padding: 10px;
  }

  &__form-field {
    display: inline-flex;
    color: var(--color-2);
    gap: 5px;
    align-items: center;
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
