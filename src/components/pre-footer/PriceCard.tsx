interface Props {
    price: string;
    subscription: string;
    subSize?: string;
    priceSize?: string;
    dollarSize?: string;
}

const PriceCard = ({ price, subscription, subSize = '38px', priceSize = '9xl' }: Props) => {
    return (
        <a href={`/subscription?price=${price}`} className="group w-full max-w-xs sm:max-w-sm md:max-w-none bg-gradient-to-b from-[rgba(255,255,255,0.5)] to-white rounded-4xl">
            <div className="pt-5 pb-5 mx-5">
                <h1 className={`text-[${subSize}] text-[#121418F2] font-bold drop-shadow-[0px_4px_8px_#00000066]`}>Plan <span className="text-[#D9A425]">{subscription}</span></h1>
                <div className="flex justify-center text-[#121418F2] text-center">
                    <span className="text-3xl font-black">$</span>
                    <h1 className={`text-${priceSize} font-black`}>{price}</h1>
                </div>
            </div>

            <div className="w-full bg-[#D9A425] group-hover:bg-[#B3831D] transition-all  text-center rounded-b-4xl py-2 pricing-card-shadow">
                <h1 className="text-whie font-bold text-lg">Suscríbete</h1>
            </div>
        </a>
    )
}

export default PriceCard



