<template>
  <MainLayout>
    <div class="content-header">
      <h2>Members</h2>
      <p>Manage fitness centre members</p>
    </div>

    <div class="content-body">
      <DataTable
        :columns="memberColumns"
        :rows="members"
        :totalRows="totalMembers"
        :loading="loading"
        :form-fields="memberFormFields"
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
            <div class="filter-group">
              <label>Username</label>
              <input v-model="filters.username" type="text" placeholder="Search by username..." @input="onFilterChange" />
            </div>
            <div class="filter-group">
              <label>Email</label>
              <input v-model="filters.email" type="text" placeholder="Search by email..." @input="onFilterChange" />
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
import userService from '../services/member'

export default {
  name: 'MembersPage',
  components: { MainLayout, DataTable },
  setup() {
    const loading = ref(false)
    const members = ref([])
    const totalMembers = ref(0)
    const currentParams = ref({ page: 1, limit: 10 })
    const filters = reactive({ name: '', username: '', email: '' })
    const defaultErrorMessage = 'Failed to perform action'
    let debounceTimer = null

    const memberColumns = [
      { field: 'name', title: 'Name', sortable: true },
      { field: 'username', title: 'Username', sortable: true },
      { field: 'email', title: 'Email', sortable: true },
      { field: 'phone', title: 'Phone', sortable: true },
      { field: 'position', title: 'Position', sortable: true },
      { field: 'current_points', title: 'Points', sortable: true },
      { field: 'created_at', title: 'Joined', sortable: true }
    ]

    const memberFormFields = [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'username', label: 'Username', type: 'text', required: true },
      { key: 'email', label: 'Email', type: 'email', required: true },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'position', label: 'Position', type: 'text' },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'role', label: 'Role', type: 'select', options: [
        { value: 'member', label: 'Member' },
        { value: 'staff', label: 'Staff' },
        { value: 'admin', label: 'Admin' }
      ]},
      { key: 'isActive', label: 'Active', type: 'select', options: [
        { value: true, label: 'Active' },
        { value: false, label: 'Inactive' }
      ]},
      { key: 'current_points', label: 'Points', type: 'number' },
      { key: 'password', label: 'Password (Leave blank to keep current)', type: 'password' },
    ]

    const fetchMembers = async (params = {}) => {
      loading.value = true
      try {
        const response = await userService.getUsers({
          page: params.page || 1,
          limit: params.limit || 10,
          name: filters.name || '',
          username: filters.username || '',
          phone: filters.phone || ''
        })
        // reformat created_at date
        response.admins.forEach(m => {
          m.created_at = new Date(m.created_at).toISOString().split('T')[0]
        })
        
        members.value = response.admins || []
        totalMembers.value = response.total || members.value.length
      } catch (error) {
        // console.error('Error occurred:', error)
        members.value = []
        totalMembers.value = 0
      } finally {
        loading.value = false
      }
    }

    const handleParamsChange = (params) => {
      currentParams.value = params
      fetchMembers(params)
    }

    const onFilterChange = () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        fetchMembers({ ...currentParams.value, page: 1 })
      }, 300)
    }

    const handleView = (row) => { console.log('View:', row) }

    const handleCreate = async (data) => {
      try {
        await userService.createUser(data)
        toast.success('Member created successfully!')
        fetchMembers(currentParams.value)
      } catch (error) {
        // console.error('Error occurred:', error)
        toast.error(error.response?.data?.message || defaultErrorMessage)
      }
    }

    const handleUpdate = async (data) => {
      try {
        await userService.updateUser(data.id, data)
        toast.success('Member updated successfully!')
        fetchMembers(currentParams.value)
      } catch (error) {
        // console.error('Error occurred:', error)
        toast.error(error.response?.data?.message || defaultErrorMessage)
      }
    }

    const handleSearch = () => {
      fetchMembers({ ...currentParams.value, page: 1 })
    }

    const handleDelete = async (row) => {
      try {
        await userService.deleteUser(row.id)
        toast.success('Member deleted successfully!')
        fetchMembers(currentParams.value)
      } catch (error) {
        // console.error('Failed to delete member:', error)
        toast.error(error.response?.data?.message || defaultErrorMessage)
      }
    }

    onMounted(() => { fetchMembers({ page: 1, limit: 10 }) })

    return {
      loading, members, totalMembers, filters,
      memberColumns, memberFormFields,
      handleParamsChange, onFilterChange,
      handleView, handleCreate, handleUpdate, handleDelete, handleSearch
    }
  }
}
</script>

<style scoped>
.content-header {
  padding: 2rem;
  background: white;
  border-bottom: 1px solid #eee;
}

.content-header h2 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.5rem;
}

.content-header p {
  margin: 0;
  color: #666;
}

.content-body {
  padding: 2rem;
}

.bh-mr-2 {
  display: none;
}

.search-filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  flex: 1;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 150px;
}

.filter-group label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
}

.filter-group input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.875rem;
}

.filter-group input:focus {
  outline: none;
  border-color: #667eea;
}

@media (max-width: 768px) {
  .content-header,
  .content-body {
    padding: 1rem;
  }

  .search-filters {
    flex-direction: column;
  }

  .filter-group {
    width: 100%;
  }
}
</style>

