import { QueryClient } from "@tanstack/react-query";
import { config } from "./config";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Default fetcher function for React Query
const defaultFetcher = async (url: string) => {
  // For GitHub Pages, we need to handle API calls differently
  if (config.isGitHubPages) {
    // In production on GitHub Pages, return mock data or handle differently
    console.warn('GitHub Pages detected - API calls may not work as expected');
  }
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// API request helper for mutations
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Set the default query function
queryClient.setQueryDefaults([], {
  queryFn: ({ queryKey }) => defaultFetcher(queryKey[0] as string),
});