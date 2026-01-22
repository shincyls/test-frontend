const saleTableColumns = [
    { field: 'productId', title: 'Product ID', sortable: true },
    { field: 'sellerId', title: 'Seller ID', sortable: true },
    { field: 'saleType', title: 'Sale Type', sortable: true },
    { field: 'sellingPrice', title: 'Selling Price', sortable: true },
    { field: 'originalPrice', title: 'Original Price', sortable: true },
    { field: 'stock', title: 'Stock', sortable: true },
    { field: 'startTime', title: 'Start Time', sortable: true },
    { field: 'endTime', title: 'End Time', sortable: true },
    { field: 'isActive', title: 'Active', sortable: true },
    { field: 'groupbuyStatus', title: 'Groupbuy Status', sortable: true }
]

const saleFormFields = [
    {
        key: 'productId',
        label: 'Product ID',
        type: 'text',
        required: true,
        column: 1
    },
    {
        key: 'sellerId',
        label: 'Seller ID',
        type: 'text',
        required: true,
        column: 2
    },
    {
        key: 'saleType',
        label: 'Sale Type',
        type: 'select',
        required: true,
        column: 3,
        options: [
            { value: 'direct', label: 'Direct Sale' },
            { value: 'groupbuy', label: 'Group Buy' }
        ]
    },
    {
        key: 'sellingPrice',
        label: 'Selling Price (RM)',
        type: 'number',
        column: 4,
        validation: {
            min: 0,
            message: 'Price must be a positive number'
        }
    },
    {
        key: 'originalPrice',
        label: 'Original Price (RM)',
        type: 'number',
        column: 5,
        validation: {
            min: 0,
            message: 'Price must be a positive number'
        }
    },
    {
        key: 'stock',
        label: 'Stock',
        type: 'number',
        column: 6,
        validation: {
            min: 0,
            message: 'Stock must be a positive number'
        }
    },
    { key: 'startTime', label: 'Start Time', type: 'datetime-local', required: true, column: 7 },
    { key: 'endTime', label: 'End Time', type: 'datetime-local', required: true, column: 8 },
    { key: 'createdAt', label: 'Created', type: 'text', column: 0 },
    {
        key: 'isActive',
        label: 'Active',
        type: 'select',
        required: true,
        column: 9,
        options: [
            { value: true, label: 'Active' },
            { value: false, label: 'Inactive' }
        ]
    },
    {
        key: 'groupbuyStatus',
        label: 'Groupbuy Status',
        type: 'select',
        column: 10,
        options: [
            { value: 'on-going', label: 'On-going' },
            { value: 'success', label: 'Success' },
            { value: 'fail', label: 'Failed' },
            { value: 'cancelled', label: 'Cancelled' }
        ]
    }
]

const saleUpdateFormFields = [
    {
        key: 'productId',
        label: 'Product ID',
        type: 'text',
        required: true,
        column: 1
    },
    {
        key: 'sellerId',
        label: 'Seller ID',
        type: 'text',
        required: true,
        column: 2
    },
    {
        key: 'saleType',
        label: 'Sale Type',
        type: 'select',
        required: true,
        column: 3,
        options: [
            { value: 'direct', label: 'Direct Sale' },
            { value: 'groupbuy', label: 'Group Buy' }
        ]
    },
    {
        key: 'sellingPrice',
        label: 'Selling Price (RM)',
        type: 'number',
        column: 4,
        validation: {
            min: 0,
            message: 'Price must be a positive number'
        }
    },
    {
        key: 'originalPrice',
        label: 'Original Price (RM)',
        type: 'number',
        column: 5,
        validation: {
            min: 0,
            message: 'Price must be a positive number'
        }
    },
    {
        key: 'stock',
        label: 'Stock',
        type: 'number',
        column: 6,
        validation: {
            min: 0,
            message: 'Stock must be a positive number'
        }
    },
    { key: 'startTime', label: 'Start Time', type: 'datetime-local', required: true, column: 7 },
    { key: 'endTime', label: 'End Time', type: 'datetime-local', required: true, column: 8 },
    {
        key: 'isActive',
        label: 'Active',
        type: 'select',
        required: true,
        column: 9,
        options: [
            { value: true, label: 'Active' },
            { value: false, label: 'Inactive' }
        ]
    }
]

export { saleTableColumns, saleFormFields, saleUpdateFormFields }