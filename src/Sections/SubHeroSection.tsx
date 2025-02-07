import laptopAndSmartphone from '../assets/images/laptop.png'
import finantialMarketImage from '../assets/images/financial-market.png'
import laptopVideo from '../assets/videos/charts.mp4'


export const SubHeroSection = () => {
    return (
        <div
            className="h-full bg-center w-full flex items-center justify-center text-white"
            style={{ backgroundImage: "url('/background/business-stock.gif')", backgroundSize: "cover" }}
        >
            <div className="w-full  bg-[#121418F2]" >
                <div className="mt-28 md:mt-20 flex flex-col justify-center items-center text-center font-medium leading-[22px] md:leading-[48px] px-4">
                    <section className="max-w-[881px] flex flex-col gap-y-7">
                        <h1 className="text-2xl md:text-[45px] mx-3 md:mx-28 font-medium">Sistema de <span className="text-[#D9A425] font-[800]">Gráficos</span>  en vivo</h1>
                        <p className="text-xl md:text-3xl font-medium">Nuestra plataforma ofrece analizar los resultados de la ruleta de casino en tiempo real</p>
                    </section>


                    <div className='my-8  w-full grid grid-cols-1 lg:grid-cols-2 justify-items-center'>
                        <div className="relative max-w-[800px]">

                            <video autoPlay loop muted className="absolute top-[10%] left-[16%] w-[68%] h-[60%] object-cover rounded-md z-10">
                                <source src={laptopVideo} type="video/mp4" />
                                Tu navegador no soporta videos.
                            </video>
                            <img src={finantialMarketImage} alt="" className="absolute bottom-[5%] right-[6%] z-20 w-[16.2%] h-auto object-cover" />
                            <img src={laptopAndSmartphone} alt="" className="relative z-30" />

                        </div>
                        <div className="lg:mt-14 max-w-[550px] text-center relative">
                            <h1 className="text-[#D9A425] text-[40px] md:text-[80px] font-medium leading-[41px] md:leading-[83px] relative z-10 drop-shadow-[0_0_25px_rgba(64, 64, 64, 1)]
      before:content-[''] before:absolute before:-left-14 before:-top-2 before:w-[177px] md:before:w-[250px] before:h-[169px] md:before:h-[272px] before:bg-white before:blur-[100px] before:opacity-25 before:rounded-full before:-z-10
      after:content-[''] after:absolute after:right-8 after:-bottom-2 after:w-[210px] after:h-[200px] after:bg-white after:blur-[100px] after:opacity-35 after:rounded-full after:-z-10">
                                Maximiza tus oportunidades de éxito en cada jugada
                            </h1>
                        </div>


                    </div>
                    <div className='mt-16 text-center w-full leading-[22px] md:leading-[56px]'>
                        <p className='font-medium text-base md:text-[45px]'>Nuestra plataforma es ideal para inversores que buscan hacer <span className='text-[#D9A425] font-[800]'>trading</span> de forma profesional y <span className='text-[#D9A425] font-[800]'>basada en datos</span></p>
                    </div>


                </div>



            </div>

        </div >
    )
}

export default SubHeroSection


// background: #121418F2;
