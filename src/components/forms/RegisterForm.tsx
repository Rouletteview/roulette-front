
const RegisterForm = () => {
    return (
        <form action="">
            <div className="max-w-sm space-y-3">
                <input type="text" placeholder="Nombre completo" className="py-3 px-4 block w-full rounded-lg text-sm border border-black focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
            </div>
            <div className="max-w-sm space-y-3">
                <input type="date" placeholder="Fecha de nacimiento" className="py-3 px-4 block w-full rounded-lg text-sm border border-black focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
            </div>
            <div className="max-w-sm space-y-3">
                <input type="text" placeholder="Teléfono" className="py-3 px-4 block w-full rounded-lg text-sm border border-black focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
            </div>
            <div className="max-w-sm space-y-3">
                <input type="text" placeholder="País" className="py-3 px-4 block w-full rounded-lg text-sm border border-black focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
            </div>
            <div className="max-w-sm space-y-3">
                <input type="text" placeholder="Correo electrónico" className="py-3 px-4 block w-full rounded-lg text-sm border border-black focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
            </div>
            <div className="max-w-sm space-y-3">
                <input type="password" placeholder="Contraseña" className="py-3 px-4 block w-full rounded-lg text-sm border border-black focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
            </div>
        </form>
    )
}

export default RegisterForm
