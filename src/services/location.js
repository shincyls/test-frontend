import { get, post, put, del } from './api'

const LOCATION_PATH = '/api/v1/web/location'

export const getLocations = async (params = {}) => {
  const response = await get(LOCATION_PATH, params)
  return response
}

export const getLocationById = async (id) => {
  const response = await get(LOCATION_PATH + '/' + id)
  return response
}

export const createLocation = async (locationData) => {
  const response = await post(LOCATION_PATH, locationData)
  return response
}

export const updateLocation = async (id, locationData) => {
  const response = await put(LOCATION_PATH + '/' + id, locationData)
  return response
}

export const deleteLocation = async (id) => {
  const response = await del(LOCATION_PATH + '/' + id)
  return response
}

export default { getLocations, getLocationById, createLocation, updateLocation, deleteLocation }
