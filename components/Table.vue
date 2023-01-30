<template>
  <div class="book-list__main">
    <div class="books">
      <div
        class="books__item"
        v-for="book in list1"
        :key="book.id"
        :draggable="true"
        @dragstart="onDragStart($event, book)"
      >
        <Card :info="book" @delete="deleteItem" />
      </div>
    </div>

    <div
      class="list"
      @drop="onDrop($event)"
      @dragenter.prevent
      @dragover.prevent
    >
      <el-input
        placeholder="name of list"
        class="book-list__input"
        v-model="title"
        @change="$emit('listNameUpdated', title)"
      />
      <div
        class="books__item"
        v-for="book in list2"
        :draggable="false"
        :key="book.id"
      >
        <Card
          :info="book"
          v-if="list1"
          type="deletable-item"
          @delete="deleteItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import { ElMessage, ElInput } from "element-plus";

export default {
  components: {
    Card,
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
      default: () => [],
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

    const onDragStart = (e, item) => {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("itemID", item.id);
    };

    const onDrop = (_e) => {
      const itemIndex = Number(_e.dataTransfer.getData("itemID"));
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
