/**
 * Validate a single field value against its validation rules
 * @param {*} value - The value to validate
 * @param {Object} field - The field definition from model
 * @returns {Object} - { valid: boolean, error: string }
 */
export const validateField = (value, field) => {
    // Check required fields
    if (field.required && (value === null || value === undefined || value === '')) {
        return {
            valid: false,
            error: `${field.label} is required`
        }
    }

    // If no validation rules or value is empty (and not required), skip validation
    if (!field.validation || value === null || value === undefined || value === '') {
        return { valid: true, error: null }
    }

    const validation = field.validation

    // Min length validation
    if (validation.minLength && typeof value === 'string' && value.length < validation.minLength) {
        return {
            valid: false,
            error: validation.message || `${field.label} must be at least ${validation.minLength} characters`
        }
    }

    // Max length validation
    if (validation.maxLength && typeof value === 'string' && value.length > validation.maxLength) {
        return {
            valid: false,
            error: validation.message || `${field.label} must not exceed ${validation.maxLength} characters`
        }
    }

    // Min value validation (for numbers)
    if (validation.min !== undefined && typeof value === 'number' && value < validation.min) {
        return {
            valid: false,
            error: validation.message || `${field.label} must be at least ${validation.min}`
        }
    }

    // Max value validation (for numbers)
    if (validation.max !== undefined && typeof value === 'number' && value > validation.max) {
        return {
            valid: false,
            error: validation.message || `${field.label} must not exceed ${validation.max}`
        }
    }

    // Pattern validation (regex)
    if (validation.pattern && typeof value === 'string' && !validation.pattern.test(value)) {
        return {
            valid: false,
            error: validation.message || `${field.label} format is invalid`
        }
    }

    return { valid: true, error: null }
}

/**
 * Validate all fields in a form data object
 * @param {Object} data - The form data to validate
 * @param {Array} model - The model definition (array of field objects)
 * @returns {Object} - { valid: boolean, errors: Object }
 */
export const validateForm = (data, model) => {
    const errors = {}
    let isValid = true

    model.forEach(field => {
        const value = data[field.key]
        const result = validateField(value, field)
        
        if (!result.valid) {
            errors[field.key] = result.error
            isValid = false
        }
    })

    return {
        valid: isValid,
        errors
    }
}

/**
 * Get validation attributes for HTML input elements
 * @param {Object} field - The field definition from model
 * @returns {Object} - HTML validation attributes
 */
export const getValidationAttrs = (field) => {
    const attrs = {}

    if (field.required) {
        attrs.required = true
    }

    if (field.validation) {
        if (field.validation.minLength) {
            attrs.minlength = field.validation.minLength
        }
        if (field.validation.maxLength) {
            attrs.maxlength = field.validation.maxLength
        }
        if (field.validation.min !== undefined) {
            attrs.min = field.validation.min
        }
        if (field.validation.max !== undefined) {
            attrs.max = field.validation.max
        }
        if (field.validation.pattern) {
            attrs.pattern = field.validation.pattern.source
        }
    }

    return attrs
}

export default {
    validateField,
    validateForm,
    getValidationAttrs
}

