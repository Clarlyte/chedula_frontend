import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(async (config) => {
  try {
    // Get the current session from Supabase
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    
    return config;
  } catch (error) {
    console.error('Error getting session:', error);
    return config;
  }
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      const { error: signOutError } = await supabase.auth.signOut();
      if (!signOutError) {
        window.location.href = '/login';
      }
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
  
  // Authentication (Supabase integration)
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

// Authentication helper functions
export const authHelpers = {
  // Sign up with email and password
  signUp: async (email: string, password: string, metadata?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    return { data, error };
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Reset password
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { data, error };
  },

  // Update password
  updatePassword: async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });
    return { data, error };
  },

  // Get current session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
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

  // Listen to auth state changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
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