/**
 * CSIR EOI 8119/06/01/2026 - TypeScript Type Definitions
 * 
 * Demonstrates proficiency in:
 * - TypeScript
 * - Type safety
 * - Interface design
 */

// Population data record from DataUSA API
export interface PopulationRecord {
  idNation: string;
  nation: string;
  idYear: number;
  year: number;
  population: number;
  slugNation: string;
  formattedPopulation?: string;
  populationInMillions?: string;
}

// Raw response from DataUSA API
export interface DataUSAApiResponse {
  data: Array<{
    'ID Nation': string;
    Nation: string;
    'ID Year': number;
    Year: number;
    Population: number;
    'Slug Nation': string;
  }>;
  source: Array<{
    measures: string[];
    annotations: {
      source_name: string;
      source_description: string;
      dataset_name: string;
      dataset_link: string;
      table_id: string;
      topic: string;
      subtopic: string;
    };
    name: string;
    substitutions: never[];
  }>;
}

// Backend API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// Pagination metadata
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  recordsPerPage: number;
}

// Paginated response
export interface PaginatedResponse<T> {
  records: T[];
  pagination: PaginationMeta;
}

// User interface for authentication
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: 'user' | 'admin' | 'moderator';
  lastLogin?: string;
  createdAt?: string;
}

// Authentication response
export interface AuthResponse {
  user: User;
  token: string;
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Registration data
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Tree node structure for tree view
export interface TreeNode {
  id: string;
  name: string;
  type: 'root' | 'nation' | 'year';
  value?: number;
  formattedValue?: string;
  growth?: number;
  children?: TreeNode[];
}

// Population statistics
export interface PopulationStats {
  totalRecords: number;
  minPopulation: number;
  maxPopulation: number;
  avgPopulation: number;
  minYear: number;
  maxYear: number;
}

// API Error
export interface ApiError {
  success: false;
  message: string;
  status?: string;
  errors?: Record<string, string>[];
}

// Chart data point
export interface ChartDataPoint {
  year: number;
  population: number;
  populationMillions: number;
  nation: string;
  growth: number;
}

// View mode types
export type ViewMode = 'grid' | 'tree' | 'chart';

// Sort order
export type SortOrder = 'asc' | 'desc';

// Sort field for population data
export type PopulationSortField = 'year' | 'population' | 'nation';
