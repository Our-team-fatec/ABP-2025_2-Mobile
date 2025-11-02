import { http } from "../client/http";

import { API_CONFIG } from "../config/api";

// Types
export type PetSize = "PEQUENO" | "MEDIO" | "GRANDE";
export type PetGender = "MACHO" | "FEMEA";
export type PetSpecies = "CACHORRO" | "GATO";
export type PetStatusType = "PENDENTE" | "EM_DIA" | "ALERTA";

// Interfaces
export interface PetImage {
  id: string;
  url: string;
  titulo: string;
  descricao: string | null;
  pet_id: string;
  criado_em: string;
  atualizado_em: string;
  removido_em: string | null;
}

export interface PetTutor {
  id: string;
  nome: string;
  endereco: string;
}

export interface PetAdocao {
  id: string;
  descricao: string;
  endereco: string;
  criado_em: string;
}

export interface Pet {
  id: string;
  tutor_id: string;
  nome: string;
  especie: PetSpecies;
  raca: string;
  porte: PetSize;
  genero: PetGender;
  cor: string;
  criado_em: string;
  atualizado_em: string;
  removido_em: string | null;
  tutor?: PetTutor;
  imagens?: PetImage[];
  adocao?: PetAdocao;
  status?: Array<{
    label: string;
    type?: PetStatusType;
  }>;
}

export interface CreatePetRequest {
  nome: string;
  especie: PetSpecies;
  raca: string;
  porte: PetSize;
  genero: PetGender;
  cor: string;
}

export interface CreatePetWithImagesRequest extends CreatePetRequest {
  images: File[];
}

export interface UpdatePetRequest extends Partial<CreatePetRequest> {}

export interface PetResponse {
  pet: Pet;
  message: string;
  status: "success" | "error";
}

export interface PetsListResponse {
  data: {
    pets: Pet[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
  message: string;
  status: "success" | "error";
}

export interface PetImageStatusResponse {
  status: "processing" | "completed" | "failed";
  total: number;
  processed: number;
  failed: number;
}

interface ListPetsOptions {
  page?: number;
  limit?: number;
  species?: PetSpecies;
  onlyMine?: boolean;
}

// Functions

/**
 * Lista os pets com base nos filtros fornecidos
 * GET /pets
 */
export async function listPets(options?: ListPetsOptions): Promise<PetsListResponse> {
  try {
    const queryParams = new URLSearchParams();
    
    if (options?.page) queryParams.append("page", options.page.toString());
    if (options?.limit) queryParams.append("limit", options.limit.toString());
    if (options?.species) queryParams.append("species", options.species);
    if (options?.onlyMine) queryParams.append("onlyMine", "true");
    
    const url = `${API_CONFIG.ENDPOINTS.PETS.BASE}?${queryParams.toString()}`;
    const response = await http<PetsListResponse>(url);
    return response;
  } catch (error) {
    console.error("[PetService] Erro ao listar pets:", error);
    throw new Error("Não foi possível carregar a lista de pets");
  }
}

/**
 * Lista todos os pets disponíveis para adoção
 * GET /pets/public
 */
export async function getPublicPets(options?: Omit<ListPetsOptions, 'onlyMine'>): Promise<PetsListResponse> {
  try {
    const queryParams = new URLSearchParams();
    
    if (options?.page) queryParams.append("page", options.page.toString());
    if (options?.limit) queryParams.append("limit", options.limit.toString());
    if (options?.species) queryParams.append("species", options.species);
    
    const url = `${API_CONFIG.ENDPOINTS.PETS.BASE}/public?${queryParams.toString()}`;
    const response = await http<PetsListResponse>(url);
    return response;
  } catch (error) {
    console.error("[PetService] Erro ao listar pets públicos:", error);
    throw new Error("Não foi possível carregar a lista de pets para adoção");
  }
}

/**
 * Busca os detalhes de um pet específico
 * GET /pets/:id
 */
export async function getPetById(petId: string): Promise<PetResponse> {
  try {
    const response = await http<PetResponse>(`${API_CONFIG.ENDPOINTS.PETS.BASE}/${petId}`);
    return response;
  } catch (error) {
    console.error("[PetService] Erro ao buscar detalhes do pet:", error);
    throw new Error("Não foi possível carregar os detalhes do pet");
  }
}

/**
 * Cria um novo pet
 * POST /pets
 */
export async function createPet(data: CreatePetRequest): Promise<PetResponse> {
  try {
    const response = await http<PetResponse>(API_CONFIG.ENDPOINTS.PETS.BASE, {
      method: "POST",
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    console.error("[PetService] Erro ao criar pet:", error);
    throw new Error("Não foi possível criar o pet");
  }
}

/**
 * Cria um novo pet com imagens
 * POST /pets/with-images
 */
export async function createPetWithImages(data: CreatePetWithImagesRequest): Promise<PetResponse> {
  try {
    const formData = new FormData();
    
    // Adiciona dados do pet
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "images") {
        formData.append(key, value);
      }
    });
    
    // Adiciona imagens
    data.images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await http<PetResponse>(`${API_CONFIG.ENDPOINTS.PETS.BASE}/with-images`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData
    });
    
    return response;
  } catch (error) {
    console.error("[PetService] Erro ao criar pet com imagens:", error);
    throw new Error("Não foi possível criar o pet com as imagens");
  }
}

