import { Environment } from '../utils/environment';

// Usa o módulo centralizado de ambiente
const BASE_URL = Environment.API_BASE_URL;
const ENV_TYPE = Environment.NODE_ENV;
const DEBUG = Environment.DEBUG_MODE;

export const API_CONFIG = {
  BASE_URL: BASE_URL,
  TIMEOUT: ENV_TYPE === 'production' ? 10000 : 5000, 
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
  ENABLED: DEBUG,
  LOG_API_CALLS: ENV_TYPE === 'development',
} as const;

// Helper para verificar ambiente
export const ENV = {
  isDevelopment: ENV_TYPE === 'development',
  isProduction: ENV_TYPE === 'production',
  isDebug: DEBUG,
} as const;