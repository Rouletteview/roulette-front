export default function RouletteTable() {
    // Definimos los colores para los números
    const getNumberColor = (number: number | string) => {
        if (number === 0 || number === '0') return 'bg-green-700';
        if ([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(Number(number))) {
            return 'bg-red-600';
        }
        return 'bg-black';
    };

    // Definimos el texto para los números (todos en blanco)
    const getTextColor = () => 'text-white';

    return (
        <div className="flex flex-col bg-black p-4 max-w-4xl mx-auto">
            {/* Tabla principal */}
            <div className="relative border-4 border-green-700 rounded">
                {/* Número cero */}
                <div className="absolute top-0 left-0 w-16 h-full bg-green-700 flex items-center justify-center text-white text-3xl font-bold border-r-4 border-green-700">
                    <div className="transform -rotate-90">00</div>
                </div>

                {/* Grid de números */}
                <div className="ml-16 grid grid-cols-13 gap-0">
                    {/* Primera fila de números */}
                    <div className="grid grid-cols-13 col-span-13">
                        <div className={`h-16 w-full ${getNumberColor(3)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>3</div>
                        <div className={`h-16 w-full ${getNumberColor(6)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>6</div>
                        <div className={`h-16 w-full ${getNumberColor(9)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>9</div>
                        <div className={`h-16 w-full ${getNumberColor(12)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>12</div>
                        <div className={`h-16 w-full ${getNumberColor(15)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>15</div>
                        <div className={`h-16 w-full ${getNumberColor(18)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>18</div>
                        <div className={`h-16 w-full ${getNumberColor(21)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>21</div>
                        <div className={`h-16 w-full ${getNumberColor(24)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>24</div>
                        <div className={`h-16 w-full ${getNumberColor(27)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>27</div>
                        <div className={`h-16 w-full ${getNumberColor(30)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>30</div>
                        <div className={`h-16 w-full ${getNumberColor(33)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>33</div>
                        <div className={`h-16 w-full ${getNumberColor(36)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>36</div>
                        <div className={`h-16 w-full bg-green-700 ${getTextColor()} flex items-center justify-center text-sm font-bold border border-white`}>2a1</div>
                    </div>

                    {/* Segunda fila de números */}
                    <div className="grid grid-cols-13 col-span-13">
                        <div className={`h-16 w-full ${getNumberColor(2)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>2</div>
                        <div className={`h-16 w-full ${getNumberColor(5)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>5</div>
                        <div className={`h-16 w-full ${getNumberColor(8)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>8</div>
                        <div className={`h-16 w-full ${getNumberColor(11)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>11</div>
                        <div className={`h-16 w-full ${getNumberColor(14)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>14</div>
                        <div className={`h-16 w-full ${getNumberColor(17)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>17</div>
                        <div className={`h-16 w-full ${getNumberColor(20)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>20</div>
                        <div className={`h-16 w-full ${getNumberColor(23)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>23</div>
                        <div className={`h-16 w-full ${getNumberColor(26)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>26</div>
                        <div className={`h-16 w-full ${getNumberColor(29)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>29</div>
                        <div className={`h-16 w-full ${getNumberColor(32)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>32</div>
                        <div className={`h-16 w-full ${getNumberColor(35)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>35</div>
                        <div className={`h-16 w-full bg-green-700 ${getTextColor()} flex items-center justify-center text-sm font-bold border border-white`}>2a1</div>
                    </div>

                    {/* Tercera fila de números */}
                    <div className="grid grid-cols-13 col-span-13">
                        <div className={`h-16 w-full ${getNumberColor(1)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>1</div>
                        <div className={`h-16 w-full ${getNumberColor(4)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>4</div>
                        <div className={`h-16 w-full ${getNumberColor(7)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>7</div>
                        <div className={`h-16 w-full ${getNumberColor(10)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>10</div>
                        <div className={`h-16 w-full ${getNumberColor(13)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>13</div>
                        <div className={`h-16 w-full ${getNumberColor(16)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>16</div>
                        <div className={`h-16 w-full ${getNumberColor(19)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>19</div>
                        <div className={`h-16 w-full ${getNumberColor(22)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>22</div>
                        <div className={`h-16 w-full ${getNumberColor(25)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>25</div>
                        <div className={`h-16 w-full ${getNumberColor(28)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>28</div>
                        <div className={`h-16 w-full ${getNumberColor(31)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>31</div>
                        <div className={`h-16 w-full ${getNumberColor(34)} ${getTextColor()} flex items-center justify-center text-2xl font-bold border border-white`}>34</div>
                        <div className={`h-16 w-full bg-green-700 ${getTextColor()} flex items-center justify-center text-sm font-bold border border-white`}>2a1</div>

                    </div>

                    {/* Sección de docenas */}
                    <div className="grid grid-cols-3 col-span-13 border-t-4 border-green-700">
                        <div className="h-16 col-span-1 bg-green-700 text-white flex items-center justify-center text-xl font-bold border border-white">
                            1ª DOCENA
                        </div>
                        <div className="h-16 col-span-1 bg-green-700 text-white flex items-center justify-center text-xl font-bold border border-white">
                            2ª DOCENA
                        </div>
                        <div className="h-16 col-span-1 bg-green-700 text-white flex items-center justify-center text-xl font-bold border border-white">
                            3ª DOCENA
                        </div>
                    </div>

                    {/* Sección de apuestas adicionales */}
                    <div className="grid grid-cols-6 col-span-13">
                        <div className="h-16 col-span-1 bg-green-700 text-white flex items-center justify-center text-lg font-bold border border-white">
                            1 a 18
                        </div>
                        <div className="h-16 col-span-1 bg-green-700 text-white flex items-center justify-center text-lg font-bold border border-white">
                            PAR
                        </div>
                        <div className="h-16 col-span-1 bg-green-700 flex items-center justify-center border border-white">
                            <div className="w-8 h-8 bg-red-600 transform rotate-45"></div>
                        </div>
                        <div className="h-16 col-span-1 bg-green-700 flex items-center justify-center border border-white">
                            <div className="w-8 h-8 bg-black transform rotate-45"></div>
                        </div>
                        <div className="h-16 col-span-1 bg-green-700 text-white flex items-center justify-center text-lg font-bold border border-white">
                            IMPAR
                        </div>
                        <div className="h-16 col-span-1 bg-green-700 text-white flex items-center justify-center text-lg font-bold border border-white">
                            19 a 36
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}