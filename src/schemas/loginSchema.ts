import z from 'zod'

export const loginSchema = z.object({
    email: z
        .string()
        .email("Correo electrónico inválido"),

    password: z
        .string()
        .min(8, "Su contraseña debe incluir un mínimo de 8 caracteres"),
})


export type loginFormData = z.infer<typeof loginSchema>;