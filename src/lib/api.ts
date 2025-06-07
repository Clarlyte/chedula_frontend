import axios from 'axios';
import { getAuthToken } from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication using centralized auth
api.interceptors.request.use(async (config) => {
  try {
    // Skip adding Authorization header for verify endpoint
    if (config.url?.includes('/users/auth/verify/')) {
      return config;
    }
    
    // Get token from centralized auth system
    const token = await getAuthToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  } catch (error) {
    console.error('Error getting auth token for API request:', error);
    return config;
  }
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access - redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // User Management
  users: {
    health: '/users/health/',
    profile: '/users/profile/',
    onboarding: '/users/profile/onboarding/',
    stats: '/users/profile/stats/',
    businessTypes: '/users/business-types/',
  },
  
  // Authentication (Backend verification)
  auth: {
    verify: '/users/auth/verify/',
    refresh: '/users/auth/refresh/',
    logout: '/users/auth/logout/',
  },
  
  // Subscription and Trial Management
  subscription: {
    status: '/users/subscription/',
    usage: '/users/subscription/usage/',
    trialExtend: '/users/subscription/trial/extend/',
  },
  
  // Security and Sessions
  security: {
    report: '/users/security/report/',
    sessions: '/users/sessions/',
  },
  
  // Legacy endpoints (to be updated)
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

// User service functions
export const userService = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get(endpoints.users.profile);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Update user profile
  updateProfile: async (profileData: any) => {
    try {
      const response = await api.put(endpoints.users.profile, profileData);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Complete onboarding
  completeOnboarding: async (onboardingData: any) => {
    try {
      const response = await api.post(endpoints.users.onboarding, onboardingData);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Get user statistics
  getStats: async () => {
    try {
      const response = await api.get(endpoints.users.stats);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Get business types
  getBusinessTypes: async () => {
    try {
      const response = await api.get(endpoints.users.businessTypes);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Verify token with backend
  verifyToken: async (token: string) => {
    try {
      const response = await api.post(endpoints.auth.verify, { token });
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },
};

// Subscription service functions
export const subscriptionService = {
  // Get subscription status
  getStatus: async () => {
    try {
      const response = await api.get(endpoints.subscription.status);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Get usage statistics
  getUsage: async () => {
    try {
      const response = await api.get(endpoints.subscription.usage);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Extend trial
  extendTrial: async (reason: string) => {
    try {
      const response = await api.post(endpoints.subscription.trialExtend, { reason });
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },
};

// Security service functions
export const securityService = {
  // Get security report
  getReport: async () => {
    try {
      const response = await api.get(endpoints.security.report);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Get user sessions
  getSessions: async () => {
    try {
      const response = await api.get(endpoints.security.sessions);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },
};

// Type definitions for API responses
export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  allDay?: boolean;
  extendedProps?: {
    booking_id?: string;
    customer_name?: string;
    service_name?: string;
    status?: string;
    description?: string;
  };
}

export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  full_name?: string;
  company?: string;
  website?: string;
  notes?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  preferred_contact_method?: 'email' | 'phone' | 'sms' | 'both' | 'any';
  customer_type?: 'individual' | 'business' | 'organization';
  status?: 'active' | 'inactive' | 'prospective' | 'blocked';
  total_bookings?: number;
  total_spent?: number;
  average_booking_value?: number;
  last_booking_date?: string;
  email_notifications?: boolean;
  sms_notifications?: boolean;
  marketing_emails?: boolean;
  ai_created?: boolean;
  ai_session_id?: string;
  ai_confidence_score?: number;
  source?: 'manual' | 'ai_assistant' | 'booking_link' | 'import' | 'api' | 'referral';
  tags?: string[];
  is_vip?: boolean;
  internal_notes?: string;
  created_at: string;
  updated_at: string;
  last_contact_date?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  is_active?: boolean;
  category_type?: 'equipment' | 'service' | 'package' | 'mixed';
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  short_description?: string;
  slug?: string;
  service_type?: 'equipment' | 'consultation' | 'delivery' | 'setup' | 'training' | 'maintenance' | 'package';
  category?: string;
  base_price?: number;
  price_per_hour?: number;
  price_per_day?: number;
  price_per_week?: number;
  availability_type?: 'unlimited' | 'limited' | 'unique';
  quantity_available?: number;
  min_booking_duration?: string;
  max_booking_duration?: string;
  advance_booking_days?: number;
  requires_approval?: boolean;
  specifications?: Record<string, any>;
  brand?: string;
  model?: string;
  serial_number?: string;
  condition?: 'excellent' | 'good' | 'fair' | 'poor';
  requires_deposit?: boolean;
  deposit_amount?: number;
  insurance_required?: boolean;
  insurance_value?: number;
  is_mobile_service?: boolean;
  travel_radius_km?: number;
  setup_time_minutes?: number;
  is_active?: boolean;
  is_featured?: boolean;
  is_public?: boolean;
  search_tags?: string[];
  promotional_text?: string;
  total_bookings?: number;
  total_revenue?: number;
  average_rating?: number;
  last_maintenance_date?: string;
  next_maintenance_due?: string;
  maintenance_interval_days?: number;
  price?: number; // Legacy compatibility
  duration_hours?: number; // Legacy compatibility  
  is_available?: boolean; // Legacy compatibility
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  customer: string; // Customer ID
  services: Array<{
    service: string; // Service ID
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Booking API service functions
export const bookingAPI = {
  // Get all bookings
  getAll: async (): Promise<{ data: Booking[] | null, error: any }> => {
    try {
      const response = await api.get('/calendar_mgmt/bookings/');
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Create booking
  create: async (bookingData: Partial<Booking>): Promise<{ data: Booking | null, error: any }> => {
    try {
      const response = await api.post('/calendar_mgmt/bookings/', bookingData);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Update booking
  update: async (id: string, bookingData: Partial<Booking>): Promise<{ data: Booking | null, error: any }> => {
    try {
      const response = await api.put(`/calendar_mgmt/bookings/${id}/`, bookingData);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Delete booking
  delete: async (id: string): Promise<{ data: any, error: any }> => {
    try {
      const response = await api.delete(`/calendar_mgmt/bookings/${id}/`);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Get calendar events
  getEvents: async (start?: string, end?: string): Promise<{ data: CalendarEvent[] | null, error: any }> => {
    try {
      const params = new URLSearchParams();
      
      // Provide default date ranges if not specified (backend requires them)
      if (!start) {
        const now = new Date();
        const defaultStart = new Date(now.getFullYear(), now.getMonth(), 1); // First day of current month
        start = defaultStart.toISOString().split('T')[0];
      }
      
      if (!end) {
        const now = new Date();
        const defaultEnd = new Date(now.getFullYear(), now.getMonth() + 2, 0); // Last day of next month
        end = defaultEnd.toISOString().split('T')[0];
      }
      
      params.append('start', start);
      params.append('end', end);
      
      const response = await api.get(`/calendar_mgmt/events/?${params}`);
      // Backend returns { events: [], categories: [], visible_categories: [] }, we need just the events array
      const eventsData = response.data?.events || response.data || [];
      return { data: eventsData, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },
};

// Customer API service functions  
export const customerAPI = {
  // Get all customers
  getAll: async (): Promise<{ data: Customer[] | null, error: any }> => {
    try {
      const response = await api.get('/customer_mgmt/');
      // Backend returns { customers: [], count: number }, we need just the customers array
      const customersData = response.data?.customers || response.data || [];
      return { data: customersData, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Create customer
  create: async (customerData: Partial<Customer>): Promise<{ data: Customer | null, error: any }> => {
    try {
      const response = await api.post('/customer_mgmt/', customerData);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Update customer
  update: async (id: string, customerData: Partial<Customer>): Promise<{ data: Customer | null, error: any }> => {
    try {
      const response = await api.put(`/customer_mgmt/${id}/`, customerData);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Delete customer
  delete: async (id: string): Promise<{ data: any, error: any }> => {
    try {
      const response = await api.delete(`/customer_mgmt/${id}/`);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Search customers
  search: async (query: string): Promise<{ data: Customer[] | null, error: any }> => {
    try {
      const response = await api.get(`/customer_mgmt/search/?q=${encodeURIComponent(query)}`);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },
};

// Service API service functions
export const serviceAPI = {
  // Get all services
  getAll: async (): Promise<{ data: Service[] | null, error: any }> => {
    try {
      const response = await api.get('/service_catalog/services/');
      // Backend returns { services: [], count: number }, we need just the services array
      const servicesData = response.data?.services || response.data || [];
      return { data: servicesData, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Create service
  create: async (serviceData: Partial<Service>): Promise<{ data: Service | null, error: any }> => {
    try {
      const response = await api.post('/service_catalog/services/', serviceData);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Update service
  update: async (id: string, serviceData: Partial<Service>): Promise<{ data: Service | null, error: any }> => {
    try {
      const response = await api.put(`/service_catalog/services/${id}/`, serviceData);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Delete service
  delete: async (id: string): Promise<{ data: any, error: any }> => {
    try {
      const response = await api.delete(`/service_catalog/services/${id}/`);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Get service categories
  getCategories: async (): Promise<{ data: ServiceCategory[] | null, error: any }> => {
    try {
      const response = await api.get('/service_catalog/categories/');
      // Backend returns { categories: [], count: number }, we need just the categories array
      const categoriesData = response.data?.categories || response.data || [];
      return { data: categoriesData, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },
};

// AI Assistant API service functions
export const aiAPI = {
  // Send chat message
  sendMessage: async (message: string, sessionId?: string): Promise<{ data: any, error: any }> => {
    try {
      const response = await api.post('/ai_assistant/chat/send/', {
        message,
        session_id: sessionId
      });
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Get chat history
  getHistory: async (sessionId?: string, limit: number = 50): Promise<{ data: any, error: any }> => {
    try {
      const params = new URLSearchParams();
      if (sessionId) params.append('session_id', sessionId);
      params.append('limit', limit.toString());
      
      const response = await api.get(`/ai_assistant/chat/history/?${params}`);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Get AI actions
  getActions: async (sessionId?: string): Promise<{ data: any, error: any }> => {
    try {
      const params = sessionId ? `?session_id=${sessionId}` : '';
      const response = await api.get(`/ai_assistant/actions/${params}`);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Confirm AI action
  confirmAction: async (actionId: string): Promise<{ data: any, error: any }> => {
    try {
      const response = await api.post(`/ai_assistant/actions/${actionId}/confirm/`);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },
}; 