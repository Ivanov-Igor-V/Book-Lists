<template>
  <div class="auth">
    <el-switch
      class="auth__switch"
      v-model="isLogin"
      size="large"
      active-text="LogIn"
      inactive-text="SignUp"
    />
    <transition-group name="list">
      <el-form-item>
        <el-input placeholder="email" v-model="email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          placeholder="password"
          v-model="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item v-if="!isLogin">
        <el-input placeholder="name" v-model="name"></el-input>
      </el-form-item>
    </transition-group>

    <el-button @click="sendForm" class="auth__confirm">
      {{ buttonText }}</el-button
    >
  </div>
</template>

<script>
import { ElInput, ElButton, ElFormItem, ElSwitch } from "element-plus";

definePageMeta({
  layout: "auth",
});

export default {
  components: {
    ElInput,
    ElButton,
    ElFormItem,
    ElSwitch,
  },
  setup() {
    const router = useRouter();

    const email = ref(null);
    const name = ref(null);
    const password = ref(null);
    const isLogin = ref(true);

    const buttonText = computed(() => (isLogin.value ? "SignUp" : "SignIn"));

    const config = useRuntimeConfig();

    const sendForm = async () => {
      if (isLogin.value) {
        const { data, error } = await useFetch(
          `${config.public.baseURL}/login`,
          {
            method: "POST",
            body: { email: email.value, password: password.value },
          }
        );

        if (data.value.token) {
          localStorage.setItem("token", data.value.token);
          localStorage.setItem("id", data.value.id);
          localStorage.setItem("name", data.value.name);
          router.push("/");
        }

        return;
      }

      const { data, error } = await useFetch(
        `${config.public.baseURL}/registration`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: {
            name: name.value,
            email: email.value,
            password: password.value,
          },
        }
      );

      if (data.value.token) {
        localStorage.setItem("token", data.value.token);
        // TODO put id intp store
        localStorage.setItem("id", data.value.id);
        router.push("/");
      }
    };

    return {
      name,
      email,
      password,
      sendForm,
      isLogin,
      buttonText,
    };
  },
};
</script>

<style scoped lang="scss">
.auth {
  flex-direction: column;
  display: flex;
  max-width: 200px;
  align-self: center;
  position: absolute;
  top: 30px;
  height: 80%;

  &__switch {
    margin-bottom: 18px;
  }

  &__confirm {
    position: absolute;
    bottom: 0;
    min-width: 150px;
    left: 50%;
    transform: translate(-50%);
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
