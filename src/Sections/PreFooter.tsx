import HeroCard from "../components/hero-section/HeroCard"
import chartsIcon from "../assets/icon/charts-icon.svg"
import seo from "../assets/icon/seo.svg"
import chartIcon2 from "../assets/icon/chart-icon2.svg"
import PriceCard from "../components/pre-footer/PriceCard"
import QASection from "./QASection"



const PreFooter = () => {
    return (
        <section
            className="w-full   bg-cover "
            style={{ backgroundImage: "url('/background/business-background.png')" }}
        >
            <div className="bg-[#121418F2]  ">



                <section className="w-full z-50 px-4  pt-20 md:pt-16">
                    <div className="relative border-l-2 md:border-t-2 md:border-l-0 border-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center pl-4 md:pt-14 mx-2 md:mx-20 gap-5">

                        <span className="absolute top-[5%] -left-4 md:left-[5%] md:top-0 md:transform md:-translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-[#D9A425] blur-[8px] rounded-full"></span>
                        <span className="absolute top-[38%] -left-4 transform  -translate-y-1/2 md:top-0 md:left-[40%] md:-translate-x-1/2 md:-translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-[#D9A425] blur-[8px] rounded-full"></span>
                        <span className="absolute bottom-[25%]  right-[96%] md:right-[25%] md:top-0 md:transform md:-translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-[#D9A425] blur-[8px] rounded-full"></span>

                        <HeroCard
                            icon={chartsIcon}
                            title="Resultados en tiempo real"
                            description="Los gráficos se actualizan en vivo, lo que te permite operar en el momento adecuado"
                        />
                        <HeroCard
                            icon={seo}
                            title="Análisis basado en patrones"
                            description="Identifica patrones recurrentes en los resultados de la ruleta y toma decisiones de trading fundamentadas"
                        />
                        <HeroCard
                            icon={chartIcon2}
                            title="Optimización de estrategias"
                            description="Utiliza las herramientas de análisis para perfeccionar tus estrategias de inversión y reducir el riesgo"
                        />

                    </div>

                </section>

                <section className="flex flex-col gap-y-2.5 md:gap-y-14 text-center mt-11 text-white">
                    <h1 className=" text-[28px] md:text-6xl font-extrabold">¿Quiénes somos?</h1>
                    <div
                        className="hero-cards text-start text-lg md:text-3xl mx-4 lg:mx-44 rounded-4xl p-5 md:px-20 md:py-8 font-normal leading-[25px] md:leading-[45px]"
                        style={{ background: "linear-gradient(180deg, #404040 0%, #000000 94.4%)" }}
                    >
                        <p className="mb-3">Somos una plataforma pionera que ofrece un sistema de <span className="text-[#D9A425]">gráficos</span> en vivo de los resultados de la <span className="text-[#D9A425]">ruleta de casino.</span></p>
                        <p> <span className="text-[#D9A425]">Nuestro objetivo</span> es brindarte herramientas de análisis técnico, diseñadas de forma intuitiva para que cualquier inversor mayor de 18 años pueda aprovecharlas y tomar decisiones en tiempo real.</p>

                    </div>
                </section>


                <section className="flex flex-col gap-y-3 md:gap-y-14 text-center mt-8 sm:mt-12 lg:mt-16 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl xl:max-w-7xl 2xl:max-w-8xl text-white">
                <section className="mt-10  md:mt-24 text-center text-white">
                        <h2 className="text-[26px] md:text-[50px] font-medium">Prueba nuestra plataforma </h2>
                        <h1 className="uppercase text-[#D9A425] text-[50px] md:text-7xl font-extrabold">Gratis</h1>
                        <h3 className="text-lg md:text-3xl">Por 7 días te <span className="text-[#D9A425]">regalamos acceso </span> para experimentar nuestros análisis en vivo</h3>
                        <div className="mt-3 w-full  px-8 place-items-center">
                            <a href="" className="block bg-[#D9A425] hover:bg-[#B3831D] transition-all w-auto md:w-[280px] text-lg font-bold rounded-[10px] p-3 mt-5">Prueba gratuita</a>
                        </div>

                    </section>
                 
                    <div className="w-full">
                        <h1 className="text-3xl xs:text-[32px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">
                            Nuestros planes
                        </h1>
                        <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mt-3 sm:mt-4 md:mt-5 lg:mt-6">
                            Tenemos diferentes opciones que se adaptan a{' '}
                            <span className="text-[#D9A425]">tus necesidades</span>
                        </h2>
                    </div>

                  

                    <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center lg:px-24 gap-8 sm:gap-10 md:gap-x-8 lg:gap-x-12 xl:gap-x-14 w-full mt-8 sm:mt-10 md:mt-12 lg:mt-16">
                        <PriceCard
                            price="1.5"
                            subscription="Diario"
                            priceSize="9xl"

                        />
                        <PriceCard
                            price="3.0"
                            subscription="Semanal"
                            priceSize="9xl"
                        />
                        <PriceCard
                            price="5.0"
                            subscription="Mensual"
                            priceSize="9xl"
                        />
                        <PriceCard
                            price="25"
                            subscription="Anual"
                            priceSize="9xl"
                        />
                    </div>
                </section>


                <QASection />
            </div>
        </section>
    )
}

export default PreFooter
