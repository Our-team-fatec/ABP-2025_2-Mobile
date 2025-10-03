import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_LOCAL_STORAGE_KEY } from "../constants/local-storage";
import { API_CONFIG, DEBUG_CONFIG } from "../config/api";

async function getBody<T>(c: Response | Request): Promise<T> {
  const contentType = c.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    return c.json()
  }

  return c.text() as Promise<T>
}

async function getHeaders(headers?: HeadersInit): Promise<HeadersInit> {
  try {
    const token = await AsyncStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
    if (token) {
      return { ...headers, Authorization: `Bearer ${token}` };
    }
  } catch (error) {
    if (DEBUG_CONFIG.ENABLED) {
      console.error('❌ Erro ao recuperar token:', error);
    }
  }

  return headers ?? {}
}

function getUrl(contextUrl: string): string {
  // Se a URL já for completa (com http/https), usa ela diretamente
  if (contextUrl.startsWith('http://') || contextUrl.startsWith('https://')) {
    return contextUrl;
  }
  
  // Remove '/api' do contextUrl se já estiver incluído na base URL
  const cleanPath = contextUrl.startsWith('/api') 
    ? contextUrl.substring(4) 
    : contextUrl;
  
  // Usa a URL base das configurações de ambiente
  return `${API_CONFIG.BASE_URL}${cleanPath}`;
}

export async function http<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const requestHeaders = await getHeaders(options.headers)
  const url = getUrl(path)

  // Log da requisição em desenvolvimento
  if (DEBUG_CONFIG.LOG_API_CALLS) {
    console.log(`🌐 API Call: ${options.method || 'GET'} ${url}`);
    if (options.body) {
      console.log('📤 Request Body:', options.body);
    }
  }

  // Implementa timeout manual para React Native
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, API_CONFIG.TIMEOUT)

  try {
    const request = new Request(url, {
      ...options,
      headers: requestHeaders,
      signal: controller.signal,
    })

    const response = await fetch(request)
    clearTimeout(timeoutId)

    // Log da resposta em desenvolvimento
    if (DEBUG_CONFIG.LOG_API_CALLS) {
      console.log(`📥 API Response: ${response.status} ${response.statusText}`);
    }

    console.log(response)

    if (!response.ok) {
      const errorBody = await response.text()
      const errorData = errorBody
        ? JSON.parse(errorBody)
        : { message: 'Erro desconhecido' }
      
      if (DEBUG_CONFIG.ENABLED) {
        console.error('❌ API Error:', errorData);
      }
      
      throw new Error(errorData.message || `Erro HTTP ${response.status}`)
    }

    const data = await getBody<T>(response)
    
    if (DEBUG_CONFIG.LOG_API_CALLS) {
      console.log('✅ API Success:', data);
    }
    
    return data
  } catch (error) {
    clearTimeout(timeoutId)
    
    // Verifica se o erro foi causado por timeout
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Tempo limite da requisição esgotado')
    }
    
    // Re-lança outros erros
    throw error
  }
}