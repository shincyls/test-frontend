<template>
  <CrudPage
    title="Admins"
    subtitle="Weplace Admins"
    resource-name="Admin"
    :table-columns="adminTableColumns"
    :create-form-fields="adminFormFields"
    :update-form-fields="adminUpdateFormFields"
    :service="adminService"
    :filters="[
      { key: 'name', label: 'Name', placeholder: 'Search by name...' },
      { key: 'username', label: 'Username', placeholder: 'Search by username...' },
      { key: 'email', label: 'Email', placeholder: 'Search by email...' }
    ]"
  />
</template>

<script>
import CrudPage from '../components/CrudPage.vue'
import adminService from '../services/admin'
import { adminTableColumns, adminFormFields, adminUpdateFormFields } from '../models/admin'

export default {
  name: 'AdminsPage',
  components: { CrudPage },
  setup() {
    return {
      adminTableColumns,
      adminFormFields,
      adminUpdateFormFields,
      adminService
    }
  }
}
</script>
