
import HeroSection from "../../sections/HeroSection"
import WelcomeModal from "../components/Modal/welcome-modal/WelcomeModal"
import AppLayout from "../layouts/AppLayout"
import ChartSection from "../sections/ChartSection"




const HomePage = () => {

  return (
    <>
      <WelcomeModal />
      <AppLayout>
        <HeroSection imageURL='/background/home-background.png'>
          <div className='text-start mx-7 lg:mx-24'>
            <div className='flex flex-col justify-between gap-y-8 h-full'>
              <div className='max-w-4xl'>
                <h1 className='text-xl lg:text-7xl font-semibold leading-7 lg:leading-20'><span className='text-[#D9A425]'>¡Analiza y gana! </span>con nuestros gráficos en tiempo real del juego de la <span className='text-[#D9A425]'>ruleta de casino</span> </h1>

              </div>

              <a href=""
                className="w-full lg:w-[390px]   bg-[#D9A425] hover:bg-[#B3831D] 
    text-center font-bold rounded-xl inset-shadow-2xs transition-all
    text-sm sm:text-base md:text-lg lg:text-xl
    px-4 sm:px-6 md:px-8 
    py-3 sm:py-4 
  
  ">
                Comienza con la prueba gratuita
              </a>


            </div>
          </div>
        </HeroSection>
        <ChartSection />
      </AppLayout>

    </>

  )
}

export default HomePage
