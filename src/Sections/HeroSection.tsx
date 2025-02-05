

export const HeroSection = () => {
  // src/assets/background/close-up-roulette-wheel-1.png

  return (
    <div
      className="h-screen w-full bg-center bg-cover  flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/background/close-up-roulette-wheel-1.png')" }}
    >
      <div className="h-screen w-full" style={{ background: 'linear-gradient(to bottom, #121418F2 10%, #121418E5, #D9A42580 130%)' }}>
        <div className="mt-48 flex flex-col justify-center items-center text-center font-medium leading-[22px] md:leading-[48px] px-4">
          <div className="max-w-[881px] flex flex-col gap-y-7">
            <h1 className="text-xl md:text-[45px] mx-6 md:mx-28">Descubre las oportunidades de <span className="text-[#D9A425] font-[800]">Trading en la ruleta </span> con datos en tiempo real</h1>

            <h2 className="text-sm md:text-[28px]">Tu camino hacia el éxito en la ruleta comienza aquí. <span className="text-[#D9A425] font-[800]">¡Opera como un profesional, y olvídate de la suerte!</span></h2>
          </div>


        </div>

      </div>

    </div>


  )
}

export default HeroSection
