import axios, { type RawAxiosRequestConfig } from 'axios'
import { env } from '@utils/env.config'

const { 
  frontend: { VITE_BACKEND_URL } 
} = env

/**
 * Function to create an Axios instance with a base URL and options.
 * @param baseURL - The base URL for the Axios instance.
 * @param options - Additional Axios request configuration options.
 * @returns An Axios instance configured with the specified base URL and options.
 */
const axiosInstance = (baseURL: string, options: Omit<RawAxiosRequestConfig, 'baseURL'> = {}) =>
  axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

/**
 * Axios instance for backend API requests.
 */
export const backendInstance = axiosInstance(VITE_BACKEND_URL)

/**
 * Axios instance for JSON requests from frontend public directory.
 */
export const localInstance = axiosInstance('/api')