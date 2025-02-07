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
                        className="hero-cards text-lg md:text-3xl mx-4 md:mx-44 rounded-4xl p-5 md:px-16 md:py-4 font-normal leading-[25px] md:leading-[45px]"
                        style={{ background: "linear-gradient(180deg, #404040 0%, #000000 94.4%)" }}
                    >
                        <p className="mb-3">Somos una plataforma pionera que ofrece un sistema de <span className="text-[#D9A425]">gráficos</span> en vivo de los resultados de la <span className="text-[#D9A425]">ruleta de casino.</span></p>
                        <p> <span className="text-[#D9A425]">Nuestro objetivo</span> es brindarte herramientas de análisis técnico, diseñadas de forma intuitiva para que cualquier inversor mayor de 18 años pueda aprovecharlas y tomar decisiones en tiempo real.</p>

                    </div>
                </section>

            </div>
        </section>
    )
}

export default PreFooter
