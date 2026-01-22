<template>
  <MainLayout>
    <div class="content-header">
      <h2>Admins</h2>
      <p>Weplace Admins</p>
    </div>

    <div class="content-body">
      <DataTable
        :columns="entryColumns"
        :rows="entries"
        :totalRows="totalEntries"
        :loading="loading"
        :form-fields="entryFormFields"
        :show-add-button="true"
        @params-change="handleParamsChange"
        @view="handleView"
        @update="handleUpdate"
        @delete="handleDelete"
        @create="handleCreate"
      >
        <template #filters>
          <div class="search-filters">
            <div class="filter-group">
              <label>Name</label>
              <input v-model="filters.name" type="text" placeholder="Search by name..." @input="onFilterChange" />
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
import { tableColumns } from '../utils/tableColumns'
import adminService from '../services/admin'
import adminModel from '../models/admin'

export default {
  name: 'AdminsPage',
  components: { MainLayout, DataTable },
  setup() {
    const loading = ref(false)
    const entries = ref([])
    const totalEntries = ref(0)
    const currentParams = ref({ page: 1, limit: 10 })
    const filters = reactive({ name: '', username: '', email: '' })
    const resource = 'Admin'
    const defaultErrorMessage = 'Failed to perform action'
    let debounceTimer = null

    const entryColumns = tableColumns(adminModel)
    const entryFormFields = adminModel

    const fetchEntries = async (params = {}) => {
      loading.value = true
      try {
        const response = await adminService.getAdmins({
          page: params.page || 1,
          limit: params.limit || 10,
          name: filters.name || '',
          username: filters.username || '',
          phone: filters.phone || ''
        })
        response.Entries.forEach(m => {
          m.created_at = new Date(m.created_at).toISOString().split('T')[0]
        })
        entries.value = response.Entries || []
        totalEntries.value = response.total || entries.value.length
      } catch (error) {
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

    const handleView = (row) => { console.log('View:', row) }

    const handleCreate = async (data) => {
      try {
        await adminService.createAdmin(data)
        toast.success(`${resource} created successfully!`)
        fetchEntries(currentParams.value)
      } catch (error) {
        toast.error(error.response?.data?.message || defaultErrorMessage)
      }
    }

    const handleUpdate = async (data) => {
      try {
        await adminService.updateAdmin(data.id, data)
        toast.success(`${resource} updated successfully!`)
        fetchEntries(currentParams.value)
      } catch (error) {
        toast.error(error.response?.data?.message || defaultErrorMessage)
      }
    }

    const handleSearch = () => {
      fetchEntries({ ...currentParams.value, page: 1 })
    }

    const handleDelete = async (row) => {
      try {
        await adminService.deleteAdmin(row.id)
        toast.success(`${resource} deleted successfully!`)
        fetchEntries(currentParams.value)
      } catch (error) {
        toast.error(error.response?.data?.message || defaultErrorMessage)
      }
    }

    onMounted(() => { fetchEntries({ page: 1, limit: 10 }) })

    return {
      loading, entries, totalEntries, filters,
      entryColumns, entryFormFields,
      handleParamsChange, onFilterChange,
      handleView, handleCreate, handleUpdate, handleDelete, handleSearch
    }
  }
}
</script>

<style scoped>
@import '../table.css';
</style>
