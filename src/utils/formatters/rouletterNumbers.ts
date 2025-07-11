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

        'VoisinsDuZero': 'Vecinos del Cero',
        'Orphelins': 'Huerfanos',
        'TiersDuCylindre': 'Tercios',
        'PlayZero': 'Juego del Cero',
        'Other': 'Otros',

        '0': '0',
        '00': '00',


        'default': tag
    };

    return translations[tag] || translations['default'];
};


export const convertTagToNumber = (tag: string, gameType?: string): number => {

    if (gameType === 'RedAndBlack' || !gameType) {
        const redBlackMap: Record<string, number> = {
            'Red': 2,
            'Black': 1,
            'Green': 0,
            'Zero': 0
        };
        return redBlackMap[tag] ?? 0;
    }


    if (gameType === 'OddAndEven') {
        const oddEvenMap: Record<string, number> = {
            'Odd': 1,
            'Even': 0
        };
        return oddEvenMap[tag] ?? 0;
    }


    if (gameType === 'HighAndLow') {
        const highLowMap: Record<string, number> = {
            'High': 1,
            'Low': 0
        };
        return highLowMap[tag] ?? 0;
    }



    if (gameType === 'Dozen') {
        const dozenMap: Record<string, number> = {
            'FirstDozen': 1,
            'SecondDozen': 2,
            'ThirdDozen': 3,
        };
        return dozenMap[tag] ?? 0;
    }


    if (gameType === 'Column') {
        const columnMap: Record<string, number> = {
            'FirstColumn': 1,
            'SecondColumn': 2,
            'ThirdColumn': 3,
        };
        return columnMap[tag] ?? 0;
    }


    if (gameType === 'StraightUp') {
        const num = parseInt(tag);
        if (isNaN(num)) return 0;

 
        if (num >= 1 && num <= 12) return 1;
        if (num >= 13 && num <= 24) return 2;
        if (num >= 25 && num <= 36) return 3;
        return 0; 
    }

    if (gameType === 'VoisinsDuZero') {
      const voisinsDuZeroMap: Record<string, number> = {
        'VoisinsDuZero': 1,
        'Other': 2
      };
      return voisinsDuZeroMap[tag] ?? 0;
     
    }


    if (gameType === 'Orphelins') {
       const orphelinsMap: Record<string, number> = {
        'Orphelins': 1,
        'Other': 2
       };
       return orphelinsMap[tag] ?? 0;
    }

    if (gameType === 'TiersDuCylindre') {
        const tiersDuCylindreMap: Record<string, number> = {
            'TiersDuCylindre': 1,
            'Other': 2
        };
        return tiersDuCylindreMap[tag] ?? 0;
    }

    if (gameType === 'PlayZero') {
       const playZeroMap: Record<string, number> = {
        'PlayZero': 1,
        'Other': 2
       };
       return playZeroMap[tag] ?? 0;
    }

    const num = parseInt(tag);
    return isNaN(num) ? 0 : num;
};


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

    if (gameType === 'StraightUp') {
        return value.toString();
    }

    if (gameType === 'Orphelins') {
        return value.toString();
    }

    if (gameType === 'TiersDuCylindre') {
        return value.toString();
    }

    if (gameType === 'PlayZero') {
        return value.toString();
    }

 


    return value.toString();
};


export const getYAxisTicks = (gameType?: string): { value: number, label: string, color: string }[] => {
    if (gameType === 'RedAndBlack') {
        return [
            { value: 1, label: translateRouletteTag('Black'), color: '#FFFFFF' },
            { value: 2, label: translateRouletteTag('Red'), color: '#FF0000' },
            { value: 0, label: 'Cero', color: '#00FF00' },
        ];
    }
    if (gameType === 'OddAndEven') {
        return [
            { value: 0, label: translateRouletteTag('Even'), color: '#FFFFFF' },
            { value: 1, label: translateRouletteTag('Odd'), color: '#FF0000' },
        ];
    }
    if (gameType === 'HighAndLow') {
        return [
            { value: 0, label: translateRouletteTag('Low'), color: '#FFFFFF' },
            { value: 1, label: translateRouletteTag('High'), color: '#FF0000' },
        ];
    }
    if (gameType === 'Dozen') {
        return [
            { value: 1, label: translateRouletteTag('FirstDozen'), color: '#FFF' },
            { value: 2, label: translateRouletteTag('SecondDozen'), color: '#FFF' },
            { value: 3, label: translateRouletteTag('ThirdDozen'), color: '#FFF' },
        ];
    }
    if (gameType === 'Column') {
        return [
            { value: 1, label: translateRouletteTag('FirstColumn'), color: '#FFFFFF' },
            { value: 2, label: translateRouletteTag('SecondColumn'), color: '#FFFFFF' },
            { value: 3, label: translateRouletteTag('ThirdColumn'), color: '#FFFFFF' },
        ];
    }
    if (gameType === 'StraightUp') {
        return [
            { value: 1, label: '1-12', color: '#FFFFFF' },
            { value: 2, label: '14-24', color: '#FFFFFF' },
            { value: 3, label: '25-36', color: '#FFFFFF' },
        ];
    }

    if (gameType === 'VoisinsDuZero') {
        return [
            { value: 1, label: 'Vecinos del Cero', color: '#FFFFFF' },
            { value: 2, label: 'Otros', color: '#FFFFFF' },
        ];
    }

    if (gameType === 'Orphelins') {
        return [
            { value: 1, label: 'Huerfanos', color: '#FFFFFF' },
            { value: 2, label: 'Otros', color: '#FFFFFF' },
        ];
    }

    if (gameType === 'TiersDuCylindre') {
        return [
            { value: 1, label: 'Tercios', color: '#FFFFFF' },
            { value: 2, label: 'Otros', color: '#FFFFFF' },
        ];
    }

    if (gameType === 'PlayZero') {
        return [
            { value: 1, label: 'Juego del Cero', color: '#FFFFFF' },
            { value: 2, label: 'Otros', color: '#FFFFFF' },
        ];
    }

    return [
        { value: 0, label: '0', color: '#000000' },
        { value: 1, label: '1', color: '#000000' },
        { value: 2, label: '2', color: '#000000' },
    ];
};
