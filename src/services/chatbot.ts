import { http } from "../client/http";
import { API_CONFIG } from "../config/api";

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
 * Envia uma mensagem para o chatbot com streaming SSE
 */
export async function sendChatMessageStream(
  message: string,
  conversationId: string | undefined,
  onEvent: StreamCallback
): Promise<void> {
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHATBOT.CHAT}/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, conversationId }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) {
    throw new Error('Stream não disponível');
  }

  try {
    let buffer = '';
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      
      // Mantém a última linha incompleta no buffer
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();
          if (data) {
            try {
              const event: StreamEvent = JSON.parse(data);
              onEvent(event);
              
              if (event.type === 'done' || event.type === 'error') {
                return;
              }
            } catch (e) {
              console.error('Erro ao parsear evento SSE:', e);
            }
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
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
  return http<ApiMessageResponse>(
    API_CONFIG.ENDPOINTS.CHATBOT.CONVERSATION.CLEAR(conversationId),
    {
      method: "POST",
    }
  );
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
