import Logo from "../assets/logo/logo.svg";

export const Header = () => {
    return (
        <header className="py-4 px-6 fixed top-0 left-0 w-full">
            <nav className="">
                <div className="flex justify-between">
                    <a href="/">
                        <img src={Logo} alt="Logo de Roulette View" className="" />
                    </a>
                    <div className="flex gap-x-4 text-white">
                        <a href="/iniciar-sesion" className="border border-[#D9A425] px-4 py-2 rounded-2xl"><span>Iniciar sesión</span></a>
                        <a href="/registrar" className="bg-[#D9A425] px-4 py-2 rounded-2xl"><span>Registrarse</span></a>
                    </div>
                </div>

            </nav>
        </header>
    )
}

export default Header
