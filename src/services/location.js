import { get, post, put, del } from './api'

const LOCATION_PATH = '/api/v1/web/location'

// Standardized method names
export const getAll = async (params = {}) => {
  const response = await get(LOCATION_PATH, params)
  return response
}

export const getById = async (id) => {
  const response = await get(LOCATION_PATH + '/' + id)
  return response
}

export const create = async (locationData) => {
  const response = await post(LOCATION_PATH, locationData)
  return response
}

export const update = async (id, locationData) => {
  const response = await put(LOCATION_PATH + '/' + id, locationData)
  return response
}

export const remove = async (id) => {
  const response = await del(LOCATION_PATH + '/' + id)
  return response
}

// Backward compatibility - keep old names as aliases
export const getLocations = getAll
export const getLocationById = getById
export const createLocation = create
export const updateLocation = update
export const deleteLocation = remove

export default { getAll, getById, create, update, remove, getLocations, getLocationById, createLocation, updateLocation, deleteLocation }
