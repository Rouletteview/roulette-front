

interface Props {
    icon: string;
    title: string;
    description: string;
}

const HeroCard = ({ icon, title, description }: Props) => {
    return (
        <div
            className="hero-cards flex flex-col w-full  md:max-w-[410px] h-auto min-h-[220px] md:min-h-[270px] px-3.5 pt-4 pb-11 rounded-4xl leading-[22px] text-white"
            style={{ background: "linear-gradient(180deg, #404040 0%, #000000 94.4%)" }}
        >
            <div className='text-start mb-1'>
                <img src={icon} alt="" className='w-[50px] md:w-[71px] h-auto' />
                <h1 className="text-lg md:text-2xl font-bold mt-2">{title}</h1>
            </div>
            <div className="flex-1 flex items-center">
                <p className="text-center text-base md:text-xl font-[400]">{description}</p>
            </div>
        </div>

    )
}

export default HeroCard




