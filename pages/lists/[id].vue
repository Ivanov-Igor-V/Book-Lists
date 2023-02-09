<template>
  <div class="book-list">
    <div v-if="isEditMode">
      <ListForm
        :list-color="color"
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
import { ElMessage, ElButton } from "element-plus";
import TheTable from "~~/components/TheTable.vue";
import ListForm from "~~/components/ListForm.vue";
import BookInfo from "@/components/BookInfo.vue";

definePageMeta({
  keepalive: false,
});

export default {
  components: {
    ElButton,
    TheTable,
    BookInfo,
    ListForm,
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

    const fetchBooks = async () => {
      const { data } = await useGutendex(query.value);

      if (data) {
        catalog.value = data.results;
      }
    };

    const onColorPick = (_newColor) => {
      color.value = _newColor;
    };

    const onQueryChange = (_newQuery) => {
      query.value = _newQuery;
    };

    const getListDetails = () => {
      useMyFetch(`/lists/${route.params.id}`, {
        onResponse({ response }) {
          listName.value = response._data?.name;
          list.value = response._data?.list;
          color.value = response._data?.color;
        },
      });
    };

    getListDetails();

    const updateList = async () => {
      const { error } = await useMyFetch(`/lists/${route.params.id}`, {
        method: "PUT",
        body: {
          name: listName.value,
          list: list.value,
          color: color.value,
        },
      });
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

      onColorPick,
      onQueryChange,

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
  text-align: center;

  &__main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10%;
    margin-bottom: 20px;
  }

  &__footer {
    display: flex;
    justify-content: center;
  }
}

.books-info {
  &__item {
    margin-bottom: 10px;
  }
}
</style>
