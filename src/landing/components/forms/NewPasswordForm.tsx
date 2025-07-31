import { useState } from "react";
import Input from "./Input"

import eyeOff from '../../../assets/icon/eye-off.svg'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { newPasswordFormData, newPasswordSchema } from "../../schemas/newPasswordSchema";
import { useResetPassword } from "../../../hooks/useResetPassword";
import { getGraphQLErrorMessage } from "../../../utils/errorMessages";


interface Props {
    token: string;
}

const NewPasswordForm = ({ token }: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors } } = useForm<newPasswordFormData>({
        resolver: zodResolver(newPasswordSchema),
    });




    const { ResetPassword, loading } = useResetPassword();
   

    if (loading) return <LoadingOverlay />;

    const onSubmit = async (data: newPasswordFormData) => {
        if (!token) {
            setErrorMessage("Token inválido o expirado.");
            return;
        }

        try {
            await ResetPassword({
                variables: {
                    input: {
                        NewPassword: data.NewPassword,
                        ValidationToken: token,
                    },
                },
            });
            navigate("/iniciar-sesion", { state: { message: "Contraseña cambiada con éxito", ok: true } });

        } catch (error: unknown) {
            setErrorMessage(getGraphQLErrorMessage(error));
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col ">
                <div className="flex flex-col  gap-y-7">
                    <div className="relative">
                        <Input placeholder="Contraseña" type={showPassword ? "text" : "password"} name="password"
                            register={register("NewPassword")}
                            error={errors.NewPassword?.message}
                        />

                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <img src={eyeOff} alt="" />
                            ) : (

                                <img src={eyeOff} alt="" />
                            )}
                        </button>
                    </div>

                    <div className="relative">
                        <Input placeholder="Confirmar contraseña" type={showPassword ? "text" : "password"} name="confirm-password"
                            register={register("ConfirmPassword")}
                            error={errors.ConfirmPassword?.message}
                        />

                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <img src={eyeOff} alt="" />
                            ) : (

                                <img src={eyeOff} alt="" />
                            )}
                        </button>
                    </div>


                </div>

                {errorMessage && (
                    <p className="text-red-500 text-center mt-2">{errorMessage}</p>
                )}


                <button
                    type="submit"
                    disabled={loading}
                    className='block bg-[#D9A425] hover:bg-[#B3831D] transition-all w-full  text-lg font-bold rounded-[10px] py-2 mt-5 mb-3 disabled:bg-[#B2B2B2] yellow-button-shadow cursor-pointer'>
                    {loading ? "Cargando..." : "Restablecer Contraseña"}
                </button>


            </div>


        </form>
    )
}

export default NewPasswordForm
