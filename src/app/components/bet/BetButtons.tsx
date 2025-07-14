

import React, { useState } from 'react'
import { useCountdownStore } from '../../../stores/countdownStore';

interface BetButtonsProps {
    gameType: string
    handleToggle: (tag: string) => void
    probabilities: Array<{
        Tag: string
        Value: number
        Count: number
    }> | undefined
}

const colorClasses: Record<string, string> = {
    red: "border-[#FF0000] hover:border-[#FF0000]/80",
    black: "border-white hover:border-white/80",
    green: "border-[#00FF00] hover:border-[#00FF00]/80",
};



const numbers = [
    {
        number: 1,
        color: "red"
    },
    {
        number: 2,
        color: "black"
    },
    {
        number: 3,
        color: "red"
    },
    {
        number: 4,
        color: "black"
    },
    {
        number: 5,
        color: "black"
    },
    {
        number: 6,
        color: "red"
    },
    {
        number: 7,
        color: "red"
    },
    {
        number: 8,
        color: "black"
    },
    {
        number: 9,
        color: "red"
    },
    {
        number: 10,
        color: "black"
    },
    {
        number: 11,
        color: "black"
    },
    {
        number: 12,
        color: "red"
    },
    {
        number: 13,
        color: "red"
    },
    {
        number: 14,
        color: "black"
    },
    {
        number: 15,
        color: "red"
    },
    {
        number: 16,
        color: "black"
    },
    {
        number: 17,
        color: "red"
    },
    {
        number: 18,
        color: "black"
    },
    {
        number: 19,
        color: "red"
    },
    {
        number: 20,
        color: "black"
    },
    {
        number: 21,
        color: "black"
    },
    {
        number: 22,
        color: "red"
    },
    {
        number: 23,
        color: "red"
    },
    {
        number: 24,
        color: "black"
    },
    {
        number: 25,
        color: "red"
    },
    {
        number: 26,
        color: "black"
    },
    {
        number: 27,
        color: "red"
    },
    {
        number: 28,
        color: "black"
    },
    {
        number: 29,
        color: "red"
    },
    {
        number: 30,
        color: "black"
    },
    {
        number: 31,
        color: "black"
    },
    {
        number: 32,
        color: "red"
    },
    {
        number: 33,
        color: "red"
    },
    {
        number: 34,
        color: "black"
    },
    {
        number: 35,
        color: "red"
    },
    {
        number: 36,
        color: "black"
    },
    {
        number: 0,
        color: "green"
    }
]

const HighLowButtons = ({ lowPercentage, highPercentage, handleToggle }: { lowPercentage: number, highPercentage: number, handleToggle: (tag: string) => void }) => {
    return (
        <div className="flex flex-col gap-6 w-full">
            <button onClick={() => handleToggle('Low')} className="bg-[#0D7FFC41] hover:bg-[#0D7FFC41]/80 w-full text-white  text-md font-bold px-4 py-2 rounded-[10px] shadow-[0px_4px_6px_0px_#00000040] cursor-pointer">Bajo 1-18 ({lowPercentage}%)</button>
            <button onClick={() => handleToggle('High')} className="bg-[#85FFE099] hover:bg-[#85FFE099]/80 w-full text-white text-md font-bold px-4 py-2 rounded-[10px] shadow-[0px_-6px_8px_0px_#00000040] cursor-pointer">Alto 19-36 ({highPercentage}%)</button>
        </div>
    )
};

const RedBlackButtons = ({ redPercentage, blackPercentage, handleToggle }: { redPercentage: number, blackPercentage: number, handleToggle: (tag: string) => void }) => {
    return (
        <div className="flex flex-col gap-6 w-full">
            <button onClick={() => handleToggle('Red')} className="bg-[#FF0000] hover:bg-[#FF0000]/80 w-full text-white  text-md font-bold px-4 py-2 rounded-[10px] shadow-[0px_4px_6px_0px_#00000040] cursor-pointer">Rojo ({redPercentage}%)</button>
            <button onClick={() => handleToggle('Black')} className="bg-[#000000] hover:bg-[#000000]/80 w-full text-white text-md font-bold px-4 py-2 rounded-[10px] shadow-[0px_-6px_8px_0px_#00000040] cursor-pointer">Negro ({blackPercentage}%)</button>
        </div>
    )
}

