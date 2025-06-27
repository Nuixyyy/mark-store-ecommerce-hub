// Configuration for different environments
export const config = {
  // Check if running on GitHub Pages
  isGitHubPages: import.meta.env.VITE_GITHUB_PAGES === 'true' || 
                 window.location.hostname.includes('github.io'),
  
  // API base URL - adjust for GitHub Pages if needed
  apiBaseUrl: import.meta.env.VITE_GITHUB_PAGES === 'true' 
    ? '/mark-store/api' 
    : '/api',
  
  // Static assets base path
  basePath: import.meta.env.VITE_GITHUB_PAGES === 'true' 
    ? '/mark-store' 
    : '',
    
  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};