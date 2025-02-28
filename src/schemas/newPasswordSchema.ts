import z from 'zod'

export const newPasswordSchema = z.object({
    password: z.string(),
    confirmPassword: z.string(),
}).refine(
    (values) => {
        return values.password === values.confirmPassword;
    },
    {
        message: "¡Las contraseñas deben coincidir!",
    }
);


export type newPasswordFormData = z.infer<typeof newPasswordSchema>;