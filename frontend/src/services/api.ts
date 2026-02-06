/**
 * CSIR EOI 8119/06/01/2026 - API Service
 * 
 * Service for making API calls to the backend and external APIs
 * 
 * Demonstrates proficiency in:
 * - REST API integration
 * - Error handling
 * - TypeScript
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  PopulationRecord,
  DataUSAApiResponse,
  ApiResponse,
  PaginatedResponse,
  PopulationStats,
  TreeNode,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from '@/types';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const DATAUSA_API_URL = process.env.NEXT_PUBLIC_DATAUSA_API || 'https://datausa.io/api/data';

// Create axios instance for backend API
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Transform DataUSA API response to our format
 */
const transformDataUSAResponse = (data: DataUSAApiResponse['data']): PopulationRecord[] => {
  return data.map((item) => ({
    idNation: item['ID Nation'],
    nation: item.Nation,
    idYear: item['ID Year'],
    year: item.Year,
    population: item.Population,
    slugNation: item['Slug Nation'],
    formattedPopulation: item.Population.toLocaleString('en-US'),
    populationInMillions: (item.Population / 1_000_000).toFixed(2) + 'M',
  }));
};

/**
 * Population Data API
 */
export const populationApi = {
  /**
   * Fetch population data directly from DataUSA API
   * This is the endpoint specified in the task requirements
   */
  fetchFromDataUSA: async (): Promise<PopulationRecord[]> => {
    const response = await axios.get<DataUSAApiResponse>(
      `${DATAUSA_API_URL}?drilldowns=Nation&measures=Population`
    );
    return transformDataUSAResponse(response.data.data);
  },

  /**
   * Get population data from backend (cached)
   */
  getAll: async (params?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }): Promise<ApiResponse<PaginatedResponse<PopulationRecord>>> => {
    const response = await apiClient.get('/population', { params });
    return response.data;
  },

  /**
   * Fetch and store data from DataUSA API via backend
   */
  fetchAndStore: async (): Promise<ApiResponse<{ count: number; records: PopulationRecord[] }>> => {
    const response = await apiClient.get('/population/fetch');
    return response.data;
  },

  /**
   * Get population data in tree structure
   */
  getTreeData: async (): Promise<ApiResponse<TreeNode>> => {
    const response = await apiClient.get('/population/tree');
    return response.data;
  },

  /**
   * Get population statistics
   */
  getStats: async (): Promise<ApiResponse<{ summary: PopulationStats }>> => {
    const response = await apiClient.get('/population/stats');
    return response.data;
  },

  /**
   * Get population data by year range
   */
  getByYearRange: async (
    startYear: number,
    endYear: number
  ): Promise<ApiResponse<{ records: PopulationRecord[] }>> => {
    const response = await apiClient.get('/population/range', {
      params: { startYear, endYear },
    });
    return response.data;
  },
};

/**
 * Authentication API
 */
export const authApi = {
  /**
   * Register a new user
   */
  register: async (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  /**
   * Get current user profile
   */
  getMe: async (): Promise<ApiResponse<{ user: User }>> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>): Promise<ApiResponse<{ user: User }>> => {
    const response = await apiClient.put('/auth/update-profile', data);
    return response.data;
  },

  /**
   * Change password
   */
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse<{ token: string }>> => {
    const response = await apiClient.put('/auth/change-password', data);
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<ApiResponse<null>> => {
    const response = await apiClient.post('/auth/logout');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return response.data;
  },
};

/**
 * Health check API
 */
export const healthApi = {
  check: async (): Promise<ApiResponse<{ timestamp: string; environment: string; version: string }>> => {
    const response = await apiClient.get('/health');
    return response.data;
  },
};

export default {
  population: populationApi,
  auth: authApi,
  health: healthApi,
};
