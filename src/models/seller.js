const sellerTableColumns = [
    { field: 'sellerName', title: 'Name', sortable: true },
    { field: 'sellerEmail', title: 'Email', sortable: true },
    { field: 'sellerType', title: 'Type', sortable: true },
    { field: 'companyPhone', title: 'Phone', sortable: true },
    { field: 'companyName', title: 'Company', sortable: true },
    { field: 'createdAt', title: 'Since', sortable: true }
]

const sellerFormFields = [
    {
        key: 'sellerName',
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
        key: 'sellerEmail',
        label: 'Email',
        type: 'email',
        required: true,
        validation: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        }
    },
    {
        key: 'sellerType',
        label: 'Type',
        type: 'select',
        required: true,
        options: [
            { value: 'personal', label: 'Personal' },
            { value: 'company', label: 'Company' }
        ]
    },
    {
        key: 'companyPhone',
        label: 'Phone',
        type: 'text',
        required: true,
        validation: {
            pattern: /^[0-9+\-\s()]+$/,
            minLength: 10,
            maxLength: 20,
            message: 'Please enter a valid phone number'
        }
    },
    {
        key: 'companyName',
        label: 'Company Name',
        type: 'text',
        required: false,
        validation: {
            minLength: 2,
            maxLength: 100,
            message: 'Company name must be between 2 and 100 characters'
        }
    },
]

const sellerUpdateFormFields = [
    {
        key: 'sellerName',
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
        key: 'sellerEmail',
        label: 'Email',
        type: 'email',
        required: true,
        validation: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        }
    },
    {
        key: 'sellerType',
        label: 'Type',
        type: 'select',
        required: true,
        options: [
            { value: 'personal', label: 'Personal' },
            { value: 'company', label: 'Company' }
        ]
    },
    {
        key: 'companyPhone',
        label: 'Phone',
        type: 'text',
        required: true,
        validation: {
            pattern: /^[0-9+\-\s()]+$/,
            minLength: 10,
            maxLength: 20,
            message: 'Please enter a valid phone number'
        }
    },
    {
        key: 'companyName',
        label: 'Company Name',
        type: 'text',
        required: false,
        validation: {
            minLength: 2,
            maxLength: 100,
            message: 'Company name must be between 2 and 100 characters'
        }
    },
]

export { sellerTableColumns, sellerFormFields, sellerUpdateFormFields }