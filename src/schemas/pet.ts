import { z } from "zod";

export const petSchema = z.object({
  nome: z.string()
    .min(1, "Nome do pet é obrigatório")
    .max(50, "Nome muito longo"),
  especie: z.string()
    .min(1, "Espécie é obrigatória")
    .refine(value => ["CACHORRO", "GATO"].includes(value), "Espécie inválida"),
  raca: z.string()
    .min(1, "Raça é obrigatória"),
  genero: z.enum(["MACHO", "FEMEA"], {
    required_error: "Sexo é obrigatório",
    invalid_type_error: "Sexo inválido"
  }),
  dataNascimento: z.string()
    .min(1, "Idade é obrigatória"),
  cor: z.string()
    .min(1, "Cor é obrigatória"),
  castrado: z.boolean()
    .default(false),
  observacoes: z.string()
    .optional(),
  porte: z.enum(["PEQUENO", "MEDIO", "GRANDE"], {
    required_error: "Porte é obrigatório",
    invalid_type_error: "Porte inválido"
  })
}).required();

export type PetForm = z.infer<typeof petSchema>;

export const initialPetData: PetForm = {
  nome: "",
  especie: "CACHORRO",
  raca: "",
  genero: "MACHO",
  dataNascimento: "",
  cor: "",
  castrado: false,
  observacoes: "",
  porte: "MEDIO",
};