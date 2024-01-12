import { QTableColumn } from 'quasar';
import { reactive } from 'vue';

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

export { columns };
