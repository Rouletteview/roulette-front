import { useForm } from "react-hook-form"
import { RegisterFormData, registerSchema } from "../../schemas/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegister } from "../../hooks/useRegister";


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
                  PhoneNumber: data.phone.toString(),
                },
              });
            console.log("Usuario registrado:", result);
        } catch (error) {
            console.error("Error al registrar:", error);
        }
    };





    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-sm space-y-3">
                <input
                    type="text"
                    placeholder="Nombre completo"
                    {...register('fullName', { required: 'El nombre es requerido' })}
                    className="py-3 px-4 block w-full rounded-lg text-sm border border-black focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            </div>

            <div className="max-w-sm space-y-3">
                <input
                    type="date"
                    placeholder="Fecha de nacimiento"
                    {...register('birthDate', { required: 'Fecha de nacimiento es requerida' })}
                    className="py-3 px-4 block w-full rounded-lg text-sm border border-black focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                />
                {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate?.message}</p>}
            </div>

            <div className="max-w-sm space-y-3">
                <input
                    type="text"
                    placeholder="Teléfono"
                    {...register('phone', { required: 'El teléfono es requerido' })}
                    className="py-3 px-4 block w-full rounded-lg text-sm border border-black focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            <div className="max-w-sm space-y-3">
                <input
                    type="text"
                    placeholder="País"
                    {...register('country', { required: 'El país es requerido' })}
                    className="py-3 px-4 block w-full rounded-lg text-sm border border-black focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                />
                {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
            </div>

            <div className="max-w-sm space-y-3">
                <input
                    type="text"
                    placeholder="Correo electrónico"
                    {...register('email', { required: 'El correo es requerido' })}
                    className="py-3 px-4 block w-full rounded-lg text-sm border border-black focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="max-w-sm space-y-3">
                <input
                    type="password"
                    placeholder="Contraseña"
                    {...register('password', { required: 'La contraseña es requerida' })}
                    className="py-3 px-4 block w-full rounded-lg text-sm border border-black focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Registrarse
            </button>
        </form>
    )
}

export default RegisterForm
