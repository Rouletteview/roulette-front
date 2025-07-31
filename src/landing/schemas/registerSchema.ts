import z from 'zod'

export const registerSchema = z.object({
    fullName: z
        .string()
        .min(3, "El nombre completo debe tener al menos 3 caracteres")
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios")
        .regex(/^\S+\s+\S+/, "Debe incluir al menos nombre y apellido separados por espacio")
        .transform((val) => val.trim()),

    birthDate: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Formato inválido, use dd/mm/aa"),
    phone: z
        .string()
        .regex(/^\d{6,15}$/, "Número de teléfono inválido"),
    countryCode: z
        .string()
        .trim()
        .regex(/^\+\d{1,4}(\s\d{1,15})?$/, "Prefijo telefónico inválido"),

    country: z
        .string()
        .min(1, "Debe seleccionar un país"),

    email: z
        .string()
        .email("Correo electrónico inválido"),

    password: z
        .string()
        .min(8, "Su contraseña debe incluir un mínimo de 8 caracteres"),
})


export type RegisterFormData = z.infer<typeof registerSchema>;