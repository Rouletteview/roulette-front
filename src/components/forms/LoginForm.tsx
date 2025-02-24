import { useForm } from "react-hook-form";
import { loginFormData, loginSchema } from "../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../hooks/useLogin";
import Input from "./Input";


const LoginForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<loginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const { Login } = useLogin();


    const onSubmit = async (data: loginFormData) => {
        try {
            
            const result = await Login({
                variables: {
                    Email: data.email,
                    Password: data.password
                },
            });
            console.log("Usuario logeado:", result);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    };


    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                placeholder="Correo eléctronico"
                name="email"
                type="email"
                register={register("email")}
                error={errors.email?.message}
            />
            <Input
                placeholder="Contraseña"
                name="password"
                type="password"
                register={register("password")}
                error={errors.password?.message}
            />

            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Iniciar sesión
            </button>

        </form>
    )
}

export default LoginForm
