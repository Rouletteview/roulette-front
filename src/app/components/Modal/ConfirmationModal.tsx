import React, { useEffect, useState } from "react";


interface Bet {
    position: string;
    amount: number;
}

interface ConfirmationModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    bets: Bet[];
}

const getPositionLabel = (position: string) => {
    const map: Record<string, string> = {
        red: "rojo",
        black: "negro",
        even: "par",
        odd: "impar",
        low: "1 a 18",
        high: "19 a 36",
        'dozen-1': '1a docena',
        'dozen-2': '2a docena',
        'dozen-3': '3a docena',
        'column-1': '1a columna',
        'column-2': '2a columna',
        'column-3': '3a columna',
        '0': '0',
        '00': '00',
    };
    return map[position] || position;
};

const buildBetMessage = (bets: Bet[]) => {
    if (bets.length === 0) return "No se realizaron apuestas.";

    const parts = bets.map((bet, index) => {
        return (
            <span key={bet.position}>
                el <span className="text-[#D9A425] font-bold">valor {bet.amount}</span> al {getPositionLabel(bet.position)}
                {index < bets.length - 2 ? ", " : ""}
                {index === bets.length - 2 ? " y " : ""}
            </span>
        );
    });
    return (
        <span>
            Se apostó {parts}
        </span>
    );
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ show, onClose, onConfirm, bets }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (show) setIsAnimating(true);
    }, [show]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div
                className={`absolute inset-0   transition-opacity duration-300 ${isAnimating ? "opacity-60" : "opacity-0"}`}
                onClick={onClose}
            />
            <div
                className={`lg:w-[600px] text-center bg-[#121418F2] p-6 rounded-2xl shadow-lg transition-all duration-300 ease-out flex flex-col items-center justify-center ${isAnimating ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"}`}
            >
                <div className="mb-8 mt-4 text-center">
                    <h2 className="text-white text-xl md:text-2xl font-medium leading-tight">
                        {buildBetMessage(bets)}
                    </h2>
                </div>
                <div className="flex flex-col-reverse md:flex-row gap-6  justify-center mt-2 px-0 lg:px-20 w-full">
                    <button
                        onClick={onClose}
                        className=" bg-[#6B6B6B] hover:bg-[#555] text-white text-lg font-bold w-full py-3 px-4 rounded-xl transition-all cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className=" bg-gradient-to-b from-[#D9A425] to-[#B3831D] hover:from-[#B3831D] hover:to-[#D9A425] text-white text-lg font-bold w-full py-3 px-6 rounded-xl transition-all cursor-pointer"
                    >
                        Hacer apuesta
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal; 