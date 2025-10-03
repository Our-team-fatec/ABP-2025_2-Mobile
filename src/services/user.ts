import { http } from '../client/http';
import { API_CONFIG } from '../config/api';

// Tipos baseados na API
export interface RegisterUserRequest {
  nome: string;
  email: string;
  endereco: string;
  senha: string;
}

export interface RegisterUserResponse {
  id: string;
  nome: string;
  email: string;
  endereco: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginUserRequest {
  email: string;
  senha: string;
}

export interface LoginUserResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    usuario: {
      id: string;
      nome: string;
      email: string;
      endereco: string;
      criado_em: string;
    };
  };
  message: string;
  status: "success" | "error";
}

/**
 * Registra um novo usuário
 * POST /api/users/register
 */
export async function registerUser(
  userData: RegisterUserRequest
): Promise<RegisterUserResponse> {
  try {

    const response = await http<RegisterUserResponse>(
      API_CONFIG.ENDPOINTS.USERS.REGISTER,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }
    );

    return response;
  } catch (error) {
    if (error instanceof Error) { 
      throw new Error(`Erro ao cadastrar usuário: ${error.message}`);
    }
    throw new Error('Erro desconhecido ao cadastrar usuário');
  }
}

/**
 * Faz login do usuário
 * POST /api/users/login
 */
export async function loginUser(
  loginData: LoginUserRequest
): Promise<LoginUserResponse> {
  try {
    const response = await http<LoginUserResponse>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      }
    );

    return response;
  } catch (error) {
    if (error instanceof Error) { 
      throw new Error(`Erro ao fazer login: ${error.message}`);
    }
    throw new Error('Erro desconhecido ao fazer login');
  }
}

