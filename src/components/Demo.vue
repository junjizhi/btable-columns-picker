<template>
  <div>
    <b-button variant="primary" class="mb-2" v-b-modal.columns-config-modal>
      Show Columns Picker
    </b-button>
    <BTableColumnsPicker
      :allColumns="allColumns()"
      :currentColumns="columns"
      :id="'columns-config-modal'"
      @apply="applyColumnConfigs"
    />
    <b-table
      id="dataList"
      striped
      bordered
      sticky-header="800px"
      head-variant="light"
      hover
      :items="items"
      :fields="columns"
    >
    </b-table>
  </div>
</template>

<script>
import { items } from './items'
import BTableColumnsPicker from './BTableColumnsPicker.vue'

export default {
  name: 'Demo',
  components: {
    BTableColumnsPicker
  },
  data() {
    return {
      items,
      columns: [
        'id',
        'label',
        'summary',
        'date'
      ]
    }
  },
  methods: {
    allColumns() {
      return Object.keys(items[0])
    },
    applyColumnConfigs(columns) {
      this.columns = columns
    }
  }
}
</script>