<template>
  <div>
    <h2>Hi! My name is Igor, i'm a frontend developer!</h2>
    <h4>Contact me:</h4>
    <div class="list">
      <div class="list__item">
        <p>telegram</p>
        <ElLink href="https://t.me/garry_c_john" target="_blank"
          >garry_c_john</ElLink
        >
      </div>
      <div class="list__item">
        <p>whatsApp</p>
        <ElLink href="https://wa.me/+79101528290" target="_blank"
          >Igor Ivanov</ElLink
        >
      </div>
      <div class="list__item">
        <p>email</p>
        <ElLink href="mailto:ivanov2934@gmail.com" target="_blank"
          >ivanov2934@gmail.com</ElLink
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ElLink } from "element-plus";

export default {
  components: {
    ElLink,
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      padding-right: 10px;
    }
  }
}
</style>
