import { useForm } from "react-hook-form"
import { RegisterFormData, registerSchema } from "../../schemas/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegister } from "../../hooks/useRegister";
import Input from "./Input";

import arrowIcon from "../../assets/icon/arrow-down-white.svg"
import { useState } from "react";
import { useNavigate } from "react-router";


const RegisterForm = () => {
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const { registerUser } = useRegister();


    const onSubmit = async (data: RegisterFormData) => {
        try {

            const [name, ...lastnameArray] = data.fullName.trim().split(" ");
            const lastname = lastnameArray.join(" ") || "N/A";


            const result = await registerUser({
                variables: {
                    FirstName: name,
                    LastName: lastname,
                    Password: data.password,
                    Email: data.email,
                    Country: data.country,
                    BirthDate: new Date(data.birthDate).toISOString(),
                    PhoneNumber: data.phone,
                },
            });
            console.log("Usuario registrado:", result);
            navigate("/confirmacion-correo");


        } catch (error) {
            console.error("Error al registrar:", error);
        }
    };




    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full  px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    placeholder="Nombre completo"
                    name="fullName"
                    register={register("fullName")}
                    error={errors.fullName?.message}
                />
                <Input
                    placeholder="Fecha de nacimiento"
                    name="birthDate"
                    type="date"
                    register={register("birthDate")}
                    error={errors.birthDate?.message}
                />


                <div className="flex gap-2 w-full">
                    <div className=" max-w-[95px]"  >
                        <Input
                            placeholder="+00"
                            name="countryCode"
                            // register={register("countryCode")}
                            // error={errors.countryCode?.message}

                            icon={arrowIcon}
                        />
                    </div>
                    <div className="w-full">
                        <Input
                            placeholder="Teléfono"
                            name="phone"
                            register={register("phone")}
                            error={errors.phone?.message}

                        />
                    </div>


                </div>


                <Input
                    placeholder="País"
                    name="country"
                    register={register("country")}
                    error={errors.country?.message}
                    icon={arrowIcon}
                />
                <Input
                    placeholder="Correo electrónico"
                    name="email"
                    register={register("email")}
                    error={errors.email?.message}
                />
                <Input
                    placeholder="Contraseña"
                    type="password"
                    name="password"
                    register={register("password")}
                    error={errors.password?.message}
                />
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



                <button
                    type="submit"
                    disabled={!isChecked}
                    className="block bg-[#D9A425] hover:bg-[#B3831D] transition-all w-full md:w-[512px] text-lg font-bold rounded-[10px] py-2 mt-5 mb-24 disabled:bg-[#B2B2B2] "
                >
                    Registrarse
                </button>
            </div>

        </form>

    )
}

export default RegisterForm
