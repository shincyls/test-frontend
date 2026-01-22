/**
 * Table columns configuration for Admin list view
 * Only includes fields that should be displayed in the table
 */
const adminTableColumns = [
    { field: 'name', title: 'Name', sortable: true },
    { field: 'username', title: 'Username', sortable: true },
    { field: 'email', title: 'Email', sortable: true },
    { field: 'phone', title: 'Phone', sortable: true },
    { field: 'position', title: 'Position', sortable: true },
    { field: 'department', title: 'Department', sortable: true },
    { field: 'role', title: 'Role', sortable: true },
    { field: 'isActive', title: 'Status', sortable: true }
]

/**
 * Form fields configuration for Admin create/update forms
 * Includes all editable fields with validation rules
 */
const adminFormFields = [
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
        key: 'position',
        label: 'Position',
        type: 'text',
        validation: {
            maxLength: 100
        }
    },
    {
        key: 'department',
        label: 'Department',
        type: 'text',
        validation: {
            maxLength: 100
        }
    },
    {
        key: 'role',
        label: 'Role',
        type: 'select',
        required: true,
        options: [
            { value: 'member', label: 'Member' },
            { value: 'staff', label: 'Staff' },
            { value: 'admin', label: 'Admin' }
        ]
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
    {
        key: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        validation: {
            minLength: 8,
            maxLength: 100,
            message: 'Password must be at least 8 characters'
        }
    }
]

/**
 * Form fields for updating existing admin (password is optional)
 */
const adminUpdateFormFields = [
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
        key: 'position',
        label: 'Position',
        type: 'text',
        validation: {
            maxLength: 100
        }
    },
    {
        key: 'department',
        label: 'Department',
        type: 'text',
        validation: {
            maxLength: 100
        }
    },
    {
        key: 'role',
        label: 'Role',
        type: 'select',
        required: true,
        options: [
            { value: 'member', label: 'Member' },
            { value: 'staff', label: 'Staff' },
            { value: 'admin', label: 'Admin' }
        ]
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
    {
        key: 'password',
        label: 'Password (Leave blank to keep current)',
        type: 'password',
        required: false,
        validation: {
            minLength: 8,
            maxLength: 100,
            message: 'Password must be at least 8 characters'
        }
    }
]

export { adminTableColumns, adminFormFields, adminUpdateFormFields }