import { post, get } from './api'

const AUTH_PATH = '/api/v1/web/auth'

export const login = async (credentials) => {
  const response = await post(AUTH_PATH + '/login', {
    username: credentials.username,
    password: credentials.password
  })
  return response
}

export const getUser = async () => {
  const response = await get(AUTH_PATH + '/admin')
  return response
}

export const register = async (userData) => {
  const response = await post(AUTH_PATH + '/register', userData)
  return response
}

export const logout = async () => {
  const response = await post(AUTH_PATH + '/logout')
  return response
}

export default { login, getUser, register, logout }
