import { http } from "../client/http";
import { API_CONFIG } from "../config/api";
import EventSourcePolyfill from 'react-native-sse';

// URL dedicada para o chatbot - sempre usa Fly.dev
const CHATBOT_BASE_URL = 'http://192.168.1.42:3000/api';

export interface HistoryMessage {
  role: string;
  content: string;
}

type ApiSuccessResponse<T = null> = {
  status: "success";
  message: string;
  data: T;
};

export type ChatResponse = ApiSuccessResponse<{
  response: string;
  conversationId: string;
}>;

export type HistoryResponse = ApiSuccessResponse<{
  history: HistoryMessage[];
  totalMessages: number;
}>;

export type HealthCheckResponse = ApiSuccessResponse<{
  status: string;
  activeConversations: number;
  geminiConfigured: boolean;
}>;

export type ConversationsResponse = ApiSuccessResponse<{
  conversations: string[];
  total: number;
}>;

export type ApiMessageResponse = ApiSuccessResponse<null>;

// Tipo para eventos do stream
export type StreamEvent = 
  | { type: 'start'; conversationId: string }
  | { type: 'chunk'; text: string }
  | { type: 'done' }
  | { type: 'error'; error: string };

// Callback para processar eventos do stream
export type StreamCallback = (event: StreamEvent) => void;

/**
 * Envia uma mensagem para o chatbot com streaming SSE real
 * Usa react-native-sse para suportar Server-Sent Events no React Native
 */
export async function sendChatMessageStream(
  message: string,
  conversationId: string | undefined,
  onEvent: StreamCallback
): Promise<void> {
  return new Promise((resolve, reject) => {
    const url = `${CHATBOT_BASE_URL}${API_CONFIG.ENDPOINTS.CHATBOT.CHAT}/stream`;
    console.log('🤖 Chatbot SSE URL:', url);

    // Cria conexão SSE com POST
    const eventSource = new EventSourcePolyfill(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message, 
        conversationId 
      }),
      pollingInterval: 0, // Desabilita polling, usa streaming puro
    });

    let hasError = false;

    // Handler para mensagens SSE
    eventSource.addEventListener('message', (event: any) => {
      try {
        const data = JSON.parse(event.data);
        const streamEvent: StreamEvent = data;
        
        onEvent(streamEvent);
        
        // Fecha conexão quando receber done ou error
        if (streamEvent.type === 'done') {
          eventSource.close();
          resolve();
        } else if (streamEvent.type === 'error') {
          hasError = true;
          eventSource.close();
          reject(new Error(streamEvent.error));
        }
      } catch (e) {
        console.error('❌ Erro ao parsear evento SSE:', e);
      }
    });

    // Handler para erros de conexão
    eventSource.addEventListener('error', (event: any) => {
      console.error('❌ Erro na conexão SSE:', event);
      eventSource.close();
      
      if (!hasError) {
        const errorMessage = 'Erro na conexão com o servidor';
        onEvent({ type: 'error', error: errorMessage });
        reject(new Error(errorMessage));
      }
    });

    // Handler para abertura da conexão
    eventSource.addEventListener('open', () => {
      console.log('✅ Conexão SSE estabelecida');
    });
  });
}

/**
 * Envia uma mensagem para o chatbot
 */
export async function sendChatMessage(
  message: string,
  conversationId?: string
): Promise<ChatResponse> {
  // Timeout maior para o chatbot (60 segundos)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  try {
    const response = await http<ChatResponse>(API_CONFIG.ENDPOINTS.CHATBOT.CHAT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        conversationId,
      }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Limpa o histórico de uma conversa
 */
export async function clearConversation(conversationId: string): Promise<ApiMessageResponse> {
  // Usa fetch direto com URL do Fly.dev para garantir que vai para o servidor correto
  const response = await fetch(`${CHATBOT_BASE_URL}${API_CONFIG.ENDPOINTS.CHATBOT.CONVERSATION.CLEAR(conversationId)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * Obtém o histórico de uma conversa
 */
export async function getConversationHistory(conversationId: string): Promise<HistoryResponse> {
  return http<HistoryResponse>(
    API_CONFIG.ENDPOINTS.CHATBOT.CONVERSATION.HISTORY(conversationId),
    {
      method: "GET",
    }
  );
}

/**
 * Finaliza uma conversa
 */
export async function endConversation(conversationId: string): Promise<ApiMessageResponse> {
  return http<ApiMessageResponse>(
    API_CONFIG.ENDPOINTS.CHATBOT.CONVERSATION.END(conversationId),
    {
      method: "DELETE",
    }
  );
}

/**
 * Lista todas as conversas ativas
 */
export async function listConversations(): Promise<ConversationsResponse> {
  return http<ConversationsResponse>(API_CONFIG.ENDPOINTS.CHATBOT.CONVERSATIONS, {
    method: "GET",
  });
}

/**
 * Verifica o status do chatbot
 */
export async function checkChatbotHealth(): Promise<HealthCheckResponse> {
  return http<HealthCheckResponse>(API_CONFIG.ENDPOINTS.CHATBOT.HEALTH, {
    method: "GET",
  });
}
