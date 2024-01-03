<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/AuthStore';
import useNotify from 'src/composables/UseNotify';
import useFormValidations from 'src/composables/useFormValidations';

const { sendPasswordRestEmail } = useAuthStore();
const { notifySuccess, notifyError } = useNotify();
const { isRequired } = useFormValidations();

const form = ref({
  email: '',
});

async function handleForgotPassword() {
  try {
    await sendPasswordRestEmail(form.value.email);

    notifySuccess();
  } catch (error) {
    if (error instanceof Error) {
      notifyError(error.message);
    }
  }
}
</script>

<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
      <p class="col-12 text-center text-h5">Forgot Password</p>

      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="E-mail"
          v-model="form.email"
          :rules="[isRequired]"
          type="email"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Send Reset Email"
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
