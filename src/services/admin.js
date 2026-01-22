import { get, post, put, del } from './api'

const ADMIN_PATH = '/api/v1/web/admin/'

// Standardized method names
export const getAll = async (params = {}) => {
  const response = await get(ADMIN_PATH, params)
  return response
}

export const getById = async (id) => {
  const response = await get(ADMIN_PATH + id)
  return response
}

export const create = async (adminData) => {
  const response = await post(ADMIN_PATH, adminData)
  return response
}

export const update = async (id, adminData) => {
  const response = await put(ADMIN_PATH + id, adminData)
  return response
}

export const remove = async (id) => {
  const response = await del(ADMIN_PATH + id)
  return response
}

// Backward compatibility - keep old names as aliases
export const getAdmins = getAll
export const getAdminById = getById
export const createAdmin = create
export const updateAdmin = update
export const deleteAdmin = remove

export default { getAll, getById, create, update, remove, getAdmins, getAdminById, createAdmin, updateAdmin, deleteAdmin }
