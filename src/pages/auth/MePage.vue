<script setup lang="ts">
import { useAuthStore } from 'src/stores/AuthStore';
import { computed } from 'vue';

const authStore = useAuthStore();

const user = computed(() => authStore.user);
</script>

<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <p>Hello {{ user?.user_metadata?.name }}</p>
    </div>
  </q-page>
</template>
