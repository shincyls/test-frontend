<template>
  <CrudPage
    title="Users"
    subtitle="Weplace Users"
    resource-name="User"
    :table-columns="userTableColumns"
    :create-form-fields="userFormFields"
    :update-form-fields="userUpdateFormFields"
    :service="userService"
    :filters="[
      { key: 'name', label: 'Name', placeholder: 'Search by name...' },
      { key: 'username', label: 'Username', placeholder: 'Search by username...' },
      { key: 'phone', label: 'Phone', placeholder: 'Search by phone...' }
    ]"
  />
</template>

<script>
import CrudPage from '../components/CrudPage.vue'
import userService from '../services/user'
import { userTableColumns, userFormFields, userUpdateFormFields } from '../models/user'

export default {
  name: 'UsersPage',
  components: { CrudPage },
  setup() {
    return {
      userTableColumns,
      userFormFields,
      userUpdateFormFields,
      userService
    }
  }
}
</script>
