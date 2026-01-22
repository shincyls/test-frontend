import { get, post, put, del } from './api'

const USER_PATH = '/api/v1/web/user'

// Standardized method names
export const getAll = async (params = {}) => {
  const response = await get(USER_PATH, params)
  return response
}

export const getById = async (id) => {
  const response = await get(USER_PATH + '/' + id)
  return response
}

export const create = async (userData) => {
  const response = await post(USER_PATH, userData)
  return response
}

export const update = async (id, userData) => {
  const response = await put(USER_PATH + '/' + id, userData)
  return response
}

export const remove = async (id) => {
  const response = await del(USER_PATH + '/' + id)
  return response
}

// Backward compatibility - keep old names as aliases
export const getUsers = getAll
export const getUserById = getById
export const createUser = create
export const updateUser = update
export const deleteUser = remove

export default { getAll, getById, create, update, remove, getUsers, getUserById, createUser, updateUser, deleteUser }