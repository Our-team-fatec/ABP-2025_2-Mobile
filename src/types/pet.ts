export type PetStatusType = "vacinacao" | "consulta" | "aviso" | "pendente";

export interface PetStatus {
  label: string;
  type?: PetStatusType;
}

export interface PetData {
  name: string;
  species: string;
  breed: string;
  age: string;
  weight?: string;
  gender: string;
  color?: string;
  status: PetStatus[];
  image?: {
    id: string;
    url: string;
    titulo: string;
    descricao: string | null;
    pet_id: string;
    criado_em: string;
    atualizado_em: string;
    removido_em: string | null;
  };
  images?: Array<{
    id: string;
    url: string;
    titulo: string;
    descricao: string | null;
    pet_id: string;
    criado_em: string;
    atualizado_em: string;
    removido_em: string | null;
  }>;
}