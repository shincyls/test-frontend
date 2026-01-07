import { get, post, put, del } from './api'

const BOOKING_PATH = '/api/v1/web/bookings'

export const getBookings = async (params = {}) => {
  const response = await get(BOOKING_PATH, params)
  return response
}

export const getBookingById = async (id) => {
  const response = await get(BOOKING_PATH + '/' + id)
  return response
}

export const createBooking = async (bookingData) => {
  const response = await post(BOOKING_PATH, bookingData)
  return response
}

export const updateBooking = async (id, bookingData) => {
  const response = await put(BOOKING_PATH + '/' + id, bookingData)
  return response
}

export const deleteBooking = async (id) => {
  const response = await del(BOOKING_PATH + '/' + id)
  return response
}

export default { getBookings, getBookingById, createBooking, updateBooking, deleteBooking }

