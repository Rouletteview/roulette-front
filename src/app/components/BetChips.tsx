import chip1 from '../../assets/poker-chips/chip-1.png';
import chip5 from '../../assets/poker-chips/chip-2.png';
import chip10 from '../../assets/poker-chips/chip-3.png';
import chip20 from '../../assets/poker-chips/chip-4.png';
import chip25 from '../../assets/poker-chips/chip-5.png';
import chip100 from '../../assets/poker-chips/chip-6.png';



const chips = [
    { value: 1, label: '1', img: chip1 },
    { value: 5, label: '5', img: chip5 },
    { value: 10, label: '10', img: chip10 },
    { value: 20, label: '20', img: chip20 },
    { value: 25, label: '25', img: chip25 },
    { value: 100, label: '100', img: chip100 },
];

const BetChips = () => {
    return (
        <div className="flex flex-col gap-y-3.5">
            {
                chips.map((chip) => (
                    <button
                    key={chip.value}
                    className="relative w-10 lg:w-16 hover:scale-125 h-auto transition-all cursor-pointer"
                  >
                    <img src={chip.img} alt="chip-button" className="w-full" />
                    <span className="absolute inset-0 flex items-center justify-center text-white text-sm lg:text-basefont-semibold  pointer-events-none">
                      {chip.label}
                    </span>
                  </button>
                ))
            }
        </div>

    )
}

export default BetChips
