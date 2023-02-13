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
      <div v-if="!isLogin" class="auth__form">
        <ElForm>
          <el-form-item>
            <el-input v-model="email" autofocus placeholder="email" />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="password"
              type="password"
              placeholder="password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-input v-model="name" placeholder="name" />
          </el-form-item>
        </ElForm>
      </div>
      <div v-else class="auth__form">
        <ElForm>
          <el-form-item>
            <el-input v-model="email" autofocus placeholder="email" />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="password"
              type="password"
              placeholder="password"
              show-password
            />
          </el-form-item>
        </ElForm>
      </div>
    </transition-group>

    <el-button :loading="loading" class="auth__confirm" @click="sendForm">
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
  ElLoading,
} from 'element-plus';

import { useMagicKeys } from '@vueuse/core';

definePageMeta({
  layout: 'auth',
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

    const { enter } = useMagicKeys();
    watchEffect(() => {
      if (enter.value) {
        sendForm();
      }
    });

    const email = ref(null);
    const name = ref(null);
    const password = ref(null);
    const isLogin = ref(true);
    const loading = ref(false);
    const buttonText = computed(() => (isLogin.value ? 'SignUp' : 'SignIn'));

    const loginHandler = async () => {
      loading.value = true;
      const { data, error } = await useMyFetch(`/login`, {
        method: 'POST',
        body: { email: email.value, password: password.value },
      });
      loading.value = false;

      if (error.value) {
        if (!error.value.data?.errors.length) return;
        ElMessage(error.value.data?.errors[0]);
        return;
      }
      if (data.value.token) {
        localStorage.setItem('token', data.value.token);
        localStorage.setItem('id', data.value.id);
        localStorage.setItem('name', data.value.name);
        router.push('/');
      }
    };

    const registrationHandler = async () => {
      loading.value = true;

      const { data, error } = await useMyFetch(`/registration`, {
        method: 'POST',
        body: {
          name: name.value,
          email: email.value,
          password: password.value,
        },
      });

      if (error.value) {
        ElMessage(error.value.data.errors[0]);
        return;
      }

      if (data.value.token) {
        loading.value = false;

        localStorage.setItem('token', data.value.token);
        // TODO put id into store
        localStorage.setItem('id', data.value.id);
        router.push('/');
      }
    };

    const sendForm = () => {
      if (isLogin.value) {
        return loginHandler();
      }

      registrationHandler();
    };

    return {
      loading,
      name,
      email,
      password,
      sendForm,
      isLogin,
      buttonText,
      openFullScreen2,
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
  height: 250px;

  &__form {
    position: absolute;
    top: 60px;
  }

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
}
</style>
