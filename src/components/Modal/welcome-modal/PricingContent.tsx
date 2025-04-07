import PriceCard from "../../pre-footer/PriceCard"


const PricingContent = () => {
    return (
        <div className="flex flex-col items-center text-center text-white">
            <div className="flex flex-col justify-center items-center gap-y-2.5">
                <h3 className="text-xl md:text-3xl">Prueba nuestra plataforma</h3>
                <span className="uppercase text-[#D9A425] text-[50px] font-extrabold">Gratis</span>
               
                <h3 className="text-base md:text-[26px]">Por 7 días te <span className="text-[#D9A425]">regalamos acceso </span> para experimentar nuestros análisis en vivo</h3>
                <a href="/" className="bg-[#D9A425] hover:bg-[#B3831D] transition-all w-[330px] md:w-[400px] text-lg font-bold rounded-[10px] py-3">Prueba gratuita</a>
                
                
                <div className="mt-10 flex flex-col gap-y-4">
                    <h1 className="text-xl md:text-3xl underline underline-offset-8">Conoce nuestros planes</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-4 justify-items-center gap-3 h-[175px] w-full">
                        <PriceCard
                            price="1.5"
                            subscription="Diario"
                            subSize="28px"
                            priceSize="6xl"

                        />
                        <PriceCard
                            price="3.0"
                            subscription="Semanal"
                            subSize="28px"
                            priceSize="6xl"

                        />
                        <PriceCard
                            price="5.0"
                            subscription="Mensual"
                            subSize="28px"
                            priceSize="6xl"

                        />
                        <PriceCard
                            price="25"
                            subscription="Anual"
                            subSize="28px"
                            priceSize="6xl"

                        />


                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingContent
