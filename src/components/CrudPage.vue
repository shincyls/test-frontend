<template>
  <MainLayout>
    <div class="content-header">
      <h2>{{ title }}</h2>
      <p>{{ subtitle }}</p>
    </div>

    <div class="content-body">
      <DataTable
        :columns="entryColumns"
        :rows="entries"
        :totalRows="totalEntries"
        :loading="loading"
        :create-form-fields="createFormFields"
        :update-form-fields="updateFormFields"
        :show-add-button="showAddButton"
        @params-change="handleParamsChange"
        @view="handleView"
        @update="handleUpdate"
        @delete="handleDelete"
        @create="handleCreate"
      >
        <template #filters v-if="filters && filters.length > 0">
          <div class="search-filters">
            <div class="filter-group" v-for="filter in filters" :key="filter.key">
              <label>{{ filter.label }}</label>
              <input 
                v-model="filterValues[filter.key]" 
                :type="filter.type || 'text'" 
                :placeholder="filter.placeholder || `Search by ${filter.label.toLowerCase()}...`" 
                @input="onFilterChange" 
              />
            </div>
          </div>
        </template>
      </DataTable>
    </div>
  </MainLayout>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import MainLayout from '../layouts/MainLayout.vue'
import DataTable from '../components/DataTable.vue'

export default {
  name: 'CrudPage',
  components: { MainLayout, DataTable },
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    resourceName: { type: String, required: true },
    tableColumns: { type: Array, required: true },
    createFormFields: { type: Array, required: true },
    updateFormFields: { type: Array, required: true },
    service: { type: Object, required: true },
    filters: { type: Array, default: () => [] },
    showAddButton: { type: Boolean, default: true },
    transformData: { type: Function, default: null }
  },
  setup(props) {
    const loading = ref(false)
    const entries = ref([])
    const totalEntries = ref(0)
    const currentParams = ref({ page: 1, limit: 10 })
    const filterValues = reactive({})
    const defaultErrorMessage = 'Failed to perform action'
    let debounceTimer = null

    // Initialize filter values
    props.filters.forEach(filter => {
      filterValues[filter.key] = ''
    })

    const entryColumns = props.tableColumns

    const fetchEntries = async (params = {}) => {
      loading.value = true
      try {
        // Build query params with filters
        const queryParams = {
          page: params.page || 1,
          limit: params.limit || 10
        }
        
        // Add filter values to query params
        props.filters.forEach(filter => {
          if (filterValues[filter.key]) {
            queryParams[filter.key] = filterValues[filter.key]
          }
        })

        const response = await props.service.getAll(queryParams)
        
        // Transform data if transformer provided
        let transformedEntries = response.Entries || []
        if (props.transformData) {
          transformedEntries = props.transformData(transformedEntries)
        }
        
        entries.value = transformedEntries
        totalEntries.value = response.total || entries.value.length
      } catch (error) {
        console.error('Error fetching entries:', error)
        entries.value = []
        totalEntries.value = 0
      } finally {
        loading.value = false
      }
    }

    const handleParamsChange = (params) => {
      currentParams.value = params
      fetchEntries(params)
    }

    const onFilterChange = () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        fetchEntries({ ...currentParams.value, page: 1 })
      }, 300)
    }

    const handleView = (row) => { 
      console.log('View:', row) 
    }

    const handleCreate = async (data) => {
      try {
        await props.service.create(data)
        toast.success(`${props.resourceName} created successfully!`)
        fetchEntries(currentParams.value)
      } catch (error) {
        toast.error(error.response?.data?.message || defaultErrorMessage)
      }
    }

    const handleUpdate = async (data) => {
      try {
        await props.service.update(data.id, data)
        toast.success(`${props.resourceName} updated successfully!`)
        fetchEntries(currentParams.value)
      } catch (error) {
        toast.error(error.response?.data?.message || defaultErrorMessage)
      }
    }

    const handleDelete = async (row) => {
      try {
        await props.service.remove(row.id)
        toast.success(`${props.resourceName} deleted successfully!`)
        fetchEntries(currentParams.value)
      } catch (error) {
        toast.error(error.response?.data?.message || defaultErrorMessage)
      }
    }

    onMounted(() => { 
      fetchEntries({ page: 1, limit: 10 }) 
    })

    return {
      loading, entries, totalEntries, filterValues,
      entryColumns,
      createFormFields: props.createFormFields,
      updateFormFields: props.updateFormFields,
      handleParamsChange, onFilterChange,
      handleView, handleCreate, handleUpdate, handleDelete
    }
  }
}
</script>

<style scoped>
@import '../table.css';
</style>

