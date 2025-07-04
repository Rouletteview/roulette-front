import pricing from '../../../../assets/images/pricing.png'
import tour from '../../../../assets/videos/charts.mp4'
import informative from '../../../../assets/images/informative.png'

type Props = {
    onShowPricing: () => void;
};

const WelcomeContent = ({ onShowPricing }: Props) => {
    return (
        <div className="flex flex-col items-center text-center mt-10  gap-y-14">
            <div>
                <h1 className="text-white text-xl lg:text-3xl font-extrabold mb-2.5">¡Bienvenido a Roulette View!</h1>
                <p className="text-white text-base lg:text-xl font-extralight">
                    Te damos la bienvenida a nuestra plataforma, aprende todo lo que necesitas para ganar en el juego de la ruleta de casino.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 gap-y-10 ">
                <div className="flex flex-col gap-y-4 w-full lg:w-[194px] px-14 md:px-0">
                    <img src={pricing} alt="" className="h-[188px] rounded-lg" />
                    <button onClick={onShowPricing} className="bg-[#D9A425] hover:bg-[#B3831D] transition-all text-white text-xs font-bold py-2 rounded-lg cursor-pointer">
                        Nuestros planes
                    </button>
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
                    <a href="https://www.youtube.com/watch?v=hKoYWpw89lc" target='_blank' className="bg-[#D9A425] hover:bg-[#B3831D] transition-all text-white text-xs font-bold py-2 rounded-lg">
                        Tour de la plataforma
                    </a>
                </div>

                <div className="flex flex-col gap-y-4 w-full lg:w-[194px] px-14 md:px-0">
                    <img src={informative} alt="" className="h-[188px] rounded-lg" />
                    <a href="https://info.roulettesview.com/como-funciona/" target='_blank' className="bg-[#D9A425] hover:bg-[#B3831D] transition-all text-white text-xs font-bold py-2 rounded-lg">
                        Sección informativa
                    </a>
                </div>
            </div>
        </div>
    )
}

export default WelcomeContent
