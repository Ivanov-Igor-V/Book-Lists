<template>
  <div>
    <h2>Hi! My name is Igor, i'm a frontend developer!</h2>
    <h4>Contact me:</h4>
    <div class="list">
      <div class="list__item">
        <div>telegram</div>
        <a href="https://t.me/garry_c_john" target="_blank">garry_c_john</a>
      </div>
      <div class="list__item">
        <div>whatsApp</div>
        <a href="https://wa.me/+79101528290" target="_blank">Igor Ivanov</a>
      </div>
      <div class="list__item">
        <div>email</div>
        <a href="mailto:ivanov2934@gmail.com" target="_blank"
          >ivanov2934@gmail.com</a
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  background: var(--color-9);
  border-radius: 10px;
  margin: auto;
  max-width: 300px;
  display: grid;

  &__item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 5px;

    p {
      padding-right: 10px;
    }
  }
}
</style>
