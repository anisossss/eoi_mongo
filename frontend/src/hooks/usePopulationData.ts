/**
 * CSIR EOI 8119/06/01/2026 - Population Data Hook
 * 
 * Custom React hook for fetching population data from DataUSA API
 * 
 * Demonstrates proficiency in:
 * - React hooks
 * - React Query
 * - TypeScript
 * - Data fetching patterns
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { populationApi } from '@/services/api';
import { PopulationRecord, PopulationStats, TreeNode } from '@/types';
import toast from 'react-hot-toast';

/**
 * Hook for fetching population data via backend API (proxies DataUSA API)
 * This fulfills the task requirement to call the REST API endpoint
 */
export function usePopulationData() {
  return useQuery<PopulationRecord[], Error>({
    queryKey: ['populationData'],
    queryFn: async () => {
      // Fetch from backend which proxies the DataUSA API
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/population/direct`);
      if (!response.ok) {
        throw new Error('Failed to fetch population data');
      }
      const result = await response.json();
      if (result.success && result.data?.records) {
        return result.data.records;
      }
      throw new Error('Invalid response format');
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook for fetching population data from backend (with caching)
 */
export function useBackendPopulationData(params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}) {
  return useQuery({
    queryKey: ['backendPopulationData', params],
    queryFn: () => populationApi.getAll(params),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for fetching and storing data from DataUSA API via backend
 */
export function useFetchAndStorePopulation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: populationApi.fetchAndStore,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['backendPopulationData'] });
      toast.success(`Successfully fetched ${data.data.count} records`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to fetch population data');
    },
  });
}

/**
 * Hook for getting population data in tree structure
 */
export function usePopulationTreeData() {
  return useQuery<{ data: TreeNode }, Error>({
    queryKey: ['populationTreeData'],
    queryFn: async () => {
      const response = await populationApi.getTreeData();
      return response;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for getting population statistics
 */
export function usePopulationStats() {
  return useQuery<{ summary: PopulationStats }, Error>({
    queryKey: ['populationStats'],
    queryFn: async () => {
      const response = await populationApi.getStats();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for getting population data by year range
 */
export function usePopulationByYearRange(startYear: number, endYear: number) {
  return useQuery({
    queryKey: ['populationByYearRange', startYear, endYear],
    queryFn: () => populationApi.getByYearRange(startYear, endYear),
    staleTime: 5 * 60 * 1000,
    enabled: !!startYear && !!endYear,
  });
}

export default usePopulationData;
