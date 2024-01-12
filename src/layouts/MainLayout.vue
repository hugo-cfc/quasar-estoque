<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/AuthStore';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Home',
    caption: '',
    icon: 'mdi-home',
    route: 'me',
  },
  {
    title: 'Category',
    caption: '',
    icon: 'mdi-shape',
    route: 'category',
  },
  {
    title: 'Product',
    caption: '',
    icon: 'mdi-archive',
    route: 'product',
  },
];

const $q = useQuasar();
const router = useRouter();
const { logout } = useAuthStore();

async function handleLogout() {
  $q.dialog({
    title: 'Logout',
    message: 'Do you want to leave?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await logout();

    router.replace({ name: 'login' });
  });
}

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Estoque </q-toolbar-title>

        <q-btn-dropdown color="white" icon="person" flat>
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item></q-list
          ></q-btn-dropdown
        >
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
