import { get, post, put, del } from './api'

const ADMIN_PATH = '/api/v1/web/admin/'

export const getAdmins = async (params = {}) => {
  const response = await get(ADMIN_PATH, params)
  return response
}

export const getAdminById = async (id) => {
  const response = await get(ADMIN_PATH + id)
  return response
}

export const createAdmin = async (adminData) => {
  const response = await post(ADMIN_PATH, adminData)
  return response
}

export const updateAdmin = async (id, adminData) => {
  const response = await put(ADMIN_PATH + id, adminData)
  return response
}

export const deleteAdmin = async (id) => {
  const response = await del(ADMIN_PATH + id)
  return response
}

export default { getAdmins, getAdminById, createAdmin, updateAdmin, deleteAdmin }
