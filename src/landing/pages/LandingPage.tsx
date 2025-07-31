import Footer from "../../components/Footer"
import Header from "../../components/Header"
import HeroCard from "../../components/hero-section/HeroCard"
import PreFooter from "../sections/PreFooter"
import SubHeroSection from "../sections/SubHeroSection"


// icons
import barChart from "../../assets/icon/bar-chart.svg"
import chart from "../../assets/icon/chart.svg"
import desktopComputer from "../../assets/icon/desktop-computer.svg"
import HeroSection from "../../sections/HeroSection"

const LandingPage = () => {
    const user = localStorage.getItem('user')
    const userData = JSON.parse(user || '{}')

    return (
        <>
            <Header>
                <a href="https://info.roulettesview.com/about/" target="_blank" className="text-white text-sm md:text-lg text-center">Conocenos</a>
                <div className="flex flex-col md:flex-row gap-2 md:gap-3.5">
                    {userData.name ? (
                        <div className="flex items-center gap-4">
                            <div className="text-white text-sm md:text-lg">
                                Hola, <span className="text-[#D9A425]">{userData.name}</span>
                            </div>
                            <a
                                href="/home"
                                className="bg-[#D9A425] hover:bg-[#B3831D] transition-all px-4 py-2 rounded-xl text-center text-sm md:text-lg yellow-button-shadow"
                            >
                                Ir al Home
                            </a>
                        </div>
                    ) : (
                        <>
                            <a href="/iniciar-sesion" className="border border-[#D9A425] hover:border-[#B3831D] transition-all px-4 py-2 rounded-xl text-center text-sm md:text-lg">Iniciar sesión</a>
                            <a href="/registrarse" className="bg-[#D9A425] hover:bg-[#B3831D] transition-all px-4 py-2 rounded-xl text-center text-sm md:text-lg yellow-button-shadow">Registrarse</a>
                        </>
                    )}
                </div>
            </Header>

            <HeroSection imageURL="/background/close-up-roulette-wheel-1.webp">
                <div className="flex flex-col justify-center items-center text-center font-medium leading-[22px] md:leading-[48px] px-4 flex-grow">
                    <div className="w-full max-w-[881px] flex flex-col gap-y-7">
                        <h1 className="text-xl md:text-[45px] mx-6 md:mx-28">
                            Descubre las oportunidades de
                            <span className="text-[#D9A425] font-[800]"> Trading en la ruleta </span>
                            con datos en tiempo real
                        </h1>

                        <h2 className="text-sm md:text-[28px]">
                            Tu camino hacia el éxito en la ruleta comienza aquí.
                            <span className="text-[#D9A425] font-[800]"> ¡Opera como un profesional, y olvídate de la suerte!</span>
                        </h2>
                    </div>

                    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 z-50 px-4 py-20 md:py-28">
                        <HeroCard
                            icon={barChart}
                            title="Gráficos en tiempo real"
                            description="Visualiza de forma instantánea los resultados de la ruleta en vivo para hacer un seguimiento preciso."
                        />
                        <HeroCard
                            icon={chart}
                            title="Análisis técnico avanzado"
                            description="Aplica técnicas de trading utilizando datos históricos y patrones del juego para identificar momentos clave de entrada y salida."
                        />
                        <HeroCard
                            icon={desktopComputer}
                            title="Estrategias de trading"
                            description="La plataforma está diseñada para desarrollar estrategias basadas en datos, minimizando el riesgo y maximizando la rentabilidad."
                        />
                    </section>
                </div>
            </HeroSection>
            <SubHeroSection />
            <PreFooter />
            <Footer />
        </>
    )
}

export default LandingPage
