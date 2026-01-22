import { get, post, put, del } from './api'

const SALE_PATH = '/api/v1/web/sale'

// Standardized method names
export const getAll = async (params = {}) => {
  const response = await get(SALE_PATH, params)
  return response
}

export const getById = async (id) => {
  const response = await get(SALE_PATH + '/' + id)
  return response
}

export const create = async (saleData) => {
  const response = await post(SALE_PATH, saleData)
  return response
}

export const update = async (id, saleData) => {
  const response = await put(SALE_PATH + '/' + id, saleData)
  return response
}

export const remove = async (id) => {
  const response = await del(SALE_PATH + '/' + id)
  return response
}

// Backward compatibility - keep old names as aliases
export const getSales = getAll
export const getSaleById = getById
export const createSale = create
export const updateSale = update
export const deleteSale = remove

export default { getAll, getById, create, update, remove, getSales, getSaleById, createSale, updateSale, deleteSale }