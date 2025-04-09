import Header from "../components/Header"
import HeroSection from '../Sections/HeroSection'
import NavBar from '../components/NavBar';
import ChartSection from "../Sections/ChartSection";
import WelcomeModal from "../components/Modal/welcome-modal/WelcomeModal";
import arrow from "../assets/icon/arrow-right-yellow.svg"
import Chart from "../components/Chart";
import { generateMockCandlestickData } from "../utils/mock/mockData";





const HomePage = () => {

  const mockData = generateMockCandlestickData(50);

  return (
    <>
      <WelcomeModal />

      <Header>
        <NavBar />
      </Header>


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


      <ChartSection>
        {/* alerta movil */}
        <div className="flex justify-end w-full">
          <div className="bg-[#121418F2] border-2 border-black px-6 py-2 rounded-2xl lg:hidden block mb-2">
            <h1 className="text-white text-[12px] font-medium">Tu periodo de prueba termina el: <span className="text-[#D9A425]">23/03/25</span></h1>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-x-6 items-baseline">
          <h1 className="text-xl lg:text-5xl text-white font-medium ">Sistema de <span className="font-bold">Gráficos</span> en vivo</h1>
          <a href="" className="text-sm lg:text-[18px] text-[#D9A425] underline font-medium">ver video tutorial de como operar en el gráfico</a>
        </div>
        <section className="my-10">
          <div className="flex flex-col gap-9 lg:gap-2">
            <div className="lg:mx-8">
              <h1 className="text-base lg:text-xl text-white font-medium inline-block border-x-1 border-white px-2"><span className="text-[#D9A425] ">Gráfico de velas</span>, zona del grafico <span className="text-[#D9A425] ">columna</span>, operando en el mercado de <span className="text-[#D9A425]">Micasino.com</span></h1>
            </div>
            <div className="flex justify-between">

              <div className="flex flex-wrap gap-1 text-start items-center">
                <div className="bg-[#121418F2] w-[150px] border-2 border-black py-1.5 px-2 rounded-lg whitespace-nowrap">
                  <span className="text-white text-base">Gráfico de velas</span>
                </div>
                <div className="bg-[#121418F2] w-[150px] border-2 border-black py-1.5 px-2 rounded-lg whitespace-nowrap">
                  <span className="text-white text-base">Columnas</span>
                </div>
                <div className="bg-[#121418F2] w-[150px] border-2 border-black py-1.5 px-2 rounded-lg whitespace-nowrap">
                  <span className="text-white text-base">Micasino.com</span>
                </div>
                <div className="ml-4">
                  <button className="flex gap-x-2 text-[#D9A425] text-base lg:text-xl font-semibold cursor-pointer">
                    Probar gráficos
                    <img src={arrow} alt="" />
                  </button>
                </div>
              </div>
              {/* alerta desktop */}
              <div className="bg-[#121418F2] border-2 border-black px-6 py-2 rounded-2xl hidden lg:block">
                <h1 className="text-white text-lg font-medium">Tu periodo de prueba termina el: <span className="text-[#D9A425]">23/03/25</span></h1>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#0d1b2a] p-28" >
          <Chart type="candlestick" data={mockData} width={800} height={620} />

        </section>
      </ChartSection>
    </>

  )
}

export default HomePage
