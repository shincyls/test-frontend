const API_BASE_URL = import.meta.env.API_BASE_URL || 'http://localhost:3000' || 'http://127.0.0.1:8000'

const getToken = () => localStorage.getItem('token')

/**
 * Recursively convert all _id fields to id throughout the data structure
 * Handles objects, arrays, and nested structures
 * @param {*} data - The data to transform
 * @returns {*} Transformed data with _id converted to id
 */
const convertMongoIdToId = (data) => {
  // Handle null or undefined
  if (data === null || data === undefined) {
    return data
  }

  // Handle arrays - recursively convert each item
  if (Array.isArray(data)) {
    return data.map(item => convertMongoIdToId(item))
  }

  // Handle objects
  if (typeof data === 'object') {
    const converted = {}

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        // Convert _id to id
        if (key === '_id') {
          converted.id = data[key]
        } else {
          // Recursively convert nested objects/arrays
          converted[key] = convertMongoIdToId(data[key])
        }
      }
    }

    return converted
  }

  // Return primitive values as-is
  return data
}

/**
 * Recursively convert all id fields back to _id for MongoDB
 * Used when sending data to the backend
 * @param {*} data - The data to transform
 * @returns {*} Transformed data with id converted to _id
 */
const convertIdToMongoId = (data) => {
  // Handle null or undefined
  if (data === null || data === undefined) {
    return data
  }

  // Handle arrays - recursively convert each item
  if (Array.isArray(data)) {
    return data.map(item => convertIdToMongoId(item))
  }

  // Handle objects
  if (typeof data === 'object') {
    const converted = {}

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        // Convert id to _id (but keep both for compatibility)
        if (key === 'id') {
          converted._id = data[key]
        } else {
          // Recursively convert nested objects/arrays
          converted[key] = convertIdToMongoId(data[key])
        }
      }
    }

    return converted
  }

  // Return primitive values as-is
  return data
}

export const apiRequest = async (path, options = {}) => {
  const token = getToken()
  const isAuthRoute = path.includes('/api/v1/web/auth')

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers
  }

  if (!isAuthRoute && token) {
    headers['Authorization'] = 'Bearer ' + token
  }

  const response = await fetch(API_BASE_URL + path, {
    ...options,
    headers,
    credentials: 'omit' // disable cookies for laravel php
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  // Convert all _id fields to id recursively throughout the entire response
  const convertedData = convertMongoIdToId(data)

  return convertedData
}

export const get = (path, params = {}) => {
  const queryString = new URLSearchParams(params).toString()
  const url = queryString ? path + '?' + queryString : path
  return apiRequest(url, { method: 'GET' })
}

export const post = (path, body = {}) => {
  // Convert id back to _id before sending to backend
  const convertedBody = convertIdToMongoId(body)
  return apiRequest(path, {
    method: 'POST',
    body: JSON.stringify(convertedBody)
  })
}

export const put = (path, body = {}) => {
  // Convert id back to _id before sending to backend
  const convertedBody = convertIdToMongoId(body)
  return apiRequest(path, {
    method: 'PUT',
    body: JSON.stringify(convertedBody)
  })
}

export const del = (path) => {
  return apiRequest(path, { method: 'DELETE' })
}

export default { get, post, put, del, apiRequest }
