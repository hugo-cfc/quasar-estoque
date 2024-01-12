<script setup lang="ts">
import { useApiStore } from 'src/stores/ApiStore';
import { onMounted, ref } from 'vue';
import useNotify from 'src/composables/UseNotify';
import Product from 'src/types/Product';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { columns } from './table';

const { list, remove } = useApiStore();
const { notifyError, notifySuccess } = useNotify();
const $q = useQuasar();
const router = useRouter();
const table = 'product';
const isLoading = ref(true);
const products = ref<Product[]>([]);

async function handleListProducts() {
  try {
    isLoading.value = true;

    const data: Product[] = await list('product');

    products.value = data;

    isLoading.value = false;
  } catch (error) {
    if (error instanceof Error) {
      notifyError(error.message);
    }
  }
}

function handleEdit(product: Product) {
  router.push({ name: 'form-product', params: { id: product.id } });
}

async function handleRemoveProduct(product: Product) {
  try {
    $q.dialog({
      title: 'Confirm',
      message: `Do you really delete ${product.name}?`,
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      await remove(table, product.id);

      notifySuccess('Successfully deleted');

      await handleListProducts();
    });
  } catch (error) {
    if (error instanceof Error) {
      notifyError(error.message);
    }
  }
}

onMounted(() => {
  handleListProducts();
});
</script>

<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Product"
        :rows="products"
        :columns="columns"
        row-key="id"
        class="col-12"
        :loading="isLoading"
      >
        <template v-slot:top>
          <span class="text-h6">Product</span>

          <q-space />
          <q-btn
            v-if="$q.platform.is.desktop"
            label="Add New"
            color="primary"
            icon="mdi-plus"
            dense
            :to="{ name: 'form-product' }"
          />
        </template>

        <template v-slot:body-cell-img_url="props">
          <q-td :props="props">
            <q-avatar>
              <img :src="props.row.img_url" />
            </q-avatar>
          </q-td>
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
              @click="handleRemoveProduct(props.row)"
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
        :to="{ name: 'form-product' }"
        fab
        icon="mdi-plus"
        color="primary"
      />
    </q-page-sticky>
  </q-page>
</template>

<style></style>
src/stores/ApiStore
