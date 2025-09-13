
// import { useMutation } from "@apollo/client";
import PriceCard from "../../../../components/pre-footer/PriceCard"
// import { START_FREE_SUBSCRIPTION_MUTATION } from "../../../../graphql/mutations/subscription/startFreeSubscription";
// import { showErrorToast } from "../../Toast";


const pricingData = [
    {
        price: "1.5",
        subscription: "Diario",
        subSize: "28px",
        priceSize: "7xl"
    },
    {
        price: "3.0",
        subscription: "Semanal",
        subSize: "28px",
        priceSize: "7xl"
    },
    {
        price: "5.0",
        subscription: "Mensual",
        subSize: "28px",
        priceSize: "7xl"
    },
    {
        price: "25",
        subscription: "Anual",
        subSize: "28px",
        priceSize: "7xl"
    }
]



const PricingContent = () => {

    // const [startFreeSubscription, { loading }] = useMutation(START_FREE_SUBSCRIPTION_MUTATION);

    // const handleStartFreeSubscription = async () => {
    //     try {
    //         await startFreeSubscription()
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     } catch (error: any) {
    //         showErrorToast(error.message)
    //     }
    // }


    return (
        <div className="flex flex-col items-center text-center text-white">
            <div className="flex flex-col justify-center items-center gap-y-2.5">
                <h3 className="text-xl md:text-3xl">Prueba nuestra plataforma</h3>
                <span className="uppercase text-[#D9A425] text-[50px] font-extrabold">Gratis</span>

                <h3 className="text-base md:text-[26px] mb-12">Te <span className="text-[#D9A425]">regalamos acceso </span> para experimentar nuestros análisis en vivo en 1 ruleta</h3>
                {/* <button onClick={handleStartFreeSubscription} disabled={loading} className="bg-[#D9A425] hover:bg-[#B3831D] disabled:bg-[#4D4D51] disabled:cursor-not-allowed  transition-all w-[330px] md:w-[400px] text-lg font-bold rounded-[10px] py-3 cursor-pointer">Prueba gratuita</button> */}


                <div className="mt-10 flex flex-col gap-y-4">
                    <h1 className="text-xl md:text-3xl underline underline-offset-8">Conoce nuestros planes</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-4 justify-items-center gap-3 h-[175px] w-full">
                        {pricingData.map((item, index) => (
                            <PriceCard
                                key={index}
                                price={item.price}
                                subscription={item.subscription}
                                subSize={item.subSize}
                                priceSize={item.priceSize}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PricingContent
