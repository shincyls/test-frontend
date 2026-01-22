import { get, post, put, del } from './api'

const SALE_PATH = '/api/v1/web/sale'

export const getSales = async (params = {}) => {
  const response = await get(SALE_PATH, params)
  return response
}

export const getSaleById = async (id) => {
  const response = await get(SALE_PATH + '/' + id)
  return response
}

export const createSale = async (saleData) => {
  const response = await post(SALE_PATH, saleData)
  return response
}

export const updateSale = async (id, saleData) => {
  const response = await put(SALE_PATH + '/' + id, saleData)
  return response
}

export const deleteSale = async (id) => {
  const response = await del(SALE_PATH + '/' + id)
  return response
}

export default { getSales, getSaleById, createSale, updateSale, deleteSale }