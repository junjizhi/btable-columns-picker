# btable-columns-picker
A Bootstrap Vue Table Columns Picker component.

## Screenshot
![btable columns picker screenshot](https://user-images.githubusercontent.com/2715151/103849872-db8f6100-5073-11eb-8427-4c1bdaa46b5c.png)


## Usage

```vue
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
```

## Explanations
- The component is a special [\<b-modal\>](https://bootstrap-vue.org/docs/components/modal#modals) that we can trigger with a button.
- The component takes in two column arrays which represent:
  - the current columns
  - all the available columns for picking
- Modal has two built-in custom events `@show` and `@ok` that we can listen and prepare rendering the two columns selectors
- When users click the `apply` button, the widget emits an `@apply` event and the parent component can handle it accordingly.
- To make the component test friendly, I added `:static="true"` to the `b-modal`. This renders the modal content in-place in the DOM instead of appending it to the body. With this, the [jest test](https://github.com/junjizhi/btable-columns-picker/blob/main/src/components/__tests__/BTableColumnsPicker.spec.js) can examine the content and make assertions.
- The current UI uses two multi-select components from bootstrap. And it doesn't support reordering the selection easily. If you need reordering, consider using the two-list [vue-draggable](https://sortablejs.github.io/Vue.Draggable/#/simple)


For more details, check out [my blog](https://blog.junjizhi.com/all/technical/2021/01/07/boostrap-vue-columns-picker.html).

## Run demo app
```
yarn serve
```
