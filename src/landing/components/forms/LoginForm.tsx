import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "./Input";
import { useState } from "react";


import eyeOff from '../../../assets/icon/eye-off.svg'
import { useNavigate } from "react-router";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { useAuthStore } from "../../../stores/authStore";
import { useLogin } from "../../../hooks/useLogin";
import { loginFormData, loginSchema } from "../../schemas/loginSchema";
import { useQuery } from "@apollo/client";
import { GET_USER_INFO } from "../../../graphql/query/getUserInfo";
import { getGraphQLErrorMessage } from "../../../utils/errorMessages";


const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors } } = useForm<loginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const { Login, loading } = useLogin();

    const { refetch: getUserInfo } = useQuery(GET_USER_INFO, { skip: true });
    console.log(getUserInfo)
    if (loading) return <LoadingOverlay />;



    const onSubmit = async (data: loginFormData) => {
        setErrorMessage("");
        try {

            const resp = await Login({
                variables: {
                    Email: data.email,
                    Password: data.password
                },
            });

            const token = resp.data.Login.Token;
            login(token);
            await new Promise((res) => setTimeout(res, 0));
            const userInfo = await getUserInfo();

            if (userInfo.data?.GetUserInfo) {
                const { Name, Email } = userInfo.data.GetUserInfo;

                localStorage.setItem('user', JSON.stringify({
                    name: Name,
                    email: Email
                }));
            }

            navigate('/home');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: unknown) {
            console.log(error)
            setErrorMessage(getGraphQLErrorMessage(error));
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
                    <div className="relative">
                        <Input placeholder="Contraseña" type={showPassword ? "text" : "password"} name="password" register={register("password")} error={errors.password?.message} />

                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <img src={eyeOff} alt="" />
                            ) : (

                                <img src={eyeOff} alt="" />
                            )}
                        </button>
                    </div>
                    <a href="/recuperar-password" className="my-4 text-right underline lg:text-xl">¿Olvidaste tu contraseña?</a>
                </div>
                {errorMessage && (
                    <p className="text-red-500 text-center mt-2">{errorMessage}</p>
                )}

                <button
                    type="submit"
                    className='cursor-pointer block bg-[#D9A425] hover:bg-[#B3831D] transition-all w-full  text-lg font-bold rounded-[10px] py-2 mt-5 mb-3 disabled:bg-[#B2B2B2] yellow-button-shadow'>
                    {loading ? "Cargando..." : "Iniciar sesión"}
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
