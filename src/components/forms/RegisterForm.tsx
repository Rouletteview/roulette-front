import { useForm } from "react-hook-form"
import { RegisterFormData, registerSchema } from "../../schemas/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegister } from "../../hooks/useRegister";
import Input from "./Input";

import arrowIcon from "../../assets/icon/arrow-down-white.svg"
import { useState } from "react";
import { useNavigate } from "react-router";

import eyeOff from '../../assets/icon/eye-off.svg'





const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const { registerUser, loading } = useRegister();





    const onSubmit = async (data: RegisterFormData) => {
        try {
            const [name, ...lastnameArray] = data.fullName.trim().split(" ");
            const lastname = lastnameArray.join(" ") || "N/A";
            const phoneNumber = data.countryCode + data.phone;



            const response = await registerUser({
                variables: {
                    FirstName: name,
                    LastName: lastname,
                    Password: data.password,
                    Email: data.email,
                    Country: data.country,
                    BirthDate: new Date(data.birthDate).toISOString(),
                    PhoneNumber: phoneNumber,
                },
            });

            console.log("Usuario registrado exitosamente:", response.data);
            navigate("/confirmar-correo");

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.graphQLErrors?.length > 0) {
                const graphQLError = error.graphQLErrors[0];
                if (graphQLError.code === "ALREADY_EXIST") {
                    setErrorMessage('Ya existe una cuenta registrada con este usuario');
                } else {
                    setErrorMessage(`Error: ${graphQLError.message}`);
                }
            } else if (error.networkError) {
                setErrorMessage("Error de red. Por favor, verifica tu conexión.");
            } else {
                setErrorMessage("Ocurrió un error inesperado. Por favor, intenta nuevamente.");
            }
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full  px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input placeholder="Nombre completo" name="fullName" register={register("fullName")} error={errors.fullName?.message} />
                <Input placeholder="Fecha de nacimiento" name="birthDate" type="date" register={register("birthDate")} error={errors.birthDate?.message} icon={arrowIcon} />

                <div className="flex gap-2 w-full">
                    <div className=" max-w-[75px]"  >
                        <Input placeholder="+00" name="countryCode"
                            register={register("countryCode")}
                            error={errors.countryCode?.message}
                            className="text-center"
                        />
                    </div>

                    <div className="w-full">
                        <Input placeholder="Teléfono" name="phone" register={register("phone")} error={errors.phone?.message} />
                    </div>
                </div>

                <Input placeholder="País" name="country" register={register("country")} error={errors.country?.message} />
                <Input placeholder="Correo electrónico" name="email" register={register("email")} error={errors.email?.message} />

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
            </div>

            <div className="mt-5 md:mt-11 flex flex-col items-center justify-center">

                <div className="flex gap-x-2">
                    <label className="text-sm md:text-lg text-white">
                        ¿Confirmas que cumples con la mayoría de edad para el uso de nuestra plataforma?
                    </label>
                    <input
                        type="checkbox"
                        className="rounded text-white focus:ring-[#D9A425] accent-[#D9A425]"
                        onChange={(e) => setIsChecked(e.target.checked)}
                        required
                    />
                </div>

                {errorMessage && (
                    <p className="text-red-500 text-center mt-2">{errorMessage}</p>
                )}

                <button
                    type="submit"
                    disabled={!isChecked || loading}
                    className="block bg-[#D9A425] hover:bg-[#B3831D] transition-all w-full md:w-[512px] text-lg font-bold rounded-[10px] py-2 mt-5 mb-24 disabled:bg-[#B2B2B2] "
                >
                    {loading ? "Cargando..." : "Registrarse"}
                </button>
            </div>

        </form>

    )
}

export default RegisterForm
