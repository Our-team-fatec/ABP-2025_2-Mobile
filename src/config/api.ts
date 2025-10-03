import { API_BASE_URL, NODE_ENV, DEBUG_MODE } from '@env';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: NODE_ENV === 'production' ? 10000 : 5000, 
  ENDPOINTS: {
    USERS: {
      REGISTER: '/users/register',
      PROFILE: '/users/profile',
    },
    AUTH:{
      LOGIN: '/auth/login',
    }
  }
} as const;

// Configurações de debug
export const DEBUG_CONFIG = {
  ENABLED: DEBUG_MODE === 'true',
  LOG_API_CALLS: NODE_ENV === 'development',
} as const;

// Helper para verificar ambiente
export const ENV = {
  isDevelopment: NODE_ENV === 'development',
  isProduction: NODE_ENV === 'production',
  isDebug: DEBUG_MODE === 'true',
} as const;