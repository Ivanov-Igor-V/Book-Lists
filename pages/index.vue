<template>
  <div class="lists">
    <div v-if="isListsExists">
      <div v-for="list in lists" :key="list._id" class="lists__item">
        <Card
          :info="list"
          type="editable-item"
          @delete="deleteDialogVisible = true"
          @edit="redirectToListUpdate(list._id)"
        />
        <el-dialog
          align-center
          v-model="deleteDialogVisible"
          :lock-scroll="false"
          title="Warning"
          width="50%"
          center
        >
          <span> Do you want to delete this list? </span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="deleteDialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="deleteList(list._id)">
                Confirm
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
    <div v-else>You don't have any lists</div>

    <ElButton @click="redirectToListCreation" class="lists__create-button">
      Create
    </ElButton>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import {  ElButton, ElDialog } from "element-plus";

export default {
  components: {
    Card,
    ElButton,
    ElDialog,
  },
  setup() {
    const lists = ref(null);
    const config = useRuntimeConfig();
    const router = useRouter();

    const getMyLists = () => {
      useFetch(`${config.public.baseURL}/lists`, {
        query: { id: localStorage.id },
        onResponse({ response }) {
          lists.value = response._data;
        },
      });
    };

    const isListsExists = computed(() => {
      if (lists.value === null) return true;
      if (Object.keys(lists.value)?.length === 0) return false;
      return true;
    });

    getMyLists();

    const deleteDialogVisible = ref(false);

    const redirectToListCreation = () => {
      router.push("lists/create");
    };

    const redirectToListUpdate = (_id) => {
      router.push({
        name: "lists-id",
        params: { id: _id },
        query: { edit: true },
      });
    };

    const deleteList = (_id) => {
      useFetch(`${config.public.baseURL}/lists/${_id}`, {
        method: "DELETE",
        onResponse() {
          deleteDialogVisible.value = false;
          getMyLists();
        },
      });
    };

    return {
      lists,
      deleteDialogVisible,
      redirectToListCreation,
      redirectToListUpdate,
      deleteList,
      isListsExists,
    };
  },
};
</script>

<style lang="scss" scoped>
.lists {
  width: 60%;
  display: inline-block;
  text-align: center;
  padding-top: 30px;

  &__item {
    margin-bottom: 5px;
  }

  &__create-button {
    margin-top: 30px;
  }
}
</style>
