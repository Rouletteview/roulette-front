import RouletteTable from "../../RouletteTable"
import closeModalIcon from "../../../../assets/icon/close-modal.svg"
import { useState, useEffect } from "react";

interface Bet {
    position: string;
    amount: number;
}

interface Props {
    showModal: boolean;
    onClose: () => void;
    selectedChip: number | null;
}

const BetModal = ({ showModal, onClose, selectedChip }: Props) => {
    const [bets, setBets] = useState<Bet[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (showModal) {
            setIsAnimating(true);
        }
    }, [showModal]);

    const handlePlaceBet = (position: string, amount: number) => {
        setBets(prevBets => {
            if (amount < 0) {
                // Si el amount es negativo, eliminar la apuesta de esa posición
                return prevBets.filter(bet => bet.position !== position);
            }

            // Verificar si ya existe una apuesta en esa posición
            const existingBetIndex = prevBets.findIndex(bet => bet.position === position);
            if (existingBetIndex >= 0) {
                // Si ya existe una apuesta, no hacer nada (no debería pasar con la nueva lógica)
                return prevBets;
            }
            // Si no existe, agregar nueva apuesta
            return [...prevBets, { position, amount }];
        });
    };

    const handleConfirmBets = () => {
        if (bets.length === 0) return;
        setBets([]);
        handleClose();
    };

    // const getTotalBetAmount = () => {
    //     return bets.reduce((total, bet) => total + bet.amount, 0);
    // };

    // const handleClearBets = () => {
    //     setBets([]);
    // };

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            onClose();
        }, 200);
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Overlay */}
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${isAnimating ? 'opacity-60' : 'opacity-0'
                    }`}
                onClick={handleClose}
            />

            {/* Modal - Responsive */}
            <div
                className={`absolute inset-4 sm:inset-8 md:inset-12 lg:w-7xl lg:top-20 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:h-auto text-center bg-black p-3 sm:p-4 lg:p-6 rounded shadow-lg transition-all duration-300 ease-out overflow-y-auto flex flex-col lg:block ${isAnimating
                    ? 'scale-100 opacity-100 translate-y-0'
                    : 'scale-95 opacity-0 translate-y-4'
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-4 lg:mb-8">
                    <h1 className="text-white text-center text-sm sm:text-xl lg:text-[28px] font-medium leading-tight mt-4">
                        Coloca la ficha para la apuesta y visualiza el <span className="text-[#D9A425]">resultado en la gráfica</span>
                    </h1>
                    <button className="cursor-pointer ml-2 flex-shrink-0" onClick={handleClose}>
                        <img src={closeModalIcon} alt="Cerrar" className="w-6 h-6 lg:w-8 lg:h-8" />
                    </button>
                </div>

                {/* Roulette Table Container */}
                <div className="flex justify-center items-center  lg:mb-6 ">
                    <div className="w-full h-full lg:h-auto max-h-full max-w-full overflow-auto lg:overflow-x-auto">
                        <RouletteTable
                            selectedChip={selectedChip}
                            onPlaceBet={handlePlaceBet}
                            bets={bets}
                        />
                    </div>
                </div>

              

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">

                    <button
                        onClick={handleConfirmBets}
                        disabled={bets.length === 0}
                        style={{ boxShadow: 'inset 0px -6px 8px 0px #00000040' }}
                        className={`w-full sm:w-auto text-white text-sm sm:text-base lg:text-lg font-bold px-8 sm:px-12 lg:px-56 py-3 sm:py-4 rounded-xl transition-all order-1 sm:order-2 ${bets.length > 0
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

