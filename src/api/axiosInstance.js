import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000
})

// Attach JWT token to protected API requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

// Global response error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status

            if (status === 401) {
                console.log("Unauthorized access. Please login.")
            } else if (status === 403) {
                console.log("Access forbidden. Check enrollment or permissions.")
            } else if (status === 404) {
                console.log("API endpoint or resource not found.")
            } else if (status >= 500) {
                console.log("Server error.")
            }
        } else if (error.request) {
            console.log("No response from server.")
        } else {
            console.log("Request error:", error.message)
        }

        return Promise.reject(error)
    }
)

export default axiosInstance