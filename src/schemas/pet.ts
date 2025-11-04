import { z } from "zod";

export const petSchema = z.object({
  nome: z.string()
    .min(1, "Nome do pet é obrigatório")
    .max(50, "Nome muito longo"),
  especie: z.string()
    .min(1, "Espécie é obrigatória"),
  raca: z.string()
    .min(1, "Raça é obrigatória"),
  genero: z.enum(["MACHO", "FEMEA"], {
    required_error: "Sexo é obrigatório",
    invalid_type_error: "Sexo inválido"
  }),
  idade: z.string()
    .min(1, "Idade é obrigatória"),
  cor: z.string()
    .min(1, "Cor é obrigatória"),
  porte: z.enum(["PEQUENO", "MEDIO", "GRANDE"], {
    required_error: "Porte é obrigatório",
    invalid_type_error: "Porte inválido"
  }),
  images: z.array(z.any()).optional(),
}).required();

export type PetForm = z.infer<typeof petSchema>;

export const initialPetData: PetForm = {
  nome: "",
  especie: "CACHORRO",
  raca: "",
  genero: "MACHO",
  idade: "",
  cor: "",
  porte: "MEDIO",
  images: [],
};