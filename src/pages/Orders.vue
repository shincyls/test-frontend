<template>
  <CrudPage
    title="Orders"
    subtitle="Weplace Orders"
    resource-name="Order"
    :table-columns="orderTableColumns"
    :create-form-fields="orderFormFields"
    :update-form-fields="orderUpdateFormFields"
    :service="orderService"
    :filters="[
      { key: 'name', label: 'Name', placeholder: 'Search by name...' }
    ]"
  />
</template>

<script>
import CrudPage from '../components/CrudPage.vue'
import orderService from '../services/order'
import { orderTableColumns, orderFormFields, orderUpdateFormFields } from '../models/order'

export default {
  name: 'OrdersPage',
  components: { CrudPage },
  setup() {
    return {
      orderTableColumns,
      orderFormFields,
      orderUpdateFormFields,
      orderService
    }
  }
}
</script>
