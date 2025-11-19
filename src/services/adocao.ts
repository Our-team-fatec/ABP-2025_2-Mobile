import { http } from "../client/http";
import { API_CONFIG } from "../config/api";
import type { Pet } from "./pet";

// Interfaces
export interface Adocao {
  id: string;
  pet_id: string;
  tutor_id: string;
  descricao: string;
  endereco: string;
  contato: string;
  criado_em: string;
  atualizado_em: string;
  removido_em: string | null;
  pet?: Pet;
}

export interface CreateAdocaoRequest {
  pet_id: string;
  descricao: string;
  endereco: string;
  contato: string;
}

export interface UpdateAdocaoRequest {
  descricao?: string;
  endereco?: string;
  contato?: string;
}

export interface AdocaoResponse {
  adocao: Adocao;
  message: string;
  status: "success" | "error";
}

export interface AdocoesListResponse {
  data: {
    adocoes: Adocao[];
    pagination?: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
  message: string;
  status: "success" | "error";
}

/**
 * Cria um novo anúncio de adoção
 * POST /adocoes
 */
export async function createAdocao(data: CreateAdocaoRequest): Promise<AdocaoResponse> {
  try {
    const response = await http<any>(`${API_CONFIG.BASE_URL}/adocoes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    
    // Se a API retornar erro no response
    if (response.status === "error") {
      throw new Error(response.message || "Não foi possível criar o anúncio de adoção");
    }
    
    return response;
  } catch (error: any) {
    console.error("[AdocaoService] Erro ao criar adoção:", error);
    
    // Se o erro tiver uma mensagem específica, usa ela
    if (error.message) {
      throw error;
    }
    
    throw new Error("Não foi possível criar o anúncio de adoção");
  }
}

/**
 * Busca os detalhes de uma adoção específica
 * GET /adocoes/:id
 */
export async function getAdocaoById(adocaoId: string): Promise<AdocaoResponse> {
  try {
    console.log(`[AdocaoService] Buscando adoção ID: ${adocaoId}`);
    const response = await http<any>(`${API_CONFIG.BASE_URL}/adocoes/${adocaoId}`);
    console.log("[AdocaoService] Resposta bruta:", JSON.stringify(response, null, 2));
    
    // A API retorna a adoção em response.data
    if (response && response.data) {
      const adocaoData = response.data;
      
      // Converte para o formato esperado pela aplicação
      const adocao: Adocao = {
        id: adocaoData.id,
        pet_id: adocaoData.pet_id,
        tutor_id: adocaoData.tutor_id,
        descricao: adocaoData.descricao,
        endereco: adocaoData.endereco,
        contato: adocaoData.contato || "",
        criado_em: adocaoData.criado_em,
        atualizado_em: adocaoData.atualizado_em,
        removido_em: adocaoData.removido_em,
        pet: adocaoData.pet ? {
          id: adocaoData.pet.id,
          tutor_id: adocaoData.pet.tutor_id,
          nome: adocaoData.pet.nome,
          especie: adocaoData.pet.especie,
          raca: adocaoData.pet.raca,
          porte: adocaoData.pet.porte,
          genero: adocaoData.pet.genero,
          cor: adocaoData.pet.cor,
          idade: adocaoData.pet.idade,
          criado_em: adocaoData.pet.criado_em,
          atualizado_em: adocaoData.pet.atualizado_em,
          removido_em: adocaoData.pet.removido_em,
          imagens: adocaoData.pet.imagens
        } : undefined
      };
      
      return {
        adocao,
        message: response.message || "success",
        status: response.status || "success"
      };
    }
    
    throw new Error("Formato de resposta inválido");
  } catch (error) {
    console.error("[AdocaoService] Erro ao buscar detalhes da adoção:", error);
    throw new Error("Não foi possível carregar os detalhes da adoção");
  }
}

/**
 * Lista as adoções do usuário logado
 * GET /adocoes/my-adocoes
 */
export async function getMyAdocoes(): Promise<AdocoesListResponse> {
  try {
    const response = await http<AdocoesListResponse>(`${API_CONFIG.BASE_URL}/adocoes/my-adocoes`);
    return response;
  } catch (error) {
    console.error("[AdocaoService] Erro ao listar minhas adoções:", error);
    throw new Error("Não foi possível carregar suas adoções");
  }
}

/**
 * Atualiza uma adoção existente
 * PUT /adocoes/:id
 */
export async function updateAdocao(adocaoId: string, data: UpdateAdocaoRequest): Promise<AdocaoResponse> {
  try {
    const response = await http<any>(`${API_CONFIG.BASE_URL}/adocoes/${adocaoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    
    // Se a API retornar erro no response
    if (response.status === "error") {
      throw new Error(response.message || "Não foi possível atualizar a adoção");
    }
    
    return response;
  } catch (error: any) {
    console.error("[AdocaoService] Erro ao atualizar adoção:", error);
    
    // Se o erro tiver uma mensagem específica, usa ela
    if (error.message) {
      throw error;
    }
    
    throw new Error("Não foi possível atualizar a adoção");
  }
}

/**
 * Exclui uma adoção
 * DELETE /adocoes/:id
 */
export async function deleteAdocao(adocaoId: string): Promise<void> {
  try {
    await http(`${API_CONFIG.BASE_URL}/adocoes/${adocaoId}`, {
      method: "DELETE"
    });
  } catch (error) {
    console.error("[AdocaoService] Erro ao excluir adoção:", error);
    throw new Error("Não foi possível excluir a adoção");
  }
}
