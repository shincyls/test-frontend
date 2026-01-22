import { formatCoordinates, formatActive } from '../utils/formatters.js'

const locationTableColumns = [
    { field: 'locationName', title: 'Name', column: 1, sortable: true },
    { field: 'locationType', title: 'Type', sortable: true },
    { field: 'addressComponents.city', title: 'City', sortable: true },
    { field: 'addressComponents.state', title: 'State', sortable: true },
    { field: 'addressComponents.country', title: 'Country', sortable: true },
    { field: 'addressComponents.poscode', title: 'Poscode', sortable: true },
    { field: 'isActive', title: 'Active', column: 7, sortable: true, format: formatActive }
]

const locationFormFields = [
    {
        key: 'locationName',
        label: 'Name',
        type: 'text',
        required: true,
        validation: {
            minLength: 3,
            maxLength: 100,
            message: 'Location name must be between 3 and 100 characters'
        }
    },
    {
        key: 'locationType',
        label: 'Type',
        type: 'select',
        required: true,
        options: [
            { value: 'residential', label: 'Residential' },
            { value: 'commercial', label: 'Commercial' },
            { value: 'industrial', label: 'Industrial' },
            { value: 'other', label: 'Other' }
        ]
    },
    {
        key: 'location.coordinates',
        label: 'Coordinates',
        type: 'text',
        required: true,
        validation: {
            pattern: /^[-+]?\d+(\.\d+)?,[-+]?\d+(\.\d+)?$/,
            message: 'Invalid coordinates format (e.g. 1.23456, -1.23456)'
        }
    },
    {
        key: 'addressComponents.city',
        label: 'City',
        type: 'text',
        required: true,
        validation: {
            minLength: 3,
            maxLength: 100,
            message: 'City name must be between 3 and 100 characters'
        }
    },
    {
        key: 'addressComponents.state',
        label: 'State',
        type: 'text',
        required: true,
        validation: {
            minLength: 3,
            maxLength: 100,
            message: 'State name must be between 3 and 100 characters'
        }
    },
    {
        key: 'addressComponents.country',
        label: 'Country',
        type: 'text',
        required: true,
        validation: {
            minLength: 3,
            maxLength: 100,
            message: 'Country name must be between 3 and 100 characters'
        }
    },
    {
        key: 'addressComponents.poscode',
        label: 'Poscode',
        type: 'text',
        required: true,
        validation: {
            pattern: /^\d{5}$/,
            message: 'Poscode must be 5 digits'
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
    }
]

const locationUpdateFormFields = [
    {
        key: 'locationName',
        label: 'Name',
        type: 'text',
        required: true,
        validation: {
            minLength: 3,
            maxLength: 100,
            message: 'Location name must be between 3 and 100 characters'
        }
    },
    {   
        key: 'locationType',
        label: 'Type',
        type: 'select',
        required: true,
        options: [
            { value: 'residential', label: 'Residential' },
            { value: 'commercial', label: 'Commercial' },
            { value: 'industrial', label: 'Industrial' },
            { value: 'other', label: 'Other' }
        ]
    },
    {
        key: 'location.coordinates',
        label: 'Coordinates',
        type: 'text',
        required: true,
        validation: {
            pattern: /^[-+]?\d+(\.\d+)?,[-+]?\d+(\.\d+)?$/,
            message: 'Invalid coordinates format (e.g. 1.23456, -1.23456)'
        }
    },
    {
        key: 'addressComponents.city',
        label: 'City',
        type: 'text',
        required: true,
        validation: {
            minLength: 3,
            maxLength: 100,
            message: 'City name must be between 3 and 100 characters'
        }
    },
    {
        key: 'addressComponents.state',
        label: 'State',
        type: 'text',
        required: true,
        validation: {
            minLength: 3,
            maxLength: 100,
            message: 'State name must be between 3 and 100 characters'
        }
    },
    {
        key: 'addressComponents.country',
        label: 'Country',
        type: 'text',
        required: true,
        validation: {
            minLength: 3,
            maxLength: 100,
            message: 'Country name must be between 3 and 100 characters'
        }
    },
    {
        key: 'addressComponents.poscode',
        label: 'Poscode',
        type: 'text',
        required: true,
        validation: {
            pattern: /^\d{5}$/,
            message: 'Poscode must be 5 digits'
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
    }
]

export { locationTableColumns, locationFormFields, locationUpdateFormFields }