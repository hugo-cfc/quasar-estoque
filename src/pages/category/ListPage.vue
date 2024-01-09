<script setup lang="ts">
import { useCategoryStore } from 'src/stores/CategoryStore';
import { QTableColumn } from 'quasar';
import { onMounted, reactive, ref } from 'vue';
import useNotify from 'src/composables/UseNotify';
import Category from 'src/types/Category';

const { list } = useCategoryStore();
const { notifyError } = useNotify();
const isLoading = ref(true);
const categories = reactive<Category[]>([]);
const columns = reactive<QTableColumn[]>([
  {
    name: 'name',
    field: 'name',
    align: 'left',
    label: 'Name',
    sortable: true,
  },
  {
    name: 'actions',
    align: 'right',
    label: 'Action',
    field: 'actions',
    sortable: true,
  },
]);

const handleListCategories = async () => {
  try {
    isLoading.value = true;

    const data: Category[] = await list('category');

    categories.push(...data);

    isLoading.value = false;
  } catch (error) {
    if (error instanceof Error) {
      notifyError(error.message);
    }
  }
};

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
          <q-btn label="Add New" color="primary" />
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td class="q-gutter-x-sm" :props="props">
            <q-btn icon="mdi-pencil-outline" color="primary" dense size="sm">
              <q-tooltip> Edit </q-tooltip>
            </q-btn>

            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm">
              <q-tooltip> Remove </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<style></style>
