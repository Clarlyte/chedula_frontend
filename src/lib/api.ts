import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  auth: {
    login: '/auth/login/',
    register: '/auth/register/',
    refresh: '/auth/refresh/',
  },
  bookings: {
    list: '/bookings/',
    create: '/bookings/',
    get: (id: string) => `/bookings/${id}/`,
    update: (id: string) => `/bookings/${id}/`,
    delete: (id: string) => `/bookings/${id}/`,
  },
  customers: {
    list: '/customers/',
    create: '/customers/',
    get: (id: string) => `/customers/${id}/`,
    update: (id: string) => `/customers/${id}/`,
    delete: (id: string) => `/customers/${id}/`,
  },
  services: {
    list: '/services/',
    create: '/services/',
    get: (id: string) => `/services/${id}/`,
    update: (id: string) => `/services/${id}/`,
    delete: (id: string) => `/services/${id}/`,
  },
}; 