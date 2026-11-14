import axiosInstance from './axiosInstance'

// User APIs
export const registerAPI = (data) =>
  axiosInstance.post('/register', data)

export const loginAPI = (data) =>
  axiosInstance.post('/login', data)

// Gift APIs
export const addGiftAPI = (data) =>
  axiosInstance.post('/gifts', data)

export const getGiftsAPI = () =>
  axiosInstance.get('/gifts')

export const getSingleGiftAPI = (id) =>
  axiosInstance.get(`/gifts/${id}`)

export const updateGiftAPI = (id, data) =>
  axiosInstance.put(`/gifts/${id}`, data)

export const deleteGiftAPI = (id) =>
  axiosInstance.delete(`/gifts/${id}`)

// Order APIs
export const placeOrderAPI = (data) =>
  axiosInstance.post('/orders', data)

export const getOrdersAPI = () =>
  axiosInstance.get('/orders')

export const updateOrderStatusAPI = (id, status) =>
  axiosInstance.put(`/orders/${id}`, { status })