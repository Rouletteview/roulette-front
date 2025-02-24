import { useForm } from "react-hook-form"
import { RegisterFormData, registerSchema } from "../../schemas/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegister } from "../../hooks/useRegister";
import Input from "./Input";


const RegisterForm = () => {

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
        } catch (error) {
            console.error("Error al registrar:", error);
        }
    };





    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
            <Input
                placeholder="Nombre completo"
                name="fullName"
                register={register("fullName")}
                error={errors.fullName?.message}
            />
            <Input
                placeholder="Fecha de nacimiento"
                name="birthdate"
                type="date"
                register={register("birthDate")}
                error={errors.birthDate?.message}
            />
            <Input
                placeholder="Teléfono"
                name="phone"
                register={register("phone")}
                error={errors.phone?.message}
            />

            <Input
                placeholder="País"
                name="country"
                register={register("country")}
                error={errors.country?.message}
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
          

            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Registrarse
            </button>
        </form>
    )
}

export default RegisterForm
