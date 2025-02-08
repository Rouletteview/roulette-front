interface Props {
    price: string;
    subscription: string;
}

const PriceCard = ({ price, subscription }: Props) => {
    return (
        <a href="" className="group w-full max-w-xs sm:max-w-sm md:max-w-none bg-gradient-to-b from-[rgba(255,255,255,0.5)] to-white rounded-4xl  leading-[48px]">
            <div className="px-0 pt-5 pb-5 mx-10">
                <h1 className="text-[38px] text-[#121418F2] font-bold drop-shadow-[0px_4px_8px_#00000066]">Plan <span className="text-[#D9A425]">{subscription}</span></h1>
                <div className="flex justify-center text-[#121418F2] text-center">
                    <span className="text-6xl font-black">$</span>
                    <h1 className="text-9xl font-black">{price}</h1>
                </div>
            </div>

            <div className="w-full bg-[#D9A425] group-hover:bg-[#B3831D] transition-all  text-center rounded-b-4xl py-2 pricing-card-shadow">
                <h1 className="text-whie font-bold text-2xl">Suscríbete</h1>
            </div>
        </a>
    )
}

export default PriceCard



