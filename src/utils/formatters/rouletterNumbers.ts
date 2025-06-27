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
