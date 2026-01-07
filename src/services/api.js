const API_BASE_URL = 'http://localhost:3000'

const getToken = () => localStorage.getItem('token')

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
    headers
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

export const get = (path, params = {}) => {
  const queryString = new URLSearchParams(params).toString()
  const url = queryString ? path + '?' + queryString : path
  return apiRequest(url, { method: 'GET' })
}

export const post = (path, body = {}) => {
  return apiRequest(path, {
    method: 'POST',
    body: JSON.stringify(body)
  })
}

export const put = (path, body = {}) => {
  return apiRequest(path, {
    method: 'PUT',
    body: JSON.stringify(body)
  })
}

export const del = (path) => {
  return apiRequest(path, { method: 'DELETE' })
}

export default { get, post, put, del, apiRequest }
