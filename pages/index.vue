<template>
  <div class="lists">
    <div v-if="isListsExists">
      <el-skeleton
        ref="skeleton"
        style="--el-skeleton-circle-size: 100px"
        :loading="loading"
        :count="4"
        animated
      >
        <template #template>
          <div style="padding: 5px">
            <el-skeleton-item variant="h3" style="width: 100%; height: 30px" />
          </div>
        </template>

        <template #default>
          <div v-for="list in lists" :key="list._id" class="lists__item">
            <TheCard
              :info="list"
              type="editable-item"
              @delete="deleteDialogVisible = true"
              @edit="redirectToListUpdate(list._id)"
            />
          </div>
        </template>
      </el-skeleton>
    </div>
    <div v-else>You don't have any lists</div>

    <el-dialog
      v-model="deleteDialogVisible"
      align-center
      :lock-scroll="false"
      title="Warning"
      width="50%"
      center
    >
      <span> Do you want to delete this list? </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialogVisible = false"> Cancel </el-button>
          <el-button type="primary" @click="deleteList(list._id)">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>

    <ElButton class="lists__create-button" @click="redirectToListCreation">
      Create
    </ElButton>
  </div>
</template>

<script>
import { ElButton, ElDialog, ElSkeleton, ElSkeletonItem } from 'element-plus';

export default {
  components: {
    ElButton,
    ElSkeleton,
    ElSkeletonItem,
    ElDialog,
  },
  setup() {
    const lists = ref(null);
    const router = useRouter();
    const loading = ref(false);
    const skeleton = ref(null);

    const getMyLists = async () => {
      loading.value = true;
      await useMyFetch(`/lists`, {
        query: { id: localStorage.id },
        onResponse({ response }) {
          lists.value = response._data;
        },
      });
      loading.value = false;
    };

    const isListsExists = computed(() => {
      if (lists.value === null) return true;
      if (Object.keys(lists.value)?.length === 0) return false;
      return true;
    });

    getMyLists();

    const deleteDialogVisible = ref(false);

    const redirectToListCreation = () => {
      router.push('lists/create');
    };

    const redirectToListUpdate = (_id) => {
      router.push({
        name: 'lists-id',
        params: { id: _id },
        query: { edit: true },
      });
    };

    const deleteList = (_id) => {
      useMyFetch(`/lists/${_id}`, {
        method: 'DELETE',
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
      loading,
      skeleton,
    };
  },
};
</script>

<style lang="scss" scoped>
.lists {
  width: 90%;
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
