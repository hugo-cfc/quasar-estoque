<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/AuthStore';
import useFormValidations from 'src/composables/useFormValidations';
import useNotify from 'src/composables/UseNotify';

const { resetPassword } = useAuthStore();
const router = useRouter();
const { notifySuccess, notifyError } = useNotify();
const { min6 } = useFormValidations();

const form = ref({
  newPassword: '',
});

async function handlePasswordReset() {
  try {
    await resetPassword(form.value.newPassword);

    notifySuccess();

    router.push({
      name: 'login',
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
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-center text-h5">Reset Password</p>

      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="New Password"
          v-model="form.newPassword"
          type="password"
          lazy-rules
          :rules="[min6]"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Send New Password"
            color="primary"
            class="full-width"
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
