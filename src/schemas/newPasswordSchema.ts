import z from 'zod'

export const newPasswordSchema = z.object({
    NewPassword: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres"),


    ConfirmPassword: z.string(),
}).refine((data) => data.NewPassword === data.ConfirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["ConfirmPassword"], 
});


export type newPasswordFormData = z.infer<typeof newPasswordSchema>;