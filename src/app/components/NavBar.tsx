import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import clsx from 'clsx';
import menuIcon from '../../assets/icon/menu-hamburger.svg';
import closeModalIcon from '../../assets/icon/close-modal.svg';
import homeIcon from '../../assets/icon/homepage-icon.svg';
// import chartIcon from '../../assets/icon/chart-icon.svg';
import subIcon from '../../assets/icon/sub-icon.svg'
import historyIcon from '../../assets/icon/history-icon.svg'
// import notiIcon from '../../assets/icon/notification-icon.svg'
import { useAuthStore } from '../../stores/authStore';


const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const isSubscriptionPage = location.pathname === '/subscription';

    const navLinks = [
        { name: "Inicio", path: "/home", icon: homeIcon },
        // { name: "Probar Gráficos", path: "/graficos", icon: chartIcon },
        { name: "Subscripción", path: "/subscription", icon: subIcon },
        { name: "Historial", path: "/historial", icon: historyIcon },
        // { name: "Notificaciones", path: "/notificaciones", icon: notiIcon },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
        localStorage.removeItem('hasShownModal');
    };

    return (
        <nav className="px-6 py-4">
            <div className="flex justify-between items-center">
                {/* menu desktop */}
                <ul className={`hidden lg:flex items-center space-x-6 ${isSubscriptionPage ? 'text-black' : 'text-white'}`}>
                    {navLinks.map((item) => (
                        <li key={item.path}>
                            <a
                                href={item.path}
                                className={clsx(
                                    "transition",
                                    location.pathname === item.path ? "text-[#D9A425] font-semibold" : "hover:text-gray-300"
                                )}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                    <li className="ml-8">
                        <button
                            onClick={handleLogout}
                            className="bg-[#D9A425] hover:bg-[#B3831D] text-white rounded-lg px-4 py-3 transition-all text-base cursor-pointer yellow-button-shadow"
                        >
                            Cerrar sesión
                        </button>
                    </li>
                </ul>

                {/* menu mobile */}
                <button className="lg:hidden" aria-label="Abrir menú" onClick={() => setIsOpen(true)}>
                    <img src={menuIcon} alt="Icono de menú" className="size-8" />
                </button>


                <div
                    className={clsx(
                        "fixed inset-0 bg-[#000000CC] z-40 transition-opacity duration-300",
                        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    )}
                    onClick={() => setIsOpen(false)}
                />


                <div
                    className={clsx(
                        "fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl p-4 shadow-lg transition-transform duration-300 lg:hidden mx-4",
                        isOpen ? "translate-y-0" : "translate-y-full"
                    )}
                >
                    <div className="absolute top-4 right-4">
                        <button onClick={() => setIsOpen(false)} className="cursor-pointer">
                            <img src={closeModalIcon} alt="Cerrar" />
                        </button>
                    </div>

                    <ul className="flex flex-col mt-8 gap-y-2">
                        {navLinks.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li
                                    key={item.path}
                                    className={clsx(
                                        "flex items-center gap-x-3 px-4 py-3 rounded-[10px] cursor-pointer",
                                        isActive ? "bg-[#D9A42580] text-white" : "bg-white text-gray-800"
                                    )}
                                    onClick={() => {
                                        navigate(item.path);
                                        setIsOpen(false);
                                    }}
                                >
                                    {item.icon && <img src={item.icon} alt="" className="w-6 h-6" />}
                                    <span className={clsx("text-xl font-medium", isActive && "text-white")}>
                                        {item.name}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>

                    <button
                        onClick={handleLogout}
                        className="bg-[#D9A425] hover:bg-[#B3831D] text-white rounded-lg px-4 py-3 transition-all text-base cursor-pointer w-full mt-4 yellow-button-shadow"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
