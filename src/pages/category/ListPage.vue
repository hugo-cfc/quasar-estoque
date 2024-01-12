<script setup lang="ts">
import { useApiStore } from 'src/stores/ApiStore';
import { onMounted, ref } from 'vue';
import useNotify from 'src/composables/UseNotify';
import Category from 'src/types/Category';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { columns } from './table';

const { list, remove } = useApiStore();
const { notifyError, notifySuccess } = useNotify();
const $q = useQuasar();
const router = useRouter();
const table = 'category';
const isLoading = ref(true);
const categories = ref<Category[]>([]);

async function handleListCategories() {
  try {
    isLoading.value = true;

    const data: Category[] = await list('category');

    categories.value = data;

    isLoading.value = false;
  } catch (error) {
    if (error instanceof Error) {
      notifyError(error.message);
    }
  }
}

function handleEdit(category: Category) {
  router.push({ name: 'form-category', params: { id: category.id } });
}

async function handleRemoveCategory(category: Category) {
  try {
    $q.dialog({
      title: 'Confirm',
      message: `Do you really delete ${category.name}?`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      await remove(table, category.id);

      notifySuccess('Successfully deleted');

      await handleListCategories();
    });
  } catch (error) {
    if (error instanceof Error) {
      notifyError(error.message);
    }
  }
}

onMounted(() => {
  handleListCategories();
});
</script>

<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Category"
        :rows="categories"
        :columns="columns"
        row-key="id"
        class="col-12"
        :loading="isLoading"
      >
        <template v-slot:top>
          <span class="text-h6">Category</span>

          <q-space />
          <q-btn
            v-if="$q.platform.is.desktop"
            label="Add New"
            color="primary"
            icon="mdi-plus"
            dense
            :to="{ name: 'form-category' }"
          />
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td class="q-gutter-x-sm" :props="props">
            <q-btn
              icon="mdi-pencil-outline"
              color="primary"
              dense
              size="sm"
              @click="handleEdit(props.row)"
            >
              <q-tooltip> Edit </q-tooltip>
            </q-btn>

            <q-btn
              icon="mdi-delete-outline"
              color="negative"
              dense
              size="sm"
              @click="handleRemoveCategory(props.row)"
            >
              <q-tooltip> Remove </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-if="$q.platform.is.mobile"
        :to="{ name: 'form-category' }"
        fab
        icon="mdi-plus"
        color="primary"
      />
    </q-page-sticky>
  </q-page>
</template>

<style></style>
src/stores/ApiStore
