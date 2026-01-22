<template>
  <CrudPage
    title="Sales"
    subtitle="Weplace Sales"
    resource-name="Sale"
    :table-columns="saleTableColumns"
    :create-form-fields="saleFormFields"
    :update-form-fields="saleUpdateFormFields"
    :service="saleService"
    :filters="[
      { key: 'name', label: 'Name', placeholder: 'Search by name...' }
    ]"
  />
</template>

<script>
import CrudPage from '../components/CrudPage.vue'
import saleService from '../services/sale'
import { saleTableColumns, saleFormFields, saleUpdateFormFields } from '../models/sale'

export default {
  name: 'SalesPage',
  components: { CrudPage },
  setup() {
    return {
      saleTableColumns,
      saleFormFields,
      saleUpdateFormFields,
      saleService
    }
  }
}
</script>
