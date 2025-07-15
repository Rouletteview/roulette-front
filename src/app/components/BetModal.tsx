import React from 'react';
import chip1 from '../../assets/poker-chips/chip-1.png';
import chip2 from '../../assets/poker-chips/chip-2.png';
import chip3 from '../../assets/poker-chips/chip-3.png';
import chip4 from '../../assets/poker-chips/chip-4.png';
import chip5 from '../../assets/poker-chips/chip-5.png';
import chip6 from '../../assets/poker-chips/chip-6.png';
import { useBetData } from '../sections/BetSection/hooks/useBetData';
import { showErrorToast, showPlacedToast } from './Toast';
import { translateRouletteTag } from '../../utils/formatters/rouletterNumbers';
// import chip7 from '../../assets/poker-chips/chip-7.png';
// import chip8 from '../../assets/poker-chips/chip-8.png';

interface Props {
    open: boolean;
    onClose: () => void;
    selectedChip: string;
    counter: number;
    setCounter: (counter: number) => void;
    setSelectedChip: (chip: string) => void;
    setBetId: (betId: string) => void;
    selectedTable: string;
    amount: number;
    gameType: string;
    betValue: string;
}

const chips = [
    { value: '0.10', color: 'bg-gray-700', border: 'border-white', img: chip1 },
    { value: '0.50', color: 'bg-green-800', border: 'border-white', img: chip2 },
    { value: '1', color: 'bg-red-700', border: 'border-white', img: chip3 },
    { value: '5', color: 'bg-pink-500', border: 'border-white', img: chip4 },
    { value: '10', color: 'bg-orange-500', border: 'border-white', img: chip5 },
    { value: '20', color: 'bg-blue-800', border: 'border-white', img: chip6 },
    { value: '25', color: 'bg-lime-500', border: 'border-white', img: chip6 },
    { value: '100', color: 'bg-purple-700', border: 'border-white', img: chip6 },
];

const BetModal: React.FC<Props> = ({ open, onClose, selectedChip = "", setSelectedChip, setCounter, counter, selectedTable, amount, gameType, betValue, setBetId }: Props) => {
    const { createBet, createBetError } = useBetData({
        rouletteTableId: selectedTable,
        amount: amount,
        gameType: gameType,
        value: betValue || ""
    });

    if (!open) return null;

    const handleBet = async () => {
        try {
            const response = await createBet();
            localStorage.setItem('betId', response.data.CreateBet.id);
            showPlacedToast(translateRouletteTag(betValue));
            setBetId(response.data.CreateBet.id);
            onClose();
        } catch (error) {
            console.log(error);
            console.log(createBetError);

          
            let errorMessage = 'Error al realizar la apuesta';
            if (createBetError?.message) {
                errorMessage = createBetError.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            showErrorToast(errorMessage);
        }
    }



    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleChipClick = (chip: string) => {
        if (selectedChip === chip) {
            setSelectedChip("");
        } else {
            setSelectedChip(chip);
        }
    };
    return (
        <div onClick={handleBackdropClick} className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000CC] bg-opacity-60 mx-4">
            <div onClick={handleModalClick} className="relative bg-white rounded-3xl shadow-xl w-full max-w-2xl p-8">

                <button
                    className="absolute top-2 md:top-6 right-2 md:right-6 text-3xl text-[#D9A425] font-bold focus:outline-none cursor-pointer"
                    onClick={onClose}
                    aria-label="Cerrar"
                >
                    ×
                </button>

                <h2 className="text-2xl lg:text-3xl font-semibold text-center text-[#181A20] mb-8">
                    Elige la ficha y la cantidad a apostar por <span className="text-[#D9A425]">{translateRouletteTag(betValue)}</span>
                </h2>

                <div className="grid lg:grid-cols-8 grid-cols-4 justify-center gap-4 mb-8">
                    {chips.map((chip) => (
                        <div
                            key={chip.value}
                            className={`flex flex-col  items-center w-16 h-16`}
                        >
                            <button
                                key={chip.value}
                                disabled={!!selectedChip && selectedChip !== chip.value}
                                onClick={() => handleChipClick(chip.value)}
                                className={`relative w-16 hover:scale-125 h-auto transition-all cursor-pointer rounded-full disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                <img src={chip.img} alt="chip-button" className="w-full" />
                                <span className="absolute inset-0 flex items-center justify-center text-white text-sm lg:text-base font-semibold pointer-events-none">
                                    {chip.value}
                                </span>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-center gap-2 mb-8">
                    <button onClick={() => setCounter(counter - 1)} disabled={counter === 1} className="w-12 h-12 rounded-full bg-gray-200 text-3xl text-black flex items-center justify-center font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300">-</button>
                    <span className="w-16 h-12 flex items-center justify-center rounded-full bg-gray-100 text-3xl font-semibold text-[#D9A425] mx-2 select-none">{counter}</span>
                    <button onClick={() => setCounter(counter + 1)} className="w-12 h-12 rounded-full bg-gray-200 text-3xl text-black flex items-center justify-center font-bold cursor-pointer hover:bg-gray-300">+</button>
                </div>

                <button onClick={handleBet} disabled={counter === 0 && selectedChip === ""} className="w-full py-4 rounded-xl bg-[#D9A425] text-white text-xl font-semibold shadow-md mt-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D9A425]/80 cursor-pointer">
                    Apostar
                </button>
            </div>
        </div>
    );
};

export default BetModal; 