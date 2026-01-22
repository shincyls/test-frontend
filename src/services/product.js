import { get, post, put, del } from './api'

const PRODUCT_PATH = '/api/v1/web/product'

export const getProducts = async (params = {}) => {
  const response = await get(PRODUCT_PATH, params)
  return response
}

export const getProductById = async (id) => {
  const response = await get(PRODUCT_PATH + '/' + id)
  return response
}

export const createProduct = async (productData) => {
  const response = await post(PRODUCT_PATH, productData)
  return response
}

export const updateProduct = async (id, productData) => {
  const response = await put(PRODUCT_PATH + '/' + id, productData)
  return response
}

export const deleteProduct = async (id) => {
  const response = await del(PRODUCT_PATH + '/' + id)
  return response
}

export default { getProducts, getProductById, createProduct, updateProduct, deleteProduct }