import { get, post, put, del } from './api'

const SELLER_PATH = '/api/v1/web/seller'

// Standardized method names
export const getAll = async (params = {}) => {
  const response = await get(SELLER_PATH, params)
  return response
}

export const getById = async (id) => {
  const response = await get(SELLER_PATH + '/' + id)
  return response
}

export const create = async (sellerData) => {
  const response = await post(SELLER_PATH, sellerData)
  return response
}

export const update = async (id, sellerData) => {
  const response = await put(SELLER_PATH + '/' + id, sellerData)
  return response
}

export const remove = async (id) => {
  const response = await del(SELLER_PATH + '/' + id)
  return response
}

// Backward compatibility - keep old names as aliases
export const getSellers = getAll
export const getSellerById = getById
export const createSeller = create
export const updateSeller = update
export const deleteSeller = remove

export default { getAll, getById, create, update, remove, getSellers, getSellerById, createSeller, updateSeller, deleteSeller }