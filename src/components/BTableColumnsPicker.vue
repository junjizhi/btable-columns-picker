<template>
  <b-modal
    :id="id"
    size="lg"
    centered
    title="Columns Picker"
    :static="true"
    @show="showCurrentColumnConfigs"
    @ok="applyColumnConfigs">
    <template #default="">
      <b-container>
        <b-row cols="11">
          <b-col cols="5">
            <b-form-group
            label="Select multiple columns to show"
            label-for="selected-hidden-columns"
          >
              <b-form-select
                id="selected-hidden-columns"
                v-model="modal.selectedHiddenColumns"
                :options="modal.hiddenColumns"
                multiple
                :select-size="20"
              />
          </b-form-group>
          </b-col>
          <b-col cols="1">
          <b-button-group vertical class="mt-5">
            <b-button
              title="Show selected columns"
              variant="light"
              @click="showSelectedColumns"
              :disabled="modal.selectedHiddenColumns.length === 0">
              <b-icon icon="arrow-right" aria-hidden="true" />
            </b-button>
            <b-button
              title="Hide selected columns"
              variant="light"
              @click="hideSelectedColumns"
              :disabled="modal.selectedShownColumns.length === 0">
              <b-icon icon="arrow-left" aria-hidden="true" />
            </b-button>
            <b-button
              title="Show all columns"
              variant="light"
              @click="showAllColumns"
              :disabled="modal.hiddenColumns.length === 0">
              <b-icon icon="box-arrow-right" aria-hidden="true" />
            </b-button>
            <b-button
              title="Hide all columns"
              variant="light"
              @click="hideAllColumns"
              :disabled="modal.shownColumns.length === 0">
              <b-icon icon="box-arrow-left" aria-hidden="true" />
            </b-button>
          </b-button-group>
          </b-col>
          <b-col cols="5">
            <b-form-group
            label="Shown"
            label-for="selected-shown-columns"
          >
            <b-form-select
              id="selected-shown-columns"
              v-model="modal.selectedShownColumns"
              :options="modal.shownColumns"
              multiple
              :select-size="20"
            />
          </b-form-group>
          </b-col>
        </b-row>
      </b-container>
    </template>
      <template #modal-footer="{ ok, cancel }">
      <b-container>
        <b-row align-h="center">
          <b-button
            @click="ok()"
            class="mr-4"
            :disabled="modal.shownColumns.length === 0">
            Apply
          </b-button>
          <b-button @click="cancel()">
            Cancel
          </b-button>
        </b-row>
      </b-container>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'BTableColumnsPicker',
  props: [
    'id',
    'currentColumns',
    'allColumns'
  ],
  data () {
    return {
      modal: {
        shownColumns: [],
        hiddenColumns: [],
        selectedHiddenColumns: [],
        selectedShownColumns: []
      }
    }
  },
  methods: {
    applyColumnConfigs () {
      this.$emit('apply', this.modal.shownColumns)
    },
    showCurrentColumnConfigs () {
      this.modal.shownColumns = this.currentColumns
      this.modal.hiddenColumns = this.allColumns.filter(f => !this.currentColumns.includes(f)).sort()
    },
    showSelectedColumns () {
      const toShown = this.modal.selectedHiddenColumns
      this.modal.shownColumns = [...this.modal.shownColumns, ...toShown]
      this.modal.hiddenColumns = this.modal.hiddenColumns.filter(c => !toShown.includes(c))
      this.modal.selectedHiddenColumns = []
    },
    hideSelectedColumns () {
      const toHidden = this.modal.selectedShownColumns
      this.modal.hiddenColumns = [...this.modal.hiddenColumns, ...toHidden].sort()
      this.modal.shownColumns = this.modal.shownColumns.filter(c => !toHidden.includes(c))
      this.modal.selectedShownColumns = []
    },
    showAllColumns () {
      this.modal.shownColumns = [...this.modal.shownColumns, ...this.modal.hiddenColumns]
      this.modal.hiddenColumns = []
      this.modal.selectedHiddenColumns = []
    },
    hideAllColumns () {
      this.modal.hiddenColumns = [...this.modal.shownColumns, ...this.modal.hiddenColumns].sort()
      this.modal.shownColumns = []
      this.modal.selectedShownColumns = []
    }
  }
}
</script>
