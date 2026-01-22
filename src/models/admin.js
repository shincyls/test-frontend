const adminModel = [
    { key: 'name', label: 'Name', type: 'text', required: true, column: 1 },
    { key: 'username', label: 'Username', type: 'text', required: true, column: 2 },
    { key: 'email', label: 'Email', type: 'email', required: true, column: 3 },
    { key: 'phone', label: 'Phone', type: 'text', column: 4 },
    { key: 'position', label: 'Position', type: 'text', column: 5 },
    { key: 'department', label: 'Department', type: 'text', column: 6 },
    { key: 'created_at', label: 'Since', type: 'text', column: 0 },
    { key: 'role', label: 'Role', type: 'select', options: [
        { value: 'member', label: 'Member' },
        { value: 'staff', label: 'Staff' },
        { value: 'admin', label: 'Admin' }
    ]},
    { key: 'isActive', label: 'Active', type: 'select', options: [
        { value: true, label: 'Active' },
        { value: false, label: 'Inactive' }
    ]},
    { key: 'password', label: 'Password (Leave blank to keep current)', type: 'password' },
]

export default adminModel