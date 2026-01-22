import { get, post, put, del } from './api'

const PRODUCT_PATH = '/api/v1/web/product'

// Standardized method names
export const getAll = async (params = {}) => {
  const response = await get(PRODUCT_PATH, params)
  return response
}

export const getById = async (id) => {
  const response = await get(PRODUCT_PATH + '/' + id)
  return response
}

export const create = async (productData) => {
  const response = await post(PRODUCT_PATH, productData)
  return response
}

export const update = async (id, productData) => {
  const response = await put(PRODUCT_PATH + '/' + id, productData)
  return response
}

export const remove = async (id) => {
  const response = await del(PRODUCT_PATH + '/' + id)
  return response
}

// Backward compatibility - keep old names as aliases
export const getProducts = getAll
export const getProductById = getById
export const createProduct = create
export const updateProduct = update
export const deleteProduct = remove

export default { getAll, getById, create, update, remove, getProducts, getProductById, createProduct, updateProduct, deleteProduct }