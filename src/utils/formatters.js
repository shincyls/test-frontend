/**
 * Common formatter functions for model fields
 * These can be used in the `format` property of model field definitions
 */

/**
 * Format an array to a comma-separated string
 * @param {Array} value - The array to format
 * @param {string} separator - The separator to use (default: ', ')
 * @returns {string} Formatted string
 */
export const arrayToString = (value, separator = ', ') => {
    if (Array.isArray(value)) {
        return value.join(separator)
    }
    return value || '-'
}

/**
 * Format coordinates array [longitude, latitude] to string
 * @param {Array} value - Array of [longitude, latitude]
 * @returns {string} Formatted coordinates
 */
export const formatCoordinates = (value) => {
    if (Array.isArray(value) && value.length === 2) {
        return `${value[0]}, ${value[1]}`
    }
    return value || '-'
}

export const formatURL = (value) => {
    return  `<a href="http://google.com/${value}" target="_blank">${value}" target="_blank">${value}</a>`
}

/**
 * Format price with currency symbol
 * @param {number} value - The price value
 * @param {string} currency - Currency symbol (default: 'RM')
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted price
 */
export const formatPrice = (value, currency = 'RM', decimals = 2) => {
    if (value === null || value === undefined) return '-'
    return `${currency} ${parseFloat(value).toFixed(decimals)}`
}

/**
 * Format date to readable string
 * @param {string|Date} value - The date value
 * @param {string} format - Format type: 'short', 'long', 'time' (default: 'short')
 * @returns {string} Formatted date
 */
export const formatDate = (value, format = 'short') => {
    if (!value) return '-'
    
    const date = new Date(value)
    if (isNaN(date.getTime())) return value
    
    const options = {
        short: { year: 'numeric', month: '2-digit', day: '2-digit' },
        long: { year: 'numeric', month: 'long', day: 'numeric' },
        time: { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
    }
    
    return date.toLocaleDateString('en-MY', options[format] || options.short)
}

/**
 * Format boolean to Yes/No
 * @param {boolean} value - The boolean value
 * @returns {string} 'Yes' or 'No'
 */
export const formatBoolean = (value) => {
    return value ? 'Yes' : 'No'
}

/**
 * Format boolean to Active/Inactive
 * @param {boolean} value - The boolean value
 * @returns {string} 'Active' or 'Inactive'
 */
export const formatActive = (value) => {
    return value ? 'Active' : 'Inactive'
}

/**
 * Truncate long text with ellipsis
 * @param {string} value - The text to truncate
 * @param {number} maxLength - Maximum length (default: 50)
 * @returns {string} Truncated text
 */
export const truncateText = (value, maxLength = 50) => {
    if (!value) return '-'
    if (value.length <= maxLength) return value
    return value.substring(0, maxLength) + '...'
}

/**
 * Format phone number
 * @param {string} value - The phone number
 * @returns {string} Formatted phone number
 */
export const formatPhone = (value) => {
    if (!value) return '-'
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '')
    // Format as Malaysian phone number if it starts with 60
    if (cleaned.startsWith('60')) {
        return `+${cleaned.substring(0, 2)} ${cleaned.substring(2, 4)} ${cleaned.substring(4)}`
    }
    // Format as local number
    if (cleaned.length >= 10) {
        return `${cleaned.substring(0, 3)}-${cleaned.substring(3, 7)}-${cleaned.substring(7)}`
    }
    return value
}

/**
 * Format percentage
 * @param {number} value - The value (0-100 or 0-1)
 * @param {boolean} isDecimal - Whether value is in decimal form (0-1) (default: false)
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, isDecimal = false) => {
    if (value === null || value === undefined) return '-'
    const percentage = isDecimal ? value * 100 : value
    return `${percentage.toFixed(2)}%`
}

/**
 * Format file size in bytes to human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Capitalize first letter of each word
 * @param {string} value - The text to capitalize
 * @returns {string} Capitalized text
 */
export const capitalizeWords = (value) => {
    if (!value) return '-'
    return value.replace(/\b\w/g, char => char.toUpperCase())
}

