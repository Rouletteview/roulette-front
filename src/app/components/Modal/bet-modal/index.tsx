import RouletteTable from "../../RouletteTable"
import closeModalIcon from "../../../../assets/icon/close-modal.svg"
import { useState, useEffect } from "react";

export interface Bet {
    position: string;
    amount: number;
}

interface Props {
    showModal: boolean;
    onClose: () => void;
    selectedChip: number | null;
    onRequestConfirmation?: (bets: Bet[]) => void;
    bets: Bet[];
    setBets: React.Dispatch<React.SetStateAction<Bet[]>>;
}

const BetModal = ({ showModal, onClose, selectedChip, onRequestConfirmation, bets, setBets }: Props) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (showModal) {
            setIsAnimating(true);
        }
    }, [showModal]);

    const handlePlaceBet = (position: string, amount: number) => {
        setBets(prevBets => {
            if (amount < 0) {
                return prevBets.filter(bet => bet.position !== position);
            }
            const existingBetIndex = prevBets.findIndex(bet => bet.position === position);
            if (existingBetIndex >= 0) {
                return prevBets;
            }
            return [...prevBets, { position, amount }];
        });
    };

    const handleConfirmBets = () => {
        if (bets.length === 0) return;
        if (onRequestConfirmation) {
            onRequestConfirmation(bets);
            handleClose();
            return;
        }
        handleClose();
    };

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            onClose();
        }, 200);
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay oscuro */}
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${isAnimating ? 'opacity-60' : 'opacity-0'
                    }`}
                onClick={handleClose}
            />

            {/* Modal */}
            <div
                className={`relative w-full max-w-[95%] sm:max-w-[80%] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl max-h-[90vh] bg-black rounded shadow-lg p-4 sm:p-6 lg:p-8 overflow-hidden transition-all duration-300 ease-out flex flex-col ${isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
                    }`}
            >
                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-white text-center text-sm sm:text-xl lg:text-2xl font-medium leading-tight">
                        Coloca la ficha para la apuesta y visualiza el{' '}
                        <span className="text-[#D9A425]">resultado en la gráfica</span>
                    </h1>
                    <button className="absolute top-4 right-4  flex-shrink-0 cursor-pointer" onClick={handleClose}>
                        <img src={closeModalIcon} alt="Cerrar" className="w-6 h-6 sm:w-8 sm:h-8" />
                    </button>
                </div>

                {/* Contenido scrollable */}
                <div className="  overflow-auto">
                    <RouletteTable
                        selectedChip={selectedChip}
                        onPlaceBet={handlePlaceBet}
                        bets={bets}
                    />
                </div>

                {/* Botón abajo */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <button
                        onClick={handleConfirmBets}
                        disabled={bets.length === 0}
                        style={{ boxShadow: 'inset 0px -6px 8px 0px #00000040' }}
                        className={`w-full sm:w-auto text-white text-sm sm:text-base lg:text-lg font-bold px-8 sm:px-12 lg:px-20 py-3 sm:py-4 rounded-xl transition-all ${bets.length > 0
                            ? 'bg-[#D9A425] hover:bg-[#B3831D] cursor-pointer'
                            : 'bg-gray-600 cursor-not-allowed'
                            }`}
                    >
                        Apostar
                    </button>
                </div>
            </div>
        </div>


    );
};

export default BetModal;

