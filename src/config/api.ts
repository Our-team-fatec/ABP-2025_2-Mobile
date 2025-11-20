import { Environment } from '../utils/environment';

// Usa o módulo centralizado de ambiente
const BASE_URL = Environment.API_BASE_URL;
const ENV_TYPE = Environment.NODE_ENV;
const DEBUG = Environment.DEBUG_MODE;

export const API_CONFIG = {
  BASE_URL: BASE_URL,
  TIMEOUT: ENV_TYPE === 'production' ? 60000 : 30000, // Aumentado para chatbot (30s dev, 60s prod) 
  ENDPOINTS: {
    USERS: {
      REGISTER: '/users/register',
      PROFILE: '/users/profile',
    },
    AUTH: {
      LOGIN: '/auth/login',
      REFRESH_TOKEN: '/auth/refresh-token'
    },
    PETS: {
      BASE: '/pets',
      PUBLIC: '/pets/public',
      IMAGES_STATUS: (id: string) => `/pets/${id}/images/status`,
      IMAGES: (petId: string, imageId: string) => `/pets/${petId}/images/${imageId}`,
      BY_ID: (id: string) => `/pets/${id}`,
    },
    HEALTH: {
      BASE: '/saude',
      PET: (petId: string) => `/saude/${petId}`
    },
    VACCINES: {
      BASE: '/vacinas',
      BY_ID: (id: string) => `/vacinas/${id}`,
      PET: {
        BASE: '/pets-vacinas',
        LIST: (petId: string) => `/pets-vacinas/${petId}/vacinas`,
        COMPLETE: (petId: string) => `/pets-vacinas/${petId}/complete`,
        UPDATE: (id: string) => `/pets-vacinas/vacinas/${id}`,
        DELETE: (id: string) => `/pets-vacinas/vacinas/${id}`
      }
    },
    CHATBOT: {
      CHAT: '/chatbot/chat',
      HEALTH: '/chatbot/health',
      CONVERSATIONS: '/chatbot/conversations',
      CONVERSATION: {
        HISTORY: (conversationId: string) => `/chatbot/conversation/${conversationId}/history`,
        CLEAR: (conversationId: string) => `/chatbot/conversation/${conversationId}/clear`,
        END: (conversationId: string) => `/chatbot/conversation/${conversationId}`
      }
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