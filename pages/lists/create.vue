<template>
  <div class="book-list">
    <div class="book-list__form">
      <div class="book-list__form-field">
        <el-input autofocus placeholder="query" v-model="query" />
        <el-tooltip
          :popper-style="{ maxWidth: '200px' }"
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
      :books="catalog"
      :list="list"
      :listName="listName"
      @listNameUpdated="listName = $event"
    />
    <div class="book-list__footer">
      <ElButton @click="addList">Save</ElButton>
    </div>
  </div>
</template>

<script>
import {
  ElMessage,
  ElInput,
  ElButton,
  ElIcon,
  ElTooltip,
  ElColorPicker,
} from "element-plus";
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
    ElColorPicker,
  },
  setup() {
    const query = ref("");

    const router = useRouter();

    const catalog = ref([]);
    const list = ref([]);
    const listName = ref("");
    const color = ref("#800080");

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

    const addList = async () => {
      const { data, error } = await useFetch(`${config.public.baseURL}/lists`, {
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
    gap: 5px;
  }

  &__main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10%;
    margin-bottom: 20px;
  }
}

.color-picker {
  margin-bottom: 10px;
  width: 100%;
}
</style>
