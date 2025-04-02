import { useNavigate } from 'react-router';
import menuIcon from '../assets/icon/menu-hamburger.svg'


import Header from "../components/Header"
import HeroSection from '../Sections/HeroSection'
import { useAuthStore } from '../stores/authStore';

const HomePage = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <>
      <Header>
        <nav className="px-6 py-4">
          <div className="flex justify-between items-center">

            {/* Menú en Desktop */}
            <ul className="hidden lg:flex items-center space-x-6 text-white">
              <li><a href="" className="hover:text-gray-300 transition">Inicio</a></li>
              <li><a href="" className="hover:text-gray-300 transition">Probar Gráficos</a></li>
              <li><a href="" className="hover:text-gray-300 transition">Subscripción</a></li>
              <li><a href="" className="hover:text-gray-300 transition">Historial</a></li>
              <li><a href="" className="hover:text-gray-300 transition">Notificaciones</a></li>
              <li className="ml-8">
                <button onClick={handleLogout} className="bg-[#D9A425] hover:bg-[#B3831D] rounded-lg px-4 py-3 transition-all text-base cursor-pointer">
                  Cerrar sesión
                </button>
              </li>
            </ul>

            {/* Botón Menú (Móviles) */}
            <button className="lg:hidden">
              <img src={menuIcon} alt="" className='size-8' />
            </button>
          </div>
        </nav>
      </Header>
      <HeroSection imageURL='/background/home-background.png'>
        <div className='text-start mx-7 lg:mx-24'>
          <div className='flex flex-col justify-between gap-y-8 h-full'>
            <div className='max-w-4xl'>
              <h1 className='text-xl lg:text-7xl font-semibold leading-7 lg:leading-20'><span className='text-[#D9A425]'>¡Analiza y gana! </span>con nuestros gráficos en tiempo real del juego de la <span className='text-[#D9A425]'>ruleta de casino</span> </h1>

            </div>
            <div>
              <a href=""
                className="
    bg-[#D9A425] hover:bg-[#B3831D] 
    text-center font-bold rounded-xl inset-shadow-2xs transition-all
    text-sm sm:text-base md:text-lg lg:text-xl
    px-4 sm:px-6 md:px-8 
    py-3 sm:py-4 
    w-full sm:w-auto
  ">
                Comienza con la prueba gratuita
              </a>

            </div>
          </div>
        </div>
      </HeroSection>
    </>

  )
}

export default HomePage
