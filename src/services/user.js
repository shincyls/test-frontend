import { get, post, put, del } from './api'

const USER_PATH = '/api/v1/web/members/'

export const getUsers = async (params = {}) => {
  const response = await get(USER_PATH, params)
  return response
}

export const getUserById = async (id) => {
  const response = await get(USER_PATH + id)
  return response
}

export const createUser = async (userData) => {
  const response = await post(USER_PATH, userData)
  return response
}

export const updateUser = async (id, userData) => {
  const response = await put(USER_PATH + id, userData)
  return response
}

export const deleteUser = async (id) => {
  const response = await del(USER_PATH + id)
  return response
}

export default { getUsers, getUserById, createUser, updateUser, deleteUser }
