const RouletteTable = () => {

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

    return (
        <div className="bg-black p-4 font-bold text-center max-w-5xl mx-auto">
            <div className="bg-black border-4 p-2">

                <div className="flex border-4  border-green-800">

                    <div className="flex flex-col">
                        <div className={`w-16 h-32 [writing-mode:vertical-rl] border-3 border-white flex items-center justify-center text-4xl font-bold ${getNumberStyle(0)}`}>
                            00
                        </div>
                        <div className={`w-16 h-28 [writing-mode:vertical-rl] border-3 border-white flex items-center justify-center text-4xl font-bold ${getNumberStyle(0)}`}>
                            0
                        </div>
                    </div>

                    <div className="flex-1 h-full">
                        {numberRows.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex  last:mb-0">
                                {row.map((num) => (
                                    <div
                                        key={num}
                                        className={`w-full h-20 border-3 border-white flex items-center justify-center text-2xl font-bold ${getNumberStyle(num)}`}
                                    >
                                        {num}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>


                    <div className="flex flex-col ">
                        {['2a1', '2a1', '2a1'].map((label, index) => (
                            <div key={index} className="w-16 h-20 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white last:mb-0 [writing-mode:vertical-rl]">
                                {label}
                            </div>
                        ))}
                    </div>
                </div>


                <div className="flex mx-16 border-x-4 border-green-800">
                    <div className="flex-1 flex">
                        <div className="flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white">
                            1a DOCENA
                        </div>
                        <div className="flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white">
                            2a DOCENA
                        </div>
                        <div className="flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white">
                            3a DOCENA
                        </div>
                    </div>
                </div>


                <div className="flex mx-16 border-4 border-t-0 border-green-800">
                    <div className="flex flex-1">
                        <div className="flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white">
                            1 a 18
                        </div>
                        <div className="flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white">
                            PAR
                        </div>
                        <div className="flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white">
                            <div className="w-8 h-8 border-3 border-white bg-red-600 transform rotate-45"></div>
                        </div>
                        <div className="flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white">
                            <div className="w-8 h-8 border-3 border-white bg-black transform rotate-45"></div>
                        </div>
                        <div className="flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white">
                            IMPAR
                        </div>
                        <div className="flex-1 h-16 bg-green-800 border-3 border-white flex items-center justify-center text-2xl font-bold text-white">
                            19 a 36
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RouletteTable;


