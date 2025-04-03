
import { ReactNode } from "react";
import Logo from "../assets/logo/logo2.svg";
import { Link } from "react-router";


type Props = {
    children?: ReactNode
}


export const Header = ({children}: Props) => {
    return (
        <header className="py-4 px-5 md:px-[98px] absolute top-0 left-0 w-full z-40">
        <nav className="flex justify-between items-center mt-6">
            <Link to="/" className="w-[55px] h-auto md:w-[153px]">
                <img src={Logo} alt="Logo de Roulette View" className="object-cover"/>
            </Link>

            <div className="flex items-center gap-x-3.5 md:gap-x-7 text-white text-[12px] md:text-lg font-semibold">
                {children}
            </div>
        </nav>
    </header>
    )
}

export default Header
