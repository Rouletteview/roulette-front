import { useMemo } from "react";

export type RouletteItem = {
    value: number;
    color: "red" | "white" | "green";
};

const redNumbers = [0, 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

const getColor = (num: number): RouletteItem["color"] => {
    if (num === 0) return "green";
    if (redNumbers.includes(num)) return "red";
    return "white";
};

type LastNumberData = {
    Number: number;
};

export const useRouletteNumbers = (lastNumbersData: LastNumberData | LastNumberData[]): RouletteItem[] => {

    return useMemo(() => {
        if (!lastNumbersData) return []
        const list = Array.isArray(lastNumbersData) ? lastNumbersData : [lastNumbersData];
        return list.map((item) => ({
            value: item.Number,
            color: getColor(item.Number),
        }));
    }, [lastNumbersData]);
};


export const translateRouletteTag = (tag: string): string => {
    const translations: Record<string, string> = {

        'Red': 'Rojo',
        'Black': 'Negro',
        'Green': 'Verde',
        'Zero': 'Cero',

        'Even': 'Par',
        'Odd': 'Impar',


        'Low': '1 a 18',
        'High': '19 a 36',


        'FirstDozen': '1a Docena',
        'SecondDozen': '2a Docena',
        'ThirdDozen': '3a Docena',
        'Dozen1': '1a Docena',
        'Dozen2': '2a Docena',
        'Dozen3': '3a Docena',


        'FirstColumn': '1a Columna',
        'SecondColumn': '2a Columna',
        'ThirdColumn': '3a Columna',
        'Column1': '1a Columna',
        'Column2': '2a Columna',
        'Column3': '3a Columna',

        '0': '0',
        '00': '00',

        'default': tag
    };

    return translations[tag] || translations['default'];
};

// Función para convertir tags a números para graficar
export const convertTagToNumber = (tag: string, gameType?: string): number => {
    // Mapeo para RedAndBlack
    // Ejemplo: Red -> 1, Black -> 0, Green/Zero -> 2
    if (gameType === 'RedAndBlack' || !gameType) {
        const redBlackMap: Record<string, number> = {
            'Red': 1,
            'Black': 0,
            'Green': 2,
            'Zero': 2
        };
        return redBlackMap[tag] ?? 0;
    }

    // Mapeo para OddAndEven
    // Ejemplo: Odd -> 1, Even -> 0
    if (gameType === 'OddAndEven') {
        const oddEvenMap: Record<string, number> = {
            'Odd': 1,
            'Even': 0
        };
        return oddEvenMap[tag] ?? 0;
    }

    // Mapeo para HighAndLow
    // Ejemplo: High -> 1, Low -> 0
    if (gameType === 'HighAndLow') {
        const highLowMap: Record<string, number> = {
            'High': 1,
            'Low': 0
        };
        return highLowMap[tag] ?? 0;
    }

    // Mapeo para Dozen
    // Ejemplo: FirstDozen -> 1, SecondDozen -> 2, ThirdDozen -> 3
    if (gameType === 'Dozen') {
        const dozenMap: Record<string, number> = {
            'FirstDozen': 1,
            'SecondDozen': 2,
            'ThirdDozen': 3,
            'Dozen1': 1,
            'Dozen2': 2,
            'Dozen3': 3
        };
        return dozenMap[tag] ?? 0;
    }

    // Mapeo para Column
    // Ejemplo: FirstColumn -> 1, SecondColumn -> 2, ThirdColumn -> 3
    if (gameType === 'Column') {
        const columnMap: Record<string, number> = {
            'FirstColumn': 1,
            'SecondColumn': 2,
            'ThirdColumn': 3,
            'Column1': 1,
            'Column2': 2,
            'Column3': 3
        };
        return columnMap[tag] ?? 0;
    }

    // Mapeo para StraightUp (números directos)
    // Ejemplo: "15" -> 15, "0" -> 0
    if (gameType === 'StraightUp') {
        const num = parseInt(tag);
        return isNaN(num) ? 0 : num;
    }

    // Mapeo para VoisinsDuZero (números directos)
    if (gameType === 'VoisinsDuZero') {
        const num = parseInt(tag);
        return isNaN(num) ? 0 : num;
    }

    // Mapeo para Orphelins (números directos)
    if (gameType === 'Orphelins') {
        const num = parseInt(tag);
        return isNaN(num) ? 0 : num;
    }

    // Mapeo para TiersDuCylindre (números directos)
    if (gameType === 'TiersDuCylindre') {
        const num = parseInt(tag);
        return isNaN(num) ? 0 : num;
    }

    // Mapeo para PlayZero (números directos)
    if (gameType === 'PlayZero') {
        const num = parseInt(tag);
        return isNaN(num) ? 0 : num;
    }

    // Por defecto, intentar convertir a número o retornar 0
    const num = parseInt(tag);
    return isNaN(num) ? 0 : num;
};

// Función inversa: de número a tag
export const numberToTag = (value: number, gameType?: string): string => {
    if (gameType === 'RedAndBlack') {
        if (value === 1) return 'Red';
        if (value === 0) return 'Black';
        if (value === 2) return 'Green';
    }
    if (gameType === 'OddAndEven') {
        if (value === 1) return 'Odd';
        if (value === 0) return 'Even';
    }
    if (gameType === 'HighAndLow') {
        if (value === 1) return 'High';
        if (value === 0) return 'Low';
    }
    if (gameType === 'Dozen') {
        if (value === 1) return 'FirstDozen';
        if (value === 2) return 'SecondDozen';
        if (value === 3) return 'ThirdDozen';
    }
    if (gameType === 'Column') {
        if (value === 1) return 'FirstColumn';
        if (value === 2) return 'SecondColumn';
        if (value === 3) return 'ThirdColumn';
    }
    // Para los demás, solo muestra el número
    return value.toString();
};

// Devuelve los valores posibles y sus tags traducidos para el eje Y
export const getYAxisTicks = (gameType?: string): { value: number, label: string }[] => {
    if (gameType === 'RedAndBlack') {
        return [
            { value: 0, label: translateRouletteTag('Black') },
            { value: 1, label: translateRouletteTag('Red') },
            { value: 2, label: translateRouletteTag('Green') },
        ];
    }
    if (gameType === 'OddAndEven') {
        return [
            { value: 0, label: translateRouletteTag('Even') },
            { value: 1, label: translateRouletteTag('Odd') },
        ];
    }
    if (gameType === 'HighAndLow') {
        return [
            { value: 0, label: translateRouletteTag('Low') },
            { value: 1, label: translateRouletteTag('High') },
        ];
    }
    if (gameType === 'Dozen') {
        return [
            { value: 1, label: translateRouletteTag('FirstDozen') },
            { value: 2, label: translateRouletteTag('SecondDozen') },
            { value: 3, label: translateRouletteTag('ThirdDozen') },
        ];
    }
    if (gameType === 'Column') {
        return [
            { value: 1, label: translateRouletteTag('FirstColumn') },
            { value: 2, label: translateRouletteTag('SecondColumn') },
            { value: 3, label: translateRouletteTag('ThirdColumn') },
        ];
    }
    // Para los demás, devolver un fallback básico en lugar de array vacío
    return [
        { value: 0, label: '0' },
        { value: 1, label: '1' },
        { value: 2, label: '2' },
    ];
};
