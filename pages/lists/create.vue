<template>
  <div class="book-list">
    <ListForm
      @colorPicked="onColorPick"
      @searchBook="fetchBooks"
      @queryChanged="onQueryChange"
    />
    <TheTable
      :books="catalog"
      :list="list"
      :list-name="listName"
      @listUpdated="list = $event"
      @listNameUpdated="listName = $event"
    />
    <div class="book-list__footer">
      <ElButton @click="addList"> Save </ElButton>
    </div>
  </div>
</template>

<script>
import { ElMessage, ElButton } from "element-plus";
import TheTable from "@/components/TheTable.vue";
import ListForm from "~~/components/ListForm.vue";

export default {
  components: {
    ElButton,
    TheTable,
    ListForm,
  },
  setup() {
    const query = ref("");

    const router = useRouter();

    const catalog = ref([]);
    const list = ref([]);
    const listName = ref("");
    const color = ref("#800080");

    const loading = ref(false);

    const fetchBooks = async () => {
      const { data } = await useGutendex(query.value);

      if (data) {
        catalog.value = data.results;
      }
    };

    const onQueryChange = (_newQuery) => {
      query.value = _newQuery;
    };

    const addList = async () => {
      const { error } = await useMyFetch(`/lists`, {
        method: "POST",
        body: {
          name: listName.value,
          list: list.value,
          color: color.value,
          user: localStorage.id,
        },
      });
      if (error.value) {
        ElMessage(error.value.data.errors[0]);
        return;
      }
      router.push("/");
    };

    return {
      query,
      fetchBooks,
      catalog,
      color,
      list,
      loading,
      listName,
      addList,
      onQueryChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.book-list {
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

  &__main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10%;
    margin-bottom: 20px;
  }
}
</style>
