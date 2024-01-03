<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <q-page padding>
    <p class="text-h5 text-center">Thanks for registering!</p>

    <p class="text-body1 text-center">
      Please, confirm your e-mail to finishing registering:
      <strong>{{ route.query.email }}</strong>
    </p>

    <div class="row justify-center">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-btn
          label="Back to Login"
          color="primary"
          class="full-width"
          flat
          to="/login"
        />
      </div>
    </div>
  </q-page>
</template>
