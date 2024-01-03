<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/AuthStore';
import useNotify from 'src/composables/UseNotify';
import useFormValidations from 'src/composables/useFormValidations';

const { login } = useAuthStore();
const router = useRouter();
const { notifySuccess, notifyError } = useNotify();
const { isRequired } = useFormValidations();
const { isLoggedIn } = useAuthStore();

const form = ref({
  email: '',
  password: '',
});

async function handleLogin() {
  try {
    await login(form.value);

    notifySuccess('Login successfully');

    router.replace({ name: 'me' });
  } catch (error) {
    if (error instanceof Error) {
      notifyError(error.message);
    }
  }
}

onMounted(() => {
  if (isLoggedIn) {
    router.push({ name: 'me' });
  }
});
</script>

<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-center text-h5">Login</p>

      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="E-mail"
          v-model="form.email"
          :rules="[isRequired]"
          lazy-rules
          type="email"
        />

        <q-input
          label="Password"
          v-model="form.password"
          :rules="[isRequired]"
          lazy-rules
        />

        <div class="full-width q-pt-md">
          <q-btn
            label="Login"
            color="primary"
            class="full-width"
            type="submit"
          />
        </div>

        <div class="full-width q-gutter-y-sm">
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            flat
            size="sm"
            to="/register"
          />

          <q-btn
            label="Forgot Password"
            color="primary"
            class="full-width"
            flat
            size="sm"
            to="/forgot-password"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