/**
 * Atualiza um pet existente
 * PATCH /pets/:id
 */
export async function updatePet(petId: string, data: UpdatePetRequest): Promise<PetResponse> {
  try {
    const response = await http<PetResponse>(`${API_CONFIG.ENDPOINTS.PETS.BASE}/${petId}`, {
      method: "PATCH",
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    console.error("[PetService] Erro ao atualizar pet:", error);
    throw new Error("Não foi possível atualizar o pet");
  }
}

/**
 * Exclui um pet
 * DELETE /pets/:id
 */
export async function deletePet(petId: string): Promise<void> {
  try {
    await http(`${API_CONFIG.ENDPOINTS.PETS.BASE}/${petId}`, {
      method: "DELETE"
    });
  } catch (error) {
    console.error("[PetService] Erro ao excluir pet:", error);
    throw new Error("Não foi possível excluir o pet");
  }
}

/**
 * Adiciona novas imagens a um pet
 * POST /pets/:id/images
 */
export async function addPetImages(petId: string, images: File[]): Promise<PetResponse> {
  try {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await http<PetResponse>(`${API_CONFIG.ENDPOINTS.PETS.BASE}/${petId}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData
    });
    
    return response;
  } catch (error) {
    console.error("[PetService] Erro ao adicionar imagens ao pet:", error);
    throw new Error("Não foi possível adicionar as imagens ao pet");
  }
}

/**
 * Remove uma imagem específica de um pet
 * DELETE /pets/:id/images/:imageId
 */
export async function removePetImage(petId: string, imageId: string): Promise<void> {
  try {
    await http(`${API_CONFIG.ENDPOINTS.PETS.BASE}/${petId}/images/${imageId}`, {
      method: "DELETE"
    });
  } catch (error) {
    console.error("[PetService] Erro ao remover imagem do pet:", error);
    throw new Error("Não foi possível remover a imagem do pet");
  }
}

/**
 * Verifica o status do processamento das imagens de um pet
 * GET /pets/:id/images/status
 */
export async function checkPetImagesStatus(petId: string): Promise<PetImageStatusResponse> {
  try {
    const response = await http<PetImageStatusResponse>(
      `${API_CONFIG.ENDPOINTS.PETS.BASE}/${petId}/images/status`
    );
    return response;
  } catch (error) {
    console.error("[PetService] Erro ao verificar status das imagens:", error);
    throw new Error("Não foi possível verificar o status das imagens");
  }
}