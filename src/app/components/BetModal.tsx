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
import { getGraphQLErrorMessage } from '../../utils/errorMessages';
import { useBetStatusStore } from '../../stores/betStatusStore';
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
    { value: '2.5', color: 'bg-red-700', border: 'border-white', img: chip3 },
    { value: '5', color: 'bg-pink-500', border: 'border-white', img: chip2 },
    { value: '10', color: 'bg-orange-500', border: 'border-white', img: chip5 },
    { value: '20', color: 'bg-blue-800', border: 'border-white', img: chip4 },
    { value: '25', color: 'bg-lime-500', border: 'border-white', img: chip5 },
    { value: '100', color: 'bg-purple-700', border: 'border-white', img: chip6 },
];

interface ModalContentProps {
    handleModalClick: (e: React.MouseEvent) => void;
    onClose: () => void;
    betValue: string;
    selectedChip: string;
    setSelectedChip: (chip: string) => void;
    setCounter: (counter: number) => void;
    counter: number;
    handleChipClick: (chip: string) => void;
    handleBet: () => void;
    loading: boolean;
}

const ModalContent: React.FC<ModalContentProps> = (props) => (
    <div
        onClick={props.handleModalClick}
        className="relative bg-white rounded-3xl shadow-xl w-full max-w-xs md:w-[250px] p-4 pt-10  mx-4 md:mx-0"
    >
        <button
            className="absolute top-2 md:top-2 right-2 md:right-6 text-3xl text-[#D9A425] font-bold focus:outline-none cursor-pointer"
            onClick={props.onClose}
            aria-label="Cerrar"
        >
            ×
        </button>
        <h2 className="text-2xl md:text-base font-semibold text-center text-[#181A20] mb-8">
            Elige la ficha y la cantidad a apostar por <span className="text-[#D9A425]">{translateRouletteTag(props.betValue)}</span>
        </h2>
        <div className="grid md:grid-cols-3 grid-cols-4 justify-center gap-4 mb-8">
            {chips.map((chip) => (
                <div
                    key={chip.value}
                    className={`flex flex-col  items-center w-16 h-16`}
                >
                    <button
                        key={chip.value}
                        disabled={!!props.selectedChip && props.selectedChip !== chip.value}
                        onClick={() => props.handleChipClick(chip.value)}
                        className={`relative w-16 hover:scale-125 h-auto transition-all cursor-pointer rounded-full disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        <img src={chip.img} alt="chip-button" className="w-full" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-sm md:text-base font-semibold pointer-events-none">
                            {chip.value}
                        </span>
                    </button>
                </div>
            ))}
        </div>
        <div className="flex items-center justify-center gap-2 ">
            <button onClick={() => props.setCounter(props.counter - 1)} disabled={props.counter === 1} className="w-12 h-12 rounded-full bg-gray-200 text-3xl text-black flex items-center justify-center font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300">-</button>
            <span className="w-16 h-12 flex items-center justify-center rounded-full bg-gray-100 text-3xl font-semibold text-[#D9A425] mx-2 select-none">{props.counter}</span>
            <button onClick={() => props.setCounter(props.counter + 1)} className="w-12 h-12 rounded-full bg-gray-200 text-3xl text-black flex items-center justify-center font-bold cursor-pointer hover:bg-gray-300">+</button>
        </div>
        <button
            onClick={props.handleBet}
            disabled={props.counter === 0 || props.selectedChip === "" || props.loading}
            className="w-full py-4 rounded-xl bg-[#D9A425] text-white text-xl font-semibold shadow-md mt-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D9A425]/80 cursor-pointer flex items-center justify-center gap-2"
        >
            {props.loading ? (
                <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Procesando...
                </>
            ) : (
                "Apostar"
            )}
        </button>
    </div>
);

const BetModal: React.FC<Props> = ({ open, onClose, selectedChip = "", setSelectedChip, setCounter, counter, selectedTable, amount, gameType, betValue, setBetId }: Props) => {
    const { createBet, createBetLoading } = useBetData({
        rouletteTableId: selectedTable,
        amount: amount,
        gameType: gameType,
        value: betValue || ""
    });


    const { addActiveBet } = useBetStatusStore();

    if (!open) return null;

    const handleBet = async () => {
        try {
            const response = await createBet();
            const betId = response.data.CreateBet.id;


            if (gameType === 'Column' || gameType === 'Dozen') {
                addActiveBet({
                    id: betId,
                    tag: betValue,
                    gameType: gameType,
                    amount: amount
                });
            }


            const existingBetIds = localStorage.getItem('betId');
            let betIdsArray: string[] = [];

            if (existingBetIds) {
                try {
                    betIdsArray = JSON.parse(existingBetIds);

                } catch (error) {
                    betIdsArray = [];
                }
            }


            betIdsArray.push(betId);


            localStorage.setItem('betId', JSON.stringify(betIdsArray));

            showPlacedToast(translateRouletteTag(betValue));
            setBetId(betId);
            onClose();
        } catch (error) {
            const errorMessage = getGraphQLErrorMessage(error);
            showErrorToast(errorMessage);
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
        <>

            <div className="block md:hidden fixed inset-0 z-50 flex items-center justify-center bg-[#000000CC] bg-opacity-60">
                <ModalContent
                    handleModalClick={handleModalClick}
                    onClose={onClose}
                    betValue={betValue}
                    selectedChip={selectedChip}
                    setSelectedChip={setSelectedChip}
                    setCounter={setCounter}
                    counter={counter}
                    handleChipClick={handleChipClick}
                    handleBet={handleBet}
                    loading={createBetLoading}
                />
            </div>

            <div className="hidden md:block fixed bottom-0 right-0 z-50 my-6 mr-6">
                <ModalContent
                    handleModalClick={handleModalClick}
                    onClose={onClose}
                    betValue={betValue}
                    selectedChip={selectedChip}
                    setSelectedChip={setSelectedChip}
                    setCounter={setCounter}
                    counter={counter}
                    handleChipClick={handleChipClick}
                    handleBet={handleBet}
                    loading={createBetLoading}
                />
            </div>
        </>
    );
};

export default BetModal; 