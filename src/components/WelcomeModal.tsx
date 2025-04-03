
import { useState } from 'react';
import closeModal from '../assets/icon/close-modal.svg'
import pricing from '../assets/images/pricing.png'
import tour from '../assets/videos/tour.mp4'
import informative from '../assets/images/informative.png'



const WelcomeModal = () => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);



  if (!isModalOpen) return null;



  return (
    <div
  className="fixed w-screen h-screen flex items-center justify-center  z-50 bg-[#000000CC] py-14"
  onClick={() => setIsModalOpen(false)}
>
  <div
    className="relative h-full lg:max-h-[500px] w-full max-w-[1000px] bg-[#121418F2] rounded-xl p-6 lg:py-14 overflow-y-auto scrollbar-hidden my-16 mx-5"
    onClick={(e) => e.stopPropagation()} 
  >
  
    <div className="absolute top-4 right-4">
      <button className="cursor-pointer" onClick={() => setIsModalOpen(false)}>
        <img src={closeModal} alt="Cerrar" />
      </button>
    </div>

   
   <div className="flex flex-col items-center text-center mt-10 lg:mt-0 gap-y-14">
    <div>
    <h1 className="text-white text-xl lg:text-3xl font-extrabold">
        ¡Bienvenido a Roulette View!
      </h1>
      <p className="text-white text-base lg:text-xl font-extralight">
        Te damos la bienvenida a nuestra plataforma, aprende todo lo que necesitas para ganar en el juego de la ruleta de casino.
      </p>
    </div>
    
      
     
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 gap-y-10 ">
        <div className="flex flex-col gap-y-4 w-full lg:w-[194px] px-14 md:px-0">
          <img src={pricing} alt="" className="h-[188px] rounded-lg" />
          <a href="" className="bg-[#D9A425] hover:bg-[#B3831D] transition-all text-white text-xs font-bold py-2 rounded-lg">
            Nuestros planes
          </a>
        </div>
        <div className="flex flex-col gap-y-4 w-full lg:w-[194px] px-14 md:px-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            onContextMenu={(e) => e.preventDefault()}
            className="h-[188px] rounded-lg object-cover"
          >
            <source src={tour} type="video/mp4" />
            Tu navegador no soporta la reproducción de videos.
          </video>
          <a href="" className="bg-[#D9A425] hover:bg-[#B3831D] transition-all text-white text-xs font-bold py-2 rounded-lg">
            Tour de la plataforma
          </a>
        </div>
        <div className="flex flex-col gap-y-4 w-full lg:w-[194px] px-14 md:px-0">
          <img src={informative} alt="" className="h-[188px] rounded-lg" />
          <a href="https://www.listoapp.cl" target='_blank' className="bg-[#D9A425] hover:bg-[#B3831D] transition-all text-white text-xs font-bold py-2 rounded-lg">
          Sección informativa
          </a>
        </div>
      </div>
   </div>

    </div>
  </div>



  )
}

export default WelcomeModal
