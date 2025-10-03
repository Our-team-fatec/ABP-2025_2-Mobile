import z from "zod";

export const cadastroSchema = z.object({
    nome: z
        .string({ required_error: "É necessário preencher o nome" })
        .min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z
        .string({ required_error: "É necessário preencher o e-mail" })
        .email("Formato de e-mail inválido"),
    endereco: z
        .string({ required_error: "É necessário preencher o endereço" })
        .min(5, "O endereço deve ter pelo menos 5 caracteres"),
    senha: z
        .string({ required_error: "É necessário preencher a senha" })
        .min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmarSenha: z
        .string({ required_error: "É necessário confirmar a senha" })
}).refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"]
});

export type CadastroForm = z.infer<typeof cadastroSchema>;
