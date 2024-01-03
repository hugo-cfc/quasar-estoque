<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/AuthStore';
import useNotify from 'src/composables/UseNotify';
import useFormValidations from 'src/composables/useFormValidations';

const { register } = useAuthStore();
const router = useRouter();
const { notifySuccess, notifyError } = useNotify();
const { isRequired, min6 } = useFormValidations();

const form = ref({
  name: '',
  email: '',
  password: '',
});

async function handleRegister() {
  try {
    await register(form.value);

    notifySuccess();

    router.push({
      name: 'email-confirmation',
      query: { email: form.value.email },
    });
  } catch (error) {
    if (error instanceof Error) {
      notifyError(error.message);
    }
  }
}
</script>

<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-center text-h5">Register</p>

      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input label="Name" v-model="form.name" :rules="[isRequired]" />

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
          lazy-rules
          :rules="[min6]"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            type="submit"
          />

          <q-btn
            label="Back"
            color="primary"
            class="full-width"
            type="submit"
            flat
            :to="{ name: 'login' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
