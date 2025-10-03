import z from "zod";

export const loginSchema = z.object({
    email: z
        .string({ required_error: "É necessário preencher o e-mail" })
        .email("Formato de e-mail inválido"),
    senha: z
        .string({ required_error: "É necessário preencher a senha" })
        .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginForm = z.infer<typeof loginSchema>;