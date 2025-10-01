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
  const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  if (token) {
    return { ...headers, Authorization: `Bearer ${token}` };
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

  const request = new Request(url, {
    ...options,
    headers: requestHeaders,
    // Timeout baseado no ambiente
    signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
  })

  const response = await fetch(request)

  // Log da resposta em desenvolvimento
  if (DEBUG_CONFIG.LOG_API_CALLS) {
    console.log(`📥 API Response: ${response.status} ${response.statusText}`);
  }

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
}