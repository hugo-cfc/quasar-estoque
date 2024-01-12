<script setup lang="ts">
import useNotify from 'src/composables/UseNotify';
import useFormValidations from 'src/composables/useFormValidations';
import { useApiStore } from 'src/stores/ApiStore';
import Category from 'src/types/Category';
import { onMounted, computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const table = 'category';
const route = useRoute();
const router = useRouter();
const { post, getById, update } = useApiStore();
const { notifyError, notifySuccess } = useNotify();
const { isRequired } = useFormValidations();

const isUpdate = computed(() => route.params.id);

const category = ref<Category>({} as Category);

async function handleSubmit() {
  try {
    if (isUpdate.value) {
      await update(table, category.value);

      notifySuccess('Update successfully!');
    } else {
      await post(table, category.value);

      notifySuccess('Save successfully!');
    }

    router.push({ name: 'category' });
  } catch (error) {
    if (error instanceof Error) {
      notifyError(error.message);
    }
  }
}

async function handleGetCategory(id: string) {
  try {
    category.value = await getById('category', id);
  } catch (error) {
    if (error instanceof Error) {
      notifyError(error.message);
    }
  }
}

onMounted(() => {
  if (isUpdate.value) handleGetCategory(isUpdate.value as string);
});
</script>

<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Form Category</p>
      </div>

      <q-form
        class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md"
        @submit.prevent="handleSubmit"
      >
        <q-input v-model="category.name" label="Name" :rules="[isRequired]" />

        <q-btn
          :label="isUpdate ? 'Update' : 'Save'"
          color="primary"
          class="full-width"
          rounded
          type="submit"
        />

        <q-btn
          label="Cancel"
          color="primary"
          class="full-width"
          rounded
          flat
          :to="{ name: 'category' }"
        />
      </q-form>
    </div>
  </q-page>
</template>
src/stores/ApiStore
