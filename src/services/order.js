import { get, post, put, del } from './api'

const ORDER_PATH = '/api/v1/web/order'

// Standardized method names
export const getAll = async (params = {}) => {
  const response = await get(ORDER_PATH, params)
  return response
}

export const getById = async (id) => {
  const response = await get(ORDER_PATH + '/' + id)
  return response
}

export const create = async (orderData) => {
  const response = await post(ORDER_PATH, orderData)
  return response
}

export const update = async (id, orderData) => {
  const response = await put(ORDER_PATH + '/' + id, orderData)
  return response
}

export const remove = async (id) => {
  const response = await del(ORDER_PATH + '/' + id)
  return response
}

// Backward compatibility - keep old names as aliases
export const getOrders = getAll
export const getOrderById = getById
export const createOrder = create
export const updateOrder = update
export const deleteOrder = remove

export default { getAll, getById, create, update, remove, getOrders, getOrderById, createOrder, updateOrder, deleteOrder }