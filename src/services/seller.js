import { get, post, put, del } from './api'

const SELLER_PATH = '/api/v1/web/seller'

export const getSellers = async (params = {}) => {
  const response = await get(SELLER_PATH, params)
  return response
}

export const getSellerById = async (id) => {
  const response = await get(SELLER_PATH + '/' + id)
  return response
}

export const createSeller = async (sellerData) => {
  const response = await post(SELLER_PATH, sellerData)
  return response
}

export const updateSeller = async (id, sellerData) => {
  const response = await put(SELLER_PATH + '/' + id, sellerData)
  return response
}

export const deleteSeller = async (id) => {
  const response = await del(SELLER_PATH + '/' + id)
  return response
}

export default { getSellers, getSellerById, createSeller, updateSeller, deleteSeller }