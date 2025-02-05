import Logo from "../assets/logo/logo2.svg";

export const Header = () => {
    return (
        <header className="py-4 px-5 md:px-[98px] absolute top-0 left-0 w-full z-50">
        <nav className="flex justify-between items-center mt-6">
            <a href="/" className="w-[55px] h-auto md:w-[153px]">
                <img src={Logo} alt="Logo de Roulette View" className="object-cover"/>
            </a>

            <div className="flex items-center gap-x-3.5 md:gap-x-7 text-white text-[12px] md:text-lg font-semibold">
                <a href="/iniciar-sesion" className="border border-[#D9A425] px-4 py-2 rounded-xl text-center">Iniciar sesión</a>
                <a href="/registrar" className="bg-[#D9A425] px-4 py-2 rounded-xl text-center">Registrarse</a>
            </div>
        </nav>
    </header>
    )
}

export default Header
