const locationModel = [
    { key: 'locationName', label: 'Location Name', type: 'text', required: true, column: 1 },
    { key: 'googleName', label: 'Google Name', type: 'text', column: 2 },
    { key: 'googlePlaceId', label: 'Google Place ID', type: 'text', column: 3 },
    { key: 'formattedAddress', label: 'Formatted Address', type: 'text', column: 4 },
    { key: 'addressComponents.streetNumber', label: 'Street Number', type: 'text', column: 5 },
    { key: 'addressComponents.street', label: 'Street', type: 'text', column: 6 },
    { key: 'addressComponents.district', label: 'District', type: 'text', column: 7 },
    { key: 'addressComponents.city', label: 'City', type: 'text', column: 8 },
    { key: 'addressComponents.state', label: 'State', type: 'text', column: 9 },
    { key: 'addressComponents.country', label: 'Country', type: 'text', column: 0 },
    { key: 'addressComponents.poscode', label: 'Poscode', type: 'text', column: 0 },
    { key: 'location.coordinates', label: 'Coordinates', type: 'text', column: 0 },
    { key: 'locationType', label: 'Location Type', type: 'text', column: 0 },
    { key: 'isActive', label: 'Active', type: 'select', options: [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' }
    ]},
]

export default locationModel