<template>
  <CrudPage
    title="Locations"
    subtitle="Weplace Locations"
    resource-name="Location"
    :table-columns="locationTableColumns"
    :create-form-fields="locationFormFields"
    :update-form-fields="locationUpdateFormFields"
    :service="locationService"
    :filters="[
      { key: 'name', label: 'Name', placeholder: 'Search by name...' }
    ]"
  />
</template>

<script>
import CrudPage from '../components/CrudPage.vue'
import locationService from '../services/location'
import { locationTableColumns, locationFormFields, locationUpdateFormFields } from '../models/location'

export default {
  name: 'LocationsPage',
  components: { CrudPage },
  setup() {
    return {
      locationTableColumns,
      locationFormFields,
      locationUpdateFormFields,
      locationService
    }
  }
}
</script>