const EvenOddButtons = ({ evenPercentage, oddPercentage, handleToggle }: { evenPercentage: number, oddPercentage: number, handleToggle: (tag: string) => void }) => {
    return (
        <div className="flex flex-col gap-6 w-full">
            <button onClick={() => handleToggle('Even')} className="bg-[#0D7FFC41] hover:bg-[#0D7FFC41]/80 w-full text-white  text-md font-bold px-4 py-2 rounded-[10px] shadow-[0px_4px_6px_0px_#00000040] cursor-pointer">Par ({evenPercentage}%)</button>
            <button onClick={() => handleToggle('Odd')} className="bg-[#85FFE099] hover:bg-[#85FFE099]/80 w-full text-white text-md font-bold px-4 py-2 rounded-[10px] shadow-[0px_-6px_8px_0px_#00000040] cursor-pointer">Impar ({oddPercentage}%)</button>
        </div>
    )
}

const DozenButtons = ({ dozen1Percentage, dozen2Percentage, dozen3Percentage, handleToggle }: { dozen1Percentage: number, dozen2Percentage: number, dozen3Percentage: number, handleToggle: (tag: string) => void }) => {
    return (
        <div className="flex flex-col gap-6 w-full">
            <button onClick={() => handleToggle('FirstDozen')} className="bg-[#8D34F9] hover:bg-[#8D34F9]/80 w-full text-white  text-md font-bold px-2 py-2 rounded-[10px] shadow-[0px_4px_6px_0px_#00000040] cursor-pointer">Docena 1 - 12 ({dozen1Percentage}%)</button>
            <button onClick={() => handleToggle('SecondDozen')} className="bg-[#0D7FFC41] hover:bg-[#0D7FFC41]/80 w-full text-white text-md font-bold px-2 py-2 rounded-[10px] shadow-[0px_-6px_8px_0px_#00000040] cursor-pointer">Docena 13 - 24 ({dozen2Percentage}%)</button>
            <button onClick={() => handleToggle('ThirdDozen')} className="bg-[#85FFE099] hover:bg-[#85FFE099]/80 w-full text-white  text-md font-bold px-2 py-2 rounded-[10px] shadow-[0px_4px_6px_0px_#00000040] cursor-pointer">Docena 25 - 36 ({dozen3Percentage}%)</button>
        </div>
    )
}

const ColumnButtons = ({ column1Percentage, column2Percentage, column3Percentage, handleToggle }: { column1Percentage: number, column2Percentage: number, column3Percentage: number, handleToggle: (tag: string) => void }) => {
    return (
        <div className="flex flex-col gap-6 w-full">
            <button onClick={() => handleToggle('FirstColumn')} className="bg-[#8D34F9] hover:bg-[#8D34F9]/80 w-full text-white  text-md font-bold px-2 py-2 rounded-[10px] shadow-[0px_4px_6px_0px_#00000040] cursor-pointer">Columna 1 ({column1Percentage}%)</button>
            <button onClick={() => handleToggle('SecondColumn')} className="bg-[#0D7FFC41] hover:bg-[#0D7FFC41]/80 w-full text-white text-md font-bold px-2 py-2 rounded-[10px] shadow-[0px_-6px_8px_0px_#00000040] cursor-pointer">Columna 2 ({column2Percentage}%)</button>
            <button onClick={() => handleToggle('ThirdColumn')} className="bg-[#85FFE099] hover:bg-[#85FFE099]/80 w-full text-white  text-md font-bold px-2 py-2 rounded-[10px] shadow-[0px_4px_6px_0px_#00000040] cursor-pointer">Columna 3 ({column3Percentage}%)</button>
        </div>
    )
}

