import { 
  NODE_ENV, 
  API_BASE_URL, 
  DEBUG_MODE, 
  APP_NAME, 
  APP_VERSION 
} from '@env';

/**
 * Utilitário para acessar variáveis de ambiente de forma segura
 * Centraliza todas as variáveis de ambiente em um único lugar
 */
export const Environment = {
  // Informações do app
  APP_NAME: APP_NAME || 'Da Vinci Pets',
  APP_VERSION: APP_VERSION || '1.0.0',
  
  // Configurações de ambiente
  NODE_ENV: NODE_ENV || 'development',
  IS_DEV: NODE_ENV === 'development',
  IS_PROD: NODE_ENV === 'production',
  
  // API - Com fallback para a URL de produção
  API_BASE_URL: API_BASE_URL || 'https://davincipets-api.fly.dev/api',
  
  // Debug
  DEBUG_MODE: DEBUG_MODE === 'true',
  
  // Métodos utilitários
  isDevelopment: () => NODE_ENV === 'development',
  isProduction: () => NODE_ENV === 'production',
  
  // Log apenas em desenvolvimento
  log: (...args: any[]) => {
    if (NODE_ENV === 'development' && DEBUG_MODE === 'true') {
      console.log('[ENV]', ...args);
    }
  },
  
  // Informações do ambiente atual
  getInfo: () => ({
    environment: NODE_ENV,
    apiUrl: API_BASE_URL || 'https://davincipets-api.fly.dev/api',
    debug: DEBUG_MODE === 'true',
    version: APP_VERSION,
  })
} as const;

// Log das configurações no desenvolvimento
if (Environment.IS_DEV) {
  console.log('🔧 Environment Configuration:', Environment.getInfo());
}