import { formatPrice, formatActive } from '../utils/formatters.js'

const productTableColumns = [
    { field: 'productName', title: 'Name', sortable: true },
    { field: 'productDesc', title: 'Description', sortable: true },
    { field: 'productCategory', title: 'Category', sortable: true },
    { field: 'productPrice', title: 'Price', sortable: true, format: formatPrice },
    { field: 'isActive', title: 'Active', sortable: true, format: formatActive }
]

const productFormFields = [
    {
        key: 'productName',
        label: 'Name',
        type: 'text',
        required: true,
        validation: {
            minLength: 3,
            maxLength: 200,
            message: 'Product name must be between 3 and 200 characters'
        }
    },
    {
        key: 'productDesc',
        label: 'Description',
        type: 'textarea',
        required: true,
        validation: {
            maxLength: 1000,
            message: 'Description must not exceed 1000 characters'
        }
    },
    {
        key: 'productCategory',
        label: 'Category',
        type: 'text',
        required: true,
        validation: {
            maxLength: 100
        }
    },
    {
        key: 'productPrice',    
        label: 'Price (RM)',
        type: 'number',
        required: true,
        validation: {
            min: 0,
            message: 'Price must be a positive number'
        },
        format: formatPrice
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
    }
]

const productUpdateFormFields = []

export { productTableColumns, productFormFields, productUpdateFormFields }