const StraightUpButtons = ({ probabilities, handleToggle }: { probabilities: Array<{ number: number, straightUpPercentage: number }>, handleToggle: (tag: string) => void }) => {
    return (
        <div className="grid grid-cols-3 gap-1 w-full justify-center items-center">
            {probabilities.map(item => {
                const numberData = numbers.find(n => n.number === item.number);
                return (
                    <div key={item.number} className="">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-xs text-white" key={item.number}>{item.straightUpPercentage}%</p>
                            <button onClick={() => handleToggle(String(item.number))} key={item.number} className={`cursor-pointer w-8 h-8 lg:w-7 lg:h-7 rounded-full border-3 flex items-center justify-center font-medium text-white text-[10px] md:text-xs ${colorClasses[numberData?.color || 'black']}`}>{item.number} </button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

const VoisinsDuZeroButtons = ({ voisinsDuZeroPercentage, handleToggle }: { voisinsDuZeroPercentage: number, handleToggle: (tag: string) => void }) => {
    return (
        <button onClick={() => handleToggle('VoisinsDuZero')} className="bg-[#8D34F9] hover:bg-[#8D34F9]/80 w-full text-white  text-md font-bold px-2 py-2 rounded-[10px] shadow-[0px_4px_6px_0px_#00000040] cursor-pointer">Vecinos del cero ({voisinsDuZeroPercentage}%)</button>
    )
}

const TiersDuCylindreButtons = ({ tiersDuCylindrePercentage, handleToggle }: { tiersDuCylindrePercentage: number, handleToggle: (tag: string) => void }) => {
    return (
        <button onClick={() => handleToggle('TiersDuCylindre')} className="bg-[#8D34F9] hover:bg-[#8D34F9]/80 w-full text-white  text-md font-bold px-2 py-2 rounded-[10px] shadow-[0px_4px_6px_0px_#00000040] cursor-pointer">Tercio ({tiersDuCylindrePercentage}%)</button>
    )
}

const PlayZeroButtons = ({ playZeroPercentage, handleToggle }: { playZeroPercentage: number, handleToggle: (tag: string) => void }) => {
    return (
        <button onClick={() => handleToggle('PlayZero')} className="bg-[#8D34F9] hover:bg-[#8D34F9]/80 w-full text-white  text-md font-bold px-2 py-2 rounded-[10px] shadow-[0px_4px_6px_0px_#00000040] cursor-pointer">Juego del cero ({playZeroPercentage}%)</button>
    )
}

const OrphelinsButtons = ({ orphelinsPercentage, handleToggle }: { orphelinsPercentage: number, handleToggle: (tag: string) => void }) => {
    return (
        <button onClick={() => handleToggle('Orphelins')} className="bg-[#8D34F9] hover:bg-[#8D34F9]/80 w-full text-white  text-md font-bold px-2 py-2 rounded-[10px] shadow-[0px_4px_6px_0px_#00000040] cursor-pointer">Huérfanos ({orphelinsPercentage}%)</button>
    )
}


const BetModal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
    const { countdown } = useCountdownStore();

    if (!isOpen) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 bg-[#000000CC] bg-opacity-50 flex items-center justify-center z-50 p-4 scrollbar-hidden">
            <div className="w-full max-w-md max-h-[80vh] overflow-y-auto">
                <div className="flex flex-col justify-between items-center mb-4">
                    <h1 className="text-white text-[18px] font-bold underline">Selecciona el número y luego apuesta</h1>
                    <h2 className="text-white text-sm font-bold">Puedes seleccionar más de 1 número</h2>
                    <div className="bg-black/30 text-white text-base px-3 py-1 rounded mt-2">
                        <span>00</span><span> : </span><span>00</span><span> : </span><span>{countdown}s</span>
                    </div>
                </div>
                <div className="space-y-4 w-full flex justify-center items-center max-w-[120px] mx-auto">
                    {children}
                </div>

                <div className="flex justify-between items-center my-4">
                    <button onClick={onClose} className="bg-[#D9A425] hover:bg-[#B3831D] w-full text-white text-md font-bold px-4 py-3 rounded-[10px] shadow-[0px_4px_6px_0px_#00000040] cursor-pointer">Apostar</button>
                </div>

            </div>
        </div>
    );
};

const BetButtons = ({ gameType, probabilities, handleToggle }: BetButtonsProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getProbabilityByTag = (tag: string): number => {
        if (!probabilities) return 0;
        const prob = probabilities.find(p => p.Tag === tag);
        return prob ? Math.round(prob.Value * 100) : 0;
    };



    const getHighLowProbabilities = () => ({
        lowPercentage: getProbabilityByTag('Low'),
        highPercentage: getProbabilityByTag('High')
    });

    const getRedBlackProbabilities = () => ({
        redPercentage: getProbabilityByTag('Red'),
        blackPercentage: getProbabilityByTag('Black')
    });

    const getEvenOddProbabilities = () => ({
        evenPercentage: getProbabilityByTag('Even'),
        oddPercentage: getProbabilityByTag('Odd')
    });

    const getDozenProbabilities = () => ({
        dozen1Percentage: getProbabilityByTag('FirstDozen'),
        dozen2Percentage: getProbabilityByTag('SecondDozen'),
        dozen3Percentage: getProbabilityByTag('ThirdDozen')
    });

    const getColumnProbabilities = () => ({
        column1Percentage: getProbabilityByTag('FirstColumn'),
        column2Percentage: getProbabilityByTag('SecondColumn'),
        column3Percentage: getProbabilityByTag('ThirdColumn')
    });

    const getVoisinsDuZeroProbabilities = () => ({
        voisinsDuZeroPercentage: getProbabilityByTag('VoisinsDuZero')
    })

    const getTiersDuCylindreProbabilities = () => ({
        tiersDuCylindrePercentage: getProbabilityByTag('TiersDuCylindre')
    })

    const getPlayZeroProbabilities = () => ({
        playZeroPercentage: getProbabilityByTag('PlayZero')
    })

    const getOrphelinsProbabilities = () => ({
        orphelinsPercentage: getProbabilityByTag('Orphelins')
    })

    const getStraightUpProbabilities = () => {
        return numbers.map(number => ({
            number: number.number,
            straightUpPercentage: getProbabilityByTag(`${number.number}`)
        }))
    }


    const renderButtons = () => {
        switch (gameType) {
            case 'HighAndLow':
                return <HighLowButtons {...getHighLowProbabilities()} handleToggle={handleToggle} />;
            case 'RedAndBlack':
                return <RedBlackButtons {...getRedBlackProbabilities()} handleToggle={handleToggle} />;
            case 'OddAndEven':
                return <EvenOddButtons {...getEvenOddProbabilities()} handleToggle={handleToggle} />;
            case 'Dozen':
                return <DozenButtons {...getDozenProbabilities()} handleToggle={handleToggle} />;
            case 'Column':
                return <ColumnButtons {...getColumnProbabilities()} handleToggle={handleToggle} />;
            case 'VoisinsDuZero':
                return <VoisinsDuZeroButtons {...getVoisinsDuZeroProbabilities()} handleToggle={handleToggle} />;
            case 'TiersDuCylindre':
                return <TiersDuCylindreButtons {...getTiersDuCylindreProbabilities()} handleToggle={handleToggle} />;
            case 'PlayZero':
                return <PlayZeroButtons {...getPlayZeroProbabilities()} handleToggle={handleToggle} />;
            case 'Orphelins':
                return <OrphelinsButtons {...getOrphelinsProbabilities()} handleToggle={handleToggle} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full">
            {gameType === 'StraightUp' ? (
                <>

                    <div className="hidden lg:block">
                        <StraightUpButtons probabilities={getStraightUpProbabilities()} handleToggle={handleToggle} />
                    </div>


                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#8D34F9] hover:bg-[#8D34F9]/80 w-full text-white text-md font-bold px-4 py-3 rounded-[10px] shadow-[0px_4px_6px_0px_#00000040] cursor-pointer"
                        >
                            Apostar
                        </button>

                        <BetModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                        >
                            <StraightUpButtons probabilities={getStraightUpProbabilities()} handleToggle={handleToggle} />
                        </BetModal>
                    </div>
                </>
            ) : (

                renderButtons()
            )}
        </div>
    )
}

export default BetButtons
