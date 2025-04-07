import menuIcon from '../assets/icon/menu-hamburger.svg'
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router';

const NavBar = () => {

    const navLinks = [
        { name: "Inicio", path: "/" },
        { name: "Probar Gráficos", path: "/graficos" },
        { name: "Subscripción", path: "/subscripcion" },
        { name: "Historial", path: "/historial" },
        { name: "Notificaciones", path: "/notificaciones" },
    ]

    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        localStorage.removeItem('hasShownModal')
    }

    return (
        <nav className="px-6 py-4">
            <div className="flex justify-between items-center">
                {/* Menú en Desktop */}
                <ul className="hidden lg:flex items-center space-x-6 text-white">
                    {navLinks.map((item) => (
                        <li key={item.path}>
                            <a href="#" className="hover:text-gray-300 transition">
                                {item.name}
                            </a>
                        </li>
                    ))}
                    <li className="ml-8">
                        <button
                            onClick={handleLogout}
                            className="bg-[#D9A425] hover:bg-[#B3831D] rounded-lg px-4 py-3 transition-all text-base cursor-pointer"
                        >
                            Cerrar sesión
                        </button>
                    </li>
                </ul>

                {/* Botón Menú (Móviles) */}
                <button className="lg:hidden" aria-label="Abrir menú">
                    <img src={menuIcon} alt="Icono de menú" className="size-8" />
                </button>
            </div>
        </nav>
    )
}

export default NavBar
