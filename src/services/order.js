import { get, post, put, del } from './api'

const ORDER_PATH = '/api/v1/web/order'

export const getOrders = async (params = {}) => {
  const response = await get(ORDER_PATH, params)
  return response
}

export const getOrderById = async (id) => {
  const response = await get(ORDER_PATH + '/' + id)
  return response
}

export const createOrder = async (orderData) => {
  const response = await post(ORDER_PATH, orderData)
  return response
}

export const updateOrder = async (id, orderData) => {
  const response = await put(ORDER_PATH + '/' + id, orderData)
  return response
}

export const deleteOrder = async (id) => {
  const response = await del(ORDER_PATH + '/' + id)
  return response
}

export default { getOrders, getOrderById, createOrder, updateOrder, deleteOrder }