<template>
  <div class="data-table-wrapper">
    <!-- Header with Add Button -->
    <div v-if="showAddButton" class="table-header">
      <slot name="filters"></slot>
      <!-- search button on click search fetch data -->
      <button class="btn btn-success" @click="handleSearch">
        <i class="mdi mdi-magnify"></i> Search
      </button>
      <button class="btn btn-primary add-btn" @click="handleCreate">
        <i class="mdi mdi-plus"></i> New
      </button>
    </div>

    <Vue3Datatable
      :rows="formattedRows"
      :columns="tableColumns"
      :totalRows="totalRows"
      :isServerMode="true"
      :loading="loading"
      :pageSize="params.limit"
      :showInfo="false"
      :page="params.page"
      :search="params.search"
      :sortable="true"
      :pageSizeOptions="[10, 25, 50, 100]"
      :rowKey="rowKey"
      skin="bh-table-bordered"
      @pageChange="onPageChange"
      @pageSizeChange="onPageSizeChange"
      @search="onSearch"
    >
      <template #actions="slotData">
        <div class="action-buttons">
          <button v-if="actions.includes('view')" class="action-btn view" @click="handleView(slotData.value)" title="View">
            <i class="mdi mdi-eye"></i>
          </button>
          <button v-if="actions.includes('update')" class="action-btn edit" @click="handleUpdate(slotData.value)" title="Edit">
            <i class="mdi mdi-pencil"></i>
          </button>
          <button v-if="actions.includes('delete')" class="action-btn delete" @click="handleDelete(slotData.value)" title="Delete">
            <i class="mdi mdi-delete"></i>
          </button>
        </div>
      </template>
    </Vue3Datatable>

    <!-- View Modal -->
    <div v-if="showViewModal" class="modal-overlay" @click.self="closeViewModal">
      <div class="modal-container">
        <div class="modal-header">
          <h3>View Details</h3>
          <button class="close-btn" @click="closeViewModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="details-grid">
            <div v-for="col in columns" :key="col.field" class="detail-item">
              <label>{{ col.title }}</label>
              <p>{{ selectedRow[col.field] ?? '-' }}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeViewModal">Close</button>
        </div>
      </div>
    </div>

    <!-- Update Modal -->
    <div v-if="showUpdateModal" class="modal-overlay" @click.self="closeUpdateModal">
      <div class="modal-container" :data-id="selectedRow?.id">
        <div class="modal-header">
          <h3>Update Record</h3>
          <span class="record-id" v-if="selectedRow?.id">ID: {{ selectedRow?.id }}</span>
          <button class="close-btn" @click="closeUpdateModal">&times;</button>
        </div>
        <form @submit.prevent="submitUpdate">
          <input type="hidden" name="id" :value="formData.id" />
          <div class="modal-body">
            <div class="form-grid">
              <div v-for="field in updateFormFields" :key="field.key" class="form-group">
                <label :for="field.key">{{ field.label }}</label>
                <input v-if="field.type !== 'select'"
                  :type="field.type || 'text'"
                  :id="field.key" v-model="formData[field.key]"
                  :required="field.required"
                class="form-input" />
                <select v-else :id="field.key" v-model="formData[field.key]" class="form-input">
                  <option value="">Select...</option>
                  <option v-for="opt in field.options"
                    :key="opt.value"
                    :value="opt.value">{{ opt.label }}
                </option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeUpdateModal">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="closeDeleteModal">
      <div class="modal-container modal-sm" :data-id="selectedRow?.id">
        <div class="modal-header">
          <h3>Confirm Delete</h3>
          <button class="close-btn" @click="closeDeleteModal">&times;</button>
        </div>
        <div class="modal-body text-center">
          <div class="confirm-icon"><i class="mdi mdi-alert"></i></div>
          <p>Are you sure you want to delete this record?</p>
          <p class="record-id-delete">ID: {{ selectedRow?.id }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeDeleteModal">Cancel</button>
          <button class="btn btn-danger" @click="confirmDelete">Delete</button>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click.self="closeCreateModal">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Add New Record</h3>
          <button class="close-btn" @click="closeCreateModal">&times;</button>
        </div>
        <form @submit.prevent="submitCreate">
          <div class="modal-body">
            <div class="form-grid">
              <div v-for="field in createFormFields" :key="field.key" class="form-group">
                <label :for="'create-' + field.key">{{ field.label }}</label>
                <input v-if="field.type !== 'select'" :type="field.type || 'text'" :id="'create-' + field.key" v-model="createFormData[field.key]" :required="field.required" class="form-input" />
                <select v-else :id="'create-' + field.key" v-model="createFormData[field.key]" class="form-input">
                  <option value="">Select...</option>
                  <option v-for="opt in field.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeCreateModal">Cancel</button>
            <button type="submit" class="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'

export default {
  name: 'DataTable',
  components: { Vue3Datatable },
  props: {
    columns: { type: Array, required: true },
    rows: { type: Array, default: () => [] },
    totalRows: { type: Number, default: 0 },
    loading: { type: Boolean, default: false },
    actions: { type: Array, default: () => ['view', 'update', 'delete'] },
    createFormFields: { type: Array, default: () => [] },
    updateFormFields: { type: Array, default: () => [] },
    sortable: { type: Boolean, default: true },
    showAddButton: { type: Boolean, default: false },
    rowKey: { type: String, default: 'id' }
  },
  emits: ['params-change', 'view', 'update', 'delete', 'create'],
  setup(props, { emit }) {
    const params = reactive({ page: 1, limit: 10, search: '', sortField: '', sortOrder: '' })
    const showViewModal = ref(false)
    const showUpdateModal = ref(false)
    const showDeleteModal = ref(false)
    const showCreateModal = ref(false)
    const selectedRow = ref(null)
    const formData = reactive({})
    const createFormData = reactive({})

    // Helper function to get nested value from object using dot notation
    const getNestedValue = (obj, path) => {
      return path.split('.').reduce((current, key) => current?.[key], obj)
    }

    // Helper function to format value using field's format function
    const formatFieldValue = (value, column) => {
      if (column.format && typeof column.format === 'function') {
        return column.format(value)
      }
      return value
    }

    const tableColumns = computed(() => {
      const cols = [...props.columns]
      if (props.actions.length > 0) {
        cols.push({ field: 'actions', title: 'Actions', sortable: false })
      }
      return cols
    })

    // Format rows data using format functions from columns
    const formattedRows = computed(() => {
      return props.rows.map(row => {
        const formattedRow = { ...row }
        props.columns.forEach(column => {
          if (column.format && typeof column.format === 'function') {
            const value = getNestedValue(row, column.field)
            formattedRow[column.field] = formatFieldValue(value, column)
          }
        })
        return formattedRow
      })
    })

    const emitParamsChange = () => emit('params-change', { ...params })
    const onPageChange = (page) => { params.page = page; emitParamsChange() }
    const onPageSizeChange = (size) => { params.limit = size; params.page = 1; emitParamsChange() }
    const onSearch = (search) => { params.search = search; params.page = 1; emitParamsChange() }
    const onSortChange = (sort) => { params.sortField = sort.field; params.sortOrder = sort.order; emitParamsChange() }

    const handleView = (row) => { selectedRow.value = row; showViewModal.value = true; emit('view', row) }
    const handleUpdate = (row) => {
      selectedRow.value = row
      Object.keys(formData).forEach(key => delete formData[key])
      Object.keys(row).forEach(key => {
        formData[key] = (key !== 'password') ? row[key] : ''
      })
      showUpdateModal.value = true
    }
    const handleDelete = (row) => { selectedRow.value = row; showDeleteModal.value = true }
    const handleCreate = () => {
      // Clear createFormData
      Object.keys(createFormData).forEach(key => delete createFormData[key])
      showCreateModal.value = true
    }

    const closeViewModal = () => { showViewModal.value = false; selectedRow.value = null }
    const closeUpdateModal = () => { showUpdateModal.value = false; selectedRow.value = null }
    const closeDeleteModal = () => { showDeleteModal.value = false; selectedRow.value = null }
    const closeCreateModal = () => { showCreateModal.value = false }

    const submitUpdate = () => { emit('update', { ...formData }); closeUpdateModal() }
    const confirmDelete = () => { emit('delete', selectedRow.value); closeDeleteModal() }
    const submitCreate = () => { emit('create', { ...createFormData }); closeCreateModal() }

    return {
      params, tableColumns, formattedRows,
      showViewModal, showUpdateModal, showDeleteModal, showCreateModal,
      selectedRow, formData, createFormData,
      createFormFields: props.createFormFields,
      updateFormFields: props.updateFormFields,
      onPageChange, onPageSizeChange, onSearch, onSortChange,
      handleView, handleUpdate, handleDelete, handleCreate,
      closeViewModal, closeUpdateModal, closeDeleteModal, closeCreateModal,
      submitUpdate, confirmDelete, submitCreate,
      handleSearch: emitParamsChange
    }
  }
}
</script>

<style scoped>
.data-table-wrapper {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  gap: 1rem;
  flex-wrap: wrap;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.action-btn.view { background: #E8F9F0; color: #14C56C; }
.action-btn.view:hover { background: #14C56C; color: white; }
.action-btn.edit { background: #FEF3C7; color: #F59E0B; }
.action-btn.edit:hover { background: #F59E0B; color: white; }
.action-btn.delete { background: #ffebee; color: #d32f2f; }
.action-btn.delete:hover { background: #d32f2f; color: white; }

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-sm { max-width: 400px; }

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal-header h3 { margin: 0; font-size: 1.125rem; color: #333; }

.modal-header .record-id {
  font-size: 0.75rem;
  color: #999;
  background: #f5f5f5;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
}

.record-id-delete {
  font-size: 0.75rem;
  color: #999;
  font-family: monospace;
  margin-top: 0.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  line-height: 1;
}

.close-btn:hover { color: #333; }

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.text-center { text-align: center; }

.confirm-icon {
  font-size: 2rem;
  color: #f44336;
  margin-bottom: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.detail-item label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.detail-item p { margin: 0; color: #333; }

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #444;
}

.form-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.875rem;
}

.form-input:focus {
  outline: none;
  border-color: #14C56C;
  box-shadow: 0 0 0 3px rgba(20, 197, 108, 0.1);
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: linear-gradient(135deg, #14C56C 0%, #0FA858 100%);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #0FA858 0%, #0C8A48 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(20, 197, 108, 0.3);
}

.btn-success {
  background: linear-gradient(135deg, #0891B2 0%, #0E7490 100%);
  color: white;
}

.btn-success:hover {
  background: linear-gradient(135deg, #0E7490 0%, #155E75 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(8, 145, 178, 0.3);
}

.btn-secondary {
  background: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
}

.btn-danger {
  background: #f44336;
  color: white;
}

.btn-danger:hover { background: #d32f2f; }

@media (max-width: 480px) {
  .form-grid { grid-template-columns: 1fr; }
}
</style>

<style>
/* Hide "Showing X to Y of Z entries" - needs non-scoped style */
.bh-table-footer .bh-pagination-info {
  display: none !important;
}
</style>
