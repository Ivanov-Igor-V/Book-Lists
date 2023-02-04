<template>
  <div>
    <div v-if="bp.width > 500" class="table__main">
      <div class="books">
        <div
          v-for="book in list1"
          :key="book.id"
          class="books__item"
          :draggable="true"
          @dragstart="onDragStart($event, book)"
        >
          <TheCard :info="book" @delete="deleteItem" />
        </div>
      </div>

      <div
        class="list"
        @drop="onDrop($event)"
        @dragenter.prevent
        @dragover.prevent
      >
        <el-input
          v-model="title"
          placeholder="name of list"
          class="table__input"
          @change="$emit('listNameUpdated', title)"
        />
        <div
          v-for="book in list2"
          :key="book.id"
          class="books__item"
          :draggable="false"
        >
          <TheCard
            v-if="list1"
            :draggable="false"
            :info="book"
            type="deletable-item"
            @delete="deleteItem"
          />
        </div>
      </div>
    </div>
    <div v-else>kik</div>
  </div>
</template>

<script>
import TheCard from "@/components/TheCard.vue";
import { ElMessage, ElInput } from "element-plus";

export default {
  name: "TheTable",
  components: {
    TheCard,
    ElInput,
  },
  props: {
    books: {
      type: Array,
      required: true,
    },
    list: {
      type: Array,
      required: true,
      default: () => ([]),
    },
    listName: String,
  },
  setup(_props, { emit }) {
    const list1 = ref(_props.books);
    const list2 = ref(_props.list);
    const title = ref(_props.listName);

    watch(
      () => _props.books,
      (newVal) => {
        list1.value = newVal;
      }
    );
    watch(
      () => _props.list,
      (newVal) => {
        list2.value = newVal;
      }
    );
    watch(
      () => _props.listName,
      (newVal) => {
        title.value = newVal;
      }
    );

    const bp = useBreakpoints();

    const onDragStart = (e, item) => {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("itemID", item.id);
    };

    const onDrop = (_e) => {
      const itemIndex = Number(_e.dataTransfer.getData("itemID"));
      if (!itemIndex) return;
      if (list2.value.some((el) => el.id === itemIndex)) {
        return ElMessage("This book has already been added");
      }
      const bookIndex = list1.value.findIndex((el) => el.id === itemIndex);
      list2.value.push(list1.value[bookIndex]);
      emit("listUpdated", list2.value);
    };

    const deleteItem = (_id) => {
      const index = list2.value.findIndex((el) => el.id === _id);
      if (index >= 0) list2.value.splice(index, 1);
    };

    return {
      list1,
      list2,
      title,
      onDrop,
      deleteItem,
      onDragStart,
      bp,
    };
  },
};
</script>

<style lang="scss" scoped>
.table {
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

.books {
  border: 2px dotted var(--color-2);
  border-radius: 10px;
  padding: 10px;
  max-height: 50vh;
  min-height: 150px;
  overflow: auto;

  &__item {
    background: #fff;
    color: black;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: grab;
  }
}

.list {
  border: 2px dotted var(--color-2);
  border-radius: 10px;
  max-height: 50vh;
  min-height: 150px;
  padding: 10px;
  overflow: hidden;

  &__area {
    height: 100%;
  }

  .books__item {
    cursor: initial;
  }
}
</style>
