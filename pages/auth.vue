<template>
  <div class="auth">
    <el-switch
      v-model="isLogin"
      class="auth__switch"
      size="large"
      active-text="LogIn"
      inactive-text="SignUp"
    />
    <transition-group name="list">
      <ElForm>
        <el-form-item>
          <el-input v-model="email" placeholder="email" />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="password"
            type="password"
            placeholder="password"
            show-password
          />
        </el-form-item>
        <el-form-item v-if="!isLogin">
          <el-input v-model="name" placeholder="name" />
        </el-form-item>
      </ElForm>
    </transition-group>

    <el-button class="auth__confirm" @click="sendForm">
      {{ buttonText }}
    </el-button>
  </div>
</template>

<script>
import {
  ElInput,
  ElMessage,
  ElButton,
  ElFormItem,
  ElSwitch,
  ElForm,
} from "element-plus";

definePageMeta({
  layout: "auth",
});

export default {
  components: {
    ElInput,
    ElButton,
    ElFormItem,
    ElSwitch,
    ElForm,
  },
  setup() {
    const router = useRouter();

    const email = ref(null);
    const name = ref(null);
    const password = ref(null);
    const isLogin = ref(true);
    const errors = ref(null);

    const buttonText = computed(() => (isLogin.value ? "SignUp" : "SignIn"));

    const config = useRuntimeConfig();

    const loginHandler = async () => {
      const { data, error } = await useFetch(`${config.public.baseURL}/login`, {
        method: "POST",
        body: { email: email.value, password: password.value },
      });
      if (error.value) {
        ElMessage(error.value.data.errors[0])
        return;
      }
      if (data.value.token) {
        localStorage.setItem("token", data.value.token);
        localStorage.setItem("id", data.value.id);
        localStorage.setItem("name", data.value.name);
        router.push("/");
      }
    };

    const registrationHandler = async () => {
      const { data, error } = await useFetch(
        `${config.public.baseURL}/registration`,
        {
          method: "POST",
          body: {
            name: name.value,
            email: email.value,
            password: password.value,
          },
        }
      );

      if (error.value) {
        ElMessage(error.value.data.errors[0])
        return;
      }

      if (data.value.token) {
        localStorage.setItem("token", data.value.token);
        // TODO put id into store
        localStorage.setItem("id", data.value.id);
        router.push("/");
      }
    };

    const sendForm = () => {
      if (isLogin.value) {
        return loginHandler();
      }

      registrationHandler();
    };

    return {
      name,
      email,
      password,
      errors,
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
