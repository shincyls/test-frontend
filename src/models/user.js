/**
 * Table columns configuration for User list view
 * Only includes fields that should be displayed in the table
 */
const userTableColumns = [
    { field: 'name', title: 'Name', sortable: true },
    { field: 'username', title: 'Username', sortable: true },
    { field: 'email', title: 'Email', sortable: true },
    { field: 'phone', title: 'Phone', sortable: true },
    { field: 'isActive', title: 'Status', sortable: true }
]

/**
 * Form fields configuration for User create/update forms
 * Includes all editable fields with validation rules
 */
const userFormFields = [
    {
        key: 'name',
        label: 'Name',
        type: 'text',
        required: true,
        validation: {
            minLength: 2,
            maxLength: 100,
            message: 'Name must be between 2 and 100 characters'
        }
    },
    {
        key: 'username',
        label: 'Username',
        type: 'text',
        required: true,
        validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[a-zA-Z0-9_]+$/,
            message: 'Username must be 3-50 characters and contain only letters, numbers, and underscores'
        }
    },
    {
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        validation: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        }
    },
    {
        key: 'phone',
        label: 'Phone',
        type: 'text',
        validation: {
            pattern: /^[0-9+\-\s()]+$/,
            minLength: 10,
            maxLength: 20,
            message: 'Please enter a valid phone number'
        }
    },
    {
        key: 'isActive',
        label: 'Active',
        type: 'select',
        required: true,
        options: [
            { value: true, label: 'Active' },
            { value: false, label: 'Inactive' }
        ]
    },
]

const userUpdateFormFields = [
    {
        key: 'name',
        label: 'Name',
        type: 'text',
        required: true,
        validation: {
            minLength: 2,
            maxLength: 100,
            message: 'Name must be between 2 and 100 characters'
        }
    },
    {
        key: 'username',
        label: 'Username',
        type: 'text',
        required: true,
        validation: {
            minLength: 3,
            maxLength: 50,
            pattern: /^[a-zA-Z0-9_]+$/,
            message: 'Username must be 3-50 characters and contain only letters, numbers, and underscores'
        }
    },
    {
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        validation: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        }
    },
    {
        key: 'phone',
        label: 'Phone',
        type: 'text',
        validation: {
            pattern: /^[0-9+\-\s()]+$/,
            minLength: 10,
            maxLength: 20,
            message: 'Please enter a valid phone number'
        }
    },
    {
        key: 'isActive',
        label: 'Active',
        type: 'select',
        required: true,
        options: [
            { value: true, label: 'Active' },
            { value: false, label: 'Inactive' }
        ]
    },
]

export { userTableColumns, userFormFields, userUpdateFormFields }