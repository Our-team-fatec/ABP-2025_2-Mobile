export type PetGender = "male" | "female";

export interface NewPetForm {
  name: string;
  species: string;
  breed: string;
  gender: PetGender | "";
  birthDate: string; // ISO string ou "dd/MM/yyyy" conforme você usar
  color: string;
  isNeutered: boolean;
  notes: string;
}

export const initialNewPetData: NewPetForm = {
  name: "",
  species: "",
  breed: "",
  gender: "",
  birthDate: "",
  color: "",
  isNeutered: false,
  notes: "",
};