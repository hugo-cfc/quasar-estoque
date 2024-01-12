import { QTableColumn } from 'quasar';
import { reactive } from 'vue';

const columns = reactive<QTableColumn[]>([
  {
    name: 'img_url',
    align: 'left',
    label: 'Image',
    field: 'img_url',
    sortable: false,
  },
  {
    name: 'name',
    field: 'name',
    align: 'left',
    label: 'Name',
    sortable: true,
  },
  {
    name: 'amount',
    align: 'left',
    label: 'Amount',
    field: 'amount',
    sortable: true,
  },
  {
    name: 'price',
    align: 'left',
    label: 'Price',
    field: 'price',
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

export { columns };
