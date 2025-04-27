import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import Input from "./Input";

import arrowIcon from "../../../assets/icon/arrow-down-white.svg"
import { useState } from "react";
import { useNavigate } from "react-router";

import eyeOff from '../../../assets/icon/eye-off.svg'


import LoadingOverlay from "../../../components/LoadingOverlay";
import { useRegister } from "../../../hooks/useRegister";
import { useCountries } from "../../../hooks/useCountries";
import { RegisterFormData, registerSchema } from "../../schemas/registerSchema";





const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const { registerUser, loading } = useRegister();
    const { data } = useCountries();
       



    if (loading) return <LoadingOverlay />;




    const onSubmit = async (data: RegisterFormData) => {

        try {

            const [day, month, year] = data.birthDate.split("-");
            const birthDate = new Date(`${year}-${month}-${day}`);

            if (isNaN(birthDate.getTime())) throw new Error("Fecha inválida");

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
                    BirthDate: birthDate.toISOString(),
                    PhoneNumber: phoneNumber,
                },
            });

            console.log("Usuario registrado exitosamente:", response.data);
            navigate("/confirmar-correo", { state: { message: "Email confirmado con éxito", ok: true } });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.graphQLErrors?.length > 0) {
                const graphQLError = error.graphQLErrors[0];
                if (graphQLError.code === "ALREADY_EXIST") {
                    setErrorMessage("Ya existe una cuenta registrada con este usuario");
                } else {
                    setErrorMessage(`Error: ${graphQLError.message}`);
                }
            } else if (error.networkError) {
                setErrorMessage("Error de red. Por favor, verifica tu conexión.");
            } else {
                console.log(error);
                setErrorMessage("Ocurrió un error inesperado. Por favor, intenta nuevamente.");
            }
        }
    };

    const prefixOptions = data?.GetCountriesWithPhonePrefixes.map((item: any) => ({
        value: `+${item.PhonePrefix}`,
        label: `+${item.PhonePrefix}`,
      }));

      const sortedOptions = prefixOptions?.sort((a, b) =>
        parseInt(a.value.replace("+", "")) - parseInt(b.value.replace("+", ""))
      );
   



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full  px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input placeholder="Nombre completo" name="fullName" register={register("fullName")} error={errors.fullName?.message} />
                <Input placeholder="Fecha de nacimiento" name="birthDate" type="date" register={register("birthDate")} error={errors.birthDate?.message} icon={arrowIcon} />

                <div className="flex gap-2 w-full">
                    <div className="w-[115px]">
                        <Input
                            name="countryCode"
                            placeholder="+00"
                            register={register("countryCode")}
                            error={errors.countryCode?.message}
                            icon={arrowIcon}
                            options={sortedOptions}
                        />
                    </div>

                    <div className="flex-1">
                        <Input
                            placeholder="Teléfono"
                            name="phone"
                            register={register("phone")}
                            error={errors.phone?.message}
                        />
                    </div>
                </div>



                <Input
                    name="country"
                    placeholder="País"
                    register={register("country")}
                    icon={arrowIcon}
                    error={errors.country?.message}
                    options={
                        data?.GetCountriesWithPhonePrefixes.map((item: any) => ({
                            value: item.Country,
                            label: item.Country,
                        }))
                    }
                />
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
