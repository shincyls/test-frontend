<template>
  <CrudPage
    title="Sellers"
    subtitle="Weplace Sellers"
    resource-name="Seller"
    :table-columns="sellerTableColumns"
    :create-form-fields="sellerFormFields"
    :update-form-fields="sellerUpdateFormFields"
    :service="sellerService"
    :filters="[
      { key: 'name', label: 'Name', placeholder: 'Search by name...' },
      { key: 'username', label: 'Username', placeholder: 'Search by username...' },
      { key: 'phone', label: 'Phone', placeholder: 'Search by phone...' }
    ]"
  />
</template>

<script>
import CrudPage from '../components/CrudPage.vue'
import sellerService from '../services/seller'
import { sellerTableColumns, sellerFormFields, sellerUpdateFormFields } from '../models/seller'

export default {
  name: 'SellersPage',
  components: { CrudPage },
  setup() {
    return {
      sellerTableColumns,
      sellerFormFields,
      sellerUpdateFormFields,
      sellerService
    }
  }
}
</script>
