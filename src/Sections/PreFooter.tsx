import HeroCard from "../components/hero-section/HeroCard"
import chartsIcon from "../assets/icon/charts-icon.svg"
import seo from "../assets/icon/seo.svg"
import chartIcon2 from "../assets/icon/chart-icon2.svg"



const PreFooter = () => {
    return (
        <section
            className="w-full h-full bg-center bg-cover"
            style={{ backgroundImage: "url('/background/business-background.png')" }}
        >
            <div className="bg-[#121418F2] ">

           

                <section className="w-full   z-50 px-4  py-20 md:py-6">
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

            </div>
        </section>
    )
}

export default PreFooter
