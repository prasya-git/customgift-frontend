
import apiService from '../api/apiService'

// ================= AUTH APIs =================

// Register User
export const registerAPI = (data) => {
    return apiService('POST', '/register', data)
}

// Login User
export const loginAPI = (data) => {
    return apiService('POST', '/login', data)
}


// ================= GIFT APIs =================

// Add Gift (Admin)
export const addGiftAPI = (data, headers) => {
    return apiService('POST', '/gifts', data, headers)
}

// Get All Gifts
export const getGiftsAPI = () => {
    return apiService('GET', '/gifts')
}

// Get Single Gift
export const getSingleGiftAPI = (id) => {
    return apiService('GET', `/gifts/${id}`)
}

// Update Gift (Admin)
export const updateGiftAPI = (id, data) => {
    return apiService('PUT', `/gifts/${id}`, data)
}

// Delete Gift (Admin)
export const deleteGiftAPI = (id) => {
    return apiService('DELETE', `/gifts/${id}`)
}


// ================= ORDER APIs =================

// Place Order
export const placeOrderAPI = (data) => {
    return apiService('POST', '/orders', data)
}

// Get All Orders (Admin)
export const getOrdersAPI = () => {
    return apiService('GET', '/orders')
}

// Get My Orders (User)
export const getMyOrdersAPI = () => {
    return apiService('GET', '/my-orders')
}

// Update Order Status (Admin)
export const updateOrderStatusAPI = (id, status) => {
    return apiService('PUT', `/orders/${id}`, { status })
}


// ================= PROFILE APIs =================

// Get Logged-in User Profile
export const getProfileAPI = () => {
    return apiService('GET', '/profile')
}

// Update User Profile
export const updateProfileAPI = (data) => {
    return apiService('PUT', '/update-profile', data)
}


// ================= ADMIN APIs =================

// Get All Users (Admin)
export const getUsersAPI = () => {
    return apiService('GET', '/users')
}
