import { useForm } from "react-hook-form";
import { loginFormData, loginSchema } from "../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../hooks/useLogin";
import Input from "./Input";


const LoginForm = () => {

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<loginFormData>({
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
            <div className="flex flex-col ">
                <div className="flex flex-col ">
                    <Input
                        placeholder="Correo eléctronico"
                        name="email"
                        type="email"
                        className="mb-7"
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
                    <a href="/recuperar-contraseña" className="my-4 text-right underline lg:text-xl">¿Olvidaste tu contraseña?</a>
                </div>


                <button
                    type="submit"
                    disabled={!isValid}
                    className='block bg-[#D9A425] hover:bg-[#B3831D] transition-all w-full  text-lg font-bold rounded-[10px] py-2 mt-5 mb-3 disabled:bg-[#B2B2B2]'>
                    Iniciar sesión
                </button>
                <div className="flex justify-center gap-x-2.5 lg:text-xl">
                    <span>¿No tienes cuenta?</span>
                    <a href="/registrarse" className="text-[#D9A425] underline">Crear cuenta</a>
                </div>

            </div>


        </form>
    )
}

export default LoginForm
