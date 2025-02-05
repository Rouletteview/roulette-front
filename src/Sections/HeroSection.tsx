import HeroCard from "../components/hero-section/HeroCard"
import barChart from "../assets/icon/bar-chart.svg"
import chart from "../assets/icon/chart.svg"
import desktopComputer from "../assets/icon/desktop-computer.svg"

export const HeroSection = () => {
  // src/assets/background/close-up-roulette-wheel-1.png

  return (
    <div
      className="max-h-[975px] md:h-screen w-full bg-center bg-cover  flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/background/close-up-roulette-wheel-1.png')" }}
    >
      <div className="hero-background w-full max-h-[975px] md:h-full" >
        <div className="mt-28 md:mt-48 flex flex-col justify-center items-center text-center font-medium leading-[22px] md:leading-[48px] px-4">
          <div className="max-w-[881px] flex flex-col gap-y-7">
            <h1 className="text-xl md:text-[45px] mx-6 md:mx-28">Descubre las oportunidades de <span className="text-[#D9A425] font-[800]">Trading en la ruleta </span> con datos en tiempo real</h1>

            <h2 className="text-sm md:text-[28px]">Tu camino hacia el éxito en la ruleta comienza aquí. <span className="text-[#D9A425] font-[800]">¡Opera como un profesional, y olvídate de la suerte!</span></h2>
          </div>
          <section className="w-full grid grid-cols-1 md:grid-cols-3 justify-items-center gap-y-5  mt-3.5 md:mt-24">
            <HeroCard
              icon={barChart}
              title="Gráficos en tiempo real"
              description="Visualiza de forma instantánea los resultados de la ruleta en vivo para hacer un seguimiento preciso"
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

      </div>

    </div>


  )
}

export default HeroSection
