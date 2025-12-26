import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    const message =
      (error.response?.data && (error.response.data.message ?? error.response.data.error)) ??
      error.message ??
      'Unexpected error'

    return Promise.reject(new Error(message))
  }
)

export default apiClient
