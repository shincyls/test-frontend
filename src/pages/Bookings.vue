<template>
  <MainLayout>
    <div class="content-header">
      <h2>Bookings</h2>
      <p>Manage fitness centre bookings</p>
    </div>

    <div class="content-body">
      <DataTable
        :columns="bookingColumns"
        :rows="bookings"
        :totalRows="totalBookings"
        :loading="loading"
        :form-fields="bookingFormFields"
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
              <label>Class Name</label>
              <input v-model="filters.class_name" type="text" placeholder="Search by class..." @input="onFilterChange" />
            </div>
            <div class="filter-group">
              <label>Status</label>
              <select v-model="filters.status" @change="onFilterChange">
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div class="filter-group">
              <label>Booking Date</label>
              <input v-model="filters.booking_date" type="date" @input="onFilterChange" />
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
import bookingService from '../services/booking'
import userService from '../services/member'

export default {
  name: 'BookingsPage',
  components: { MainLayout, DataTable },
  setup() {
    const loading = ref(false)
    const bookings = ref([])
    const totalBookings = ref(0)
    const members = ref([])
    const currentParams = ref({ page: 1, limit: 10 })
    const filters = reactive({ class_name: '', status: '', booking_date: '' })
    const defaultErrorMessage = 'Failed to perform action'
    let debounceTimer = null

    const bookingColumns = [
      { field: 'member.name', title: 'Member', sortable: true },
      { field: 'class_name', title: 'Class', sortable: true },
      { field: 'room_name', title: 'Room', sortable: true },
      { field: 'booking_date', title: 'Date', sortable: true },
      { field: 'start_time', title: 'Start', sortable: true },
      { field: 'end_time', title: 'End', sortable: true },
      { field: 'status', title: 'Status', sortable: true },
      { field: 'payment_status', title: 'Payment', sortable: true },
      { field: 'earn_points', title: 'Points', sortable: true }
    ]

    const bookingFormFields = ref([
      { key: 'member_id', label: 'Member', type: 'select', required: true, options: [] },
      { key: 'class_name', label: 'Class Name', type: 'text', required: true },
      { key: 'room_name', label: 'Room Name', type: 'text' },
      { key: 'booking_date', label: 'Booking Date', type: 'date', required: true },
      { key: 'start_time', label: 'Start Time', type: 'time', required: true },
      { key: 'end_time', label: 'End Time', type: 'time', required: true },
      { key: 'status', label: 'Status', type: 'select', options: [
        { value: 'pending', label: 'Pending' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'cancelled', label: 'Cancelled' }
      ]},
      { key: 'payment_cost', label: 'Payment Cost', type: 'number' },
      { key: 'payment_status', label: 'Payment Status', type: 'select', options: [
        { value: 'pending', label: 'Pending' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'cancelled', label: 'Cancelled' }
      ]},
      { key: 'payment_method', label: 'Payment Method', type: 'text' },
      { key: 'earn_points', label: 'Earn Points', type: 'number' }
    ])

    const fetchMembers = async () => {
      try {
        const response = await userService.getUsers({ limit: 1000 })
        members.value = response.admins || []
        const memberField = bookingFormFields.value.find(f => f.key === 'member_id')
        if (memberField) {
          memberField.options = members.value.map(m => ({ value: m.id, label: m.name }))
        }
      } catch (error) {
        members.value = []
      }
    }

    const fetchBookings = async (params = {}) => {
      loading.value = true
      try {
        const response = await bookingService.getBookings({
          page: params.page || 1,
          limit: params.limit || 10,
          class_name: filters.class_name || '',
          status: filters.status || '',
          booking_date: filters.booking_date || ''
        })
        bookings.value = response.bookings || []
        totalBookings.value = response.total || bookings.value.length
      } catch (error) {
        bookings.value = []
        totalBookings.value = 0
      } finally {
        loading.value = false
      }
    }

    const handleParamsChange = (params) => {
      currentParams.value = params
      fetchBookings(params)
    }

    const onFilterChange = () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        fetchBookings({ ...currentParams.value, page: 1 })
      }, 300)
    }

    const handleView = (row) => { console.log('View:', row) }

    const handleCreate = async (data) => {
      try {
        await bookingService.createBooking(data)
        toast.success('Booking created successfully!')
        fetchBookings(currentParams.value)
      } catch (error) {
        toast.error(error.message || defaultErrorMessage)
      }
    }

    const handleUpdate = async (data) => {
      try {
        await bookingService.updateBooking(data.id, data)
        toast.success('Booking updated successfully!')
        fetchBookings(currentParams.value)
      } catch (error) {
        toast.error(error.message || defaultErrorMessage)
      }
    }

    const handleDelete = async (row) => {
      try {
        await bookingService.deleteBooking(row.id)
        toast.success('Booking deleted successfully!')
        fetchBookings(currentParams.value)
      } catch (error) {
        toast.error(error.message || defaultErrorMessage)
      }
    }

    onMounted(() => {
      fetchMembers()
      fetchBookings({ page: 1, limit: 10 })
    })

    return {
      loading, bookings, totalBookings, filters,
      bookingColumns, bookingFormFields,
      handleParamsChange, onFilterChange,
      handleView, handleCreate, handleUpdate, handleDelete
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

.filter-group input,
.filter-group select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.875rem;
}

.filter-group input:focus,
.filter-group select:focus {
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