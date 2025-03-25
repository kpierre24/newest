export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  appName: import.meta.env.VITE_APP_NAME,
  appVersion: import.meta.env.VITE_APP_VERSION,
  azure: {
    storageUrl: import.meta.env.VITE_AZURE_STORAGE_URL,
    containerName: import.meta.env.VITE_AZURE_CONTAINER_NAME
  }
};

// Validate required environment variables
const requiredVars = [
  'VITE_API_BASE_URL',
  'VITE_AZURE_STORAGE_URL',
  'VITE_AZURE_CONTAINER_NAME'
];

requiredVars.forEach(varName => {
  if (!import.meta.env[varName]) {
    console.error(`Missing required environment variable: ${varName}`);
  }
}); 