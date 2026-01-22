<template>
  <CrudPage
    title="Products"
    subtitle="Weplace Products"
    resource-name="Product"
    :table-columns="productTableColumns"
    :create-form-fields="productFormFields"
    :update-form-fields="productUpdateFormFields"
    :service="productService"
    :filters="[
      { key: 'name', label: 'Name', placeholder: 'Search by name...' }
    ]"
  />
</template>

<script>
import CrudPage from '../components/CrudPage.vue'
import productService from '../services/product'
import { productTableColumns, productFormFields, productUpdateFormFields } from '../models/product'

export default {
  name: 'ProductsPage',
  components: { CrudPage },
  setup() {
    return {
      productTableColumns,
      productFormFields,
      productUpdateFormFields,
      productService
    }
  }
}
</script>
