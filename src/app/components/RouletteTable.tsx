import chip1 from '../../assets/poker-chips/chip-1.png';
import chip5 from '../../assets/poker-chips/chip-2.png';
import chip10 from '../../assets/poker-chips/chip-3.png';
import chip20 from '../../assets/poker-chips/chip-4.png';
import chip25 from '../../assets/poker-chips/chip-5.png';
import chip100 from '../../assets/poker-chips/chip-6.png';

interface Bet {
    position: string;
    amount: number;
}

interface Props {
    selectedChip: number | null;
    onPlaceBet?: (position: string, amount: number) => void;
    bets?: Bet[];
}

const RouletteTable = ({ selectedChip, onPlaceBet, bets = [] }: Props) => {

    const getChipImage = (amount: number) => {
        const chipImages = {
            1: chip1,
            5: chip5,
            10: chip10,
            20: chip20,
            25: chip25,
            100: chip100,
        };
        return chipImages[amount as keyof typeof chipImages] || chip1;
    };

    const getNumberColor = (num: number) => {
        if (num === 0) return 'green';
        const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        return redNumbers.includes(num) ? 'red' : 'black';
    };

    const getNumberStyle = (num: number) => {
        const color = getNumberColor(num);
        if (color === 'green') return 'bg-green-800 text-white ';
        if (color === 'red') return 'bg-red-500 text-white';
        return 'bg-black text-white';
    };

    const generateNumberRows = () => {
        const rows: number[][] = [[], [], []];

        for (let i = 1; i <= 36; i++) {
            const rowIndex = (i - 1) % 3;
            rows[rowIndex].push(i);
        }

        return rows.reverse();
    };

    const numberRows = generateNumberRows();

    const handleCellClick = (position: string) => {
        if (!onPlaceBet) return;

        const existingBet = getBetForPosition(position);
        if (existingBet) {
            onPlaceBet(position, -existingBet.amount);
        } else if (selectedChip) {
            onPlaceBet(position, selectedChip);
        }
    };

    const getBetForPosition = (position: string) => {
        return bets.find(bet => bet.position === position);
    };

    const renderBetChip = (bet: Bet | undefined) => {
        if (!bet) return null;
        return (
            <div className="absolute w-10 h-10 xl:w-12 xl:h-12">
                <img
                    src={getChipImage(bet.amount)}
                    alt={`Ficha ${bet.amount}`}
                    className="w-full h-full object-contain"
                />
                <span className="absolute inset-0 flex items-center justify-center text-white text-[8px] sm:text-[10px] lg:text-xs xl:text-sm font-bold pointer-events-none">
                    {bet.amount}
                </span>
            </div>
        );
    };

    const getCellClassName = (baseClass: string, position: string) => {
        const hasBet = getBetForPosition(position);

        return `${baseClass} ${hasBet
            ? 'cursor-pointer hover:opacity-60'
            : selectedChip
                ? 'cursor-pointer hover:opacity-80'
                : 'cursor-default'
            }`;
    };

    return (
        <div className="bg-black p-4 font-bold text-center h-[750px] lg:h-full  lg:max-w-5xl mx-auto">
            <div className="bg-black border-4 p-2 transform rotate-90 md:rotate-0 origin-center scale-75 md:scale-100 transition-transform duration-300 ">
                <div className="flex border-4 w-[700px] md:w-full border-green-800">

                    <div className="flex flex-col">
                        <div
                            className={getCellClassName(
                                `relative w-full h-32 [writing-mode:vertical-rl] border-3 border-white flex items-center justify-center text-4xl font-bold ${getNumberStyle(0)}`,
                                '00'
                            )}
                            onClick={() => handleCellClick('00')}
                        >
                            00
                            {renderBetChip(getBetForPosition('00'))}
                        </div>
                        <div
                            className={getCellClassName(
                                `relative w-16 h-28 [writing-mode:vertical-rl] border-3 border-white flex items-center justify-center text-4xl font-bold ${getNumberStyle(0)}`,
                                '0'
                            )}
                            onClick={() => handleCellClick('0')}
                        >
                            0
                            {renderBetChip(getBetForPosition('0'))}
                        </div>
                    </div>

                    <div className="flex-1 h-full">
                        {numberRows.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex last:mb-0">
                                {row.map((num) => (
                                    <div
                                        key={num}
                                        className={getCellClassName(
                                            `relative w-full h-20 border-3 border-white flex items-center justify-center text-2xl font-bold ${getNumberStyle(num)}`,
                                            num.toString()
                                        )}
                                        onClick={() => handleCellClick(num.toString())}
                                    >
                                        {num}
                                        {renderBetChip(getBetForPosition(num.toString()))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col">
                        {['2a1', '2a1', '2a1'].map((label, index) => (
                            <div
                                key={index}
                                className={getCellClassName(
                                    `relative w-16 h-20 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white last:mb-0 [writing-mode:vertical-rl]`,
                                    `column-${index + 1}`
                                )}
                                onClick={() => handleCellClick(`column-${index + 1}`)}
                            >
                                {label}
                                {renderBetChip(getBetForPosition(`column-${index + 1}`))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex px-16  border-x-4 w-[700px] md:w-full ">
                    <div className="flex-1 flex">
                        <div
                            className={getCellClassName(
                                `relative flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white`,
                                'dozen-1'
                            )}
                            onClick={() => handleCellClick('dozen-1')}
                        >
                            1a DOCENA
                            {renderBetChip(getBetForPosition('dozen-1'))}
                        </div>
                        <div
                            className={getCellClassName(
                                `relative flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white`,
                                'dozen-2'
                            )}
                            onClick={() => handleCellClick('dozen-2')}
                        >
                            2a DOCENA
                            {renderBetChip(getBetForPosition('dozen-2'))}
                        </div>
                        <div
                            className={getCellClassName(
                                `relative flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white`,
                                'dozen-3'
                            )}
                            onClick={() => handleCellClick('dozen-3')}
                        >
                            3a DOCENA
                            {renderBetChip(getBetForPosition('dozen-3'))}
                        </div>
                    </div>
                </div>

                <div className="flex px-16 border-x-4  w-[700px] md:w-full border-t-0 ">
                    <div className="flex flex-1">
                        <div
                            className={getCellClassName(
                                `relative flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white`,
                                'low'
                            )}
                            onClick={() => handleCellClick('low')}
                        >
                            1 a 18
                            {renderBetChip(getBetForPosition('low'))}
                        </div>
                        <div
                            className={getCellClassName(
                                `relative flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white`,
                                'even'
                            )}
                            onClick={() => handleCellClick('even')}
                        >
                            PAR
                            {renderBetChip(getBetForPosition('even'))}
                        </div>
                        <div
                            className={getCellClassName(
                                `relative flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white`,
                                'red'
                            )}
                            onClick={() => handleCellClick('red')}
                        >
                            <div className="w-8 h-8 border-3 border-white bg-red-600 transform rotate-45"></div>
                            {renderBetChip(getBetForPosition('red'))}
                        </div>
                        <div
                            className={getCellClassName(
                                `relative flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white`,
                                'black'
                            )}
                            onClick={() => handleCellClick('black')}
                        >
                            <div className="w-8 h-8 border-3 border-white bg-black transform rotate-45"></div>
                            {renderBetChip(getBetForPosition('black'))}
                        </div>
                        <div
                            className={getCellClassName(
                                `relative flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white`,
                                'odd'
                            )}
                            onClick={() => handleCellClick('odd')}
                        >
                            IMPAR
                            {renderBetChip(getBetForPosition('odd'))}
                        </div>
                        <div
                            className={getCellClassName(
                                `relative flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white`,
                                'high'
                            )}
                            onClick={() => handleCellClick('high')}
                        >
                            19 a 36
                            {renderBetChip(getBetForPosition('high'))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RouletteTable;


