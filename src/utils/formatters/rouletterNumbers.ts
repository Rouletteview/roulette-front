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


        'Daily': ' Diario',
        'Weekly': ' Semanal',
        'Monthly': ' Mensual',
        'Annual': ' Anual',
        'default': tag
    };

    return translations[tag] || translations['default'];
};



export const isVoisinDuZero = (num: number): boolean => {
    const voisinsDuZeroNumbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36];
    return voisinsDuZeroNumbers.includes(num);
};

export const isOrphelins = (num: number): boolean => {
    const orphelinsNumbers = [1, 6, 9, 14, 17, 20, 31, 34];
    return orphelinsNumbers.includes(num);
};

export const isTiersDuCylindre = (num: number): boolean => {
    const tiersDuCylindreNumbers = [5, 8, 10, 11, 13, 16, 23, 24, 27, 30, 33, 36];
    return tiersDuCylindreNumbers.includes(num);
};

export const isPlayZero = (num: number): boolean => {
    return num === 0;
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
            'Zero': 0,
            'Odd': 1,
            'Even': 2
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
            'Dozen1': 1,
            'Dozen2': 2,
            'Dozen3': 3,
        };
        return dozenMap[tag] ?? 0;
    }


    if (gameType === 'Column') {
        const columnMap: Record<string, number> = {
            'Column1': 1,
            'Column2': 2,
            'Column3': 3,
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

        const num = parseInt(tag);
        if (isNaN(num)) return 0;
        return num;

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
        if (value === 0) return 'Zero';
        if (value === 1) return 'Even';
        if (value === 2) return 'Odd';
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


export const getYAxisTicks = (gameType?: string, chartType?: string): { value: number, label: string, color: string, lineWidth?: number, lineStyle?: number, lineHeight?: number }[] | null => {
    if (gameType === 'RedAndBlack') {

        if (chartType === 'VerticalColumn') {
            return [
                { value: 18, label: '', color: '#D9A425', lineWidth: 3, lineStyle: 1 },
            ];
        }

        return [
            { value: 1, label: translateRouletteTag('Black'), color: '#FFFFFF' },
            { value: 1.50, label: '', color: '#FFFFFF', lineWidth: 3, lineStyle: 1 },
            { value: 2, label: translateRouletteTag('Red'), color: '#FF0000' },
        ];
    }
    if (gameType === 'OddAndEven') {

        if (chartType === 'VerticalColumn') {
            return [
                { value: 18, label: '', color: '#D9A425', lineWidth: 3, lineStyle: 1 },
            ];
        }

        return [
            { value: 2, label: translateRouletteTag('Even'), color: '#FF0000', lineWidth: 2, lineStyle: 1 },
            { value: 1.50, label: '', color: '#FFFFFF', lineWidth: 3, lineStyle: 1 },
            { value: 1, label: translateRouletteTag('Odd'), color: '#FF0000', lineWidth: 2, lineStyle: 1 },
        ];
    }
    if (gameType === 'HighAndLow') {
        return [
            { value: 18, label: '', color: '#D9A425', lineWidth: 2, lineStyle: 1 },
            // { value: 0, label: translateRouletteTag('Low'), color: '#FF0000', lineWidth: 2, lineStyle: 1 },
            // { value: 0.50, label: '', color: '#FFFFFF', lineWidth: 3, lineStyle: 1 },
            // { value: 1, label: translateRouletteTag('High'), color: '#FF0000', lineWidth: 2, lineStyle: 1 },
        ];
    }
    if (gameType === 'Dozen') {
        return [

            { value: 12, label: '', color: '#D9A425', lineWidth: 2, lineStyle: 1 },

            { value: 24, label: '', color: '#D9A425', lineWidth: 2, lineStyle: 1 },

        ];
    }
    if (gameType === 'Column') {
        if (chartType === 'VerticalColumn') {
            return [
                { value: 12, label: '', color: '#D9A425', lineWidth: 2, lineStyle: 1 },
                { value: 24, label: '', color: '#D9A425', lineWidth: 2, lineStyle: 1 },
            ];
        }
        return [
            { value: 1, label: translateRouletteTag('FirstColumn'), color: '#D9A425' },
            { value: 2, label: translateRouletteTag('SecondColumn'), color: '#D9A425' },
            { value: 3, label: translateRouletteTag('ThirdColumn'), color: '#D9A425' },
        ];
    }
    if (gameType === 'StraightUp') {
        return [
            { value: 1, label: '1-12', color: '#D9A425' },
            { value: 13, label: '13-24', color: '#D9A425' },
            { value: 25, label: '25-36', color: '#D9A425' },
        ];
    }

    if (gameType === 'VoisinsDuZero') {
        return [
            { value: 18, label: '', color: '#D9A425', lineWidth: 2, lineStyle: 1 },

        ];
    }

    if (gameType === 'Orphelins') {
        if (chartType === 'VerticalColumn') {
            return [
                { value: 18, label: '', color: '#D9A425', lineWidth: 3, lineStyle: 1 },
            ];
        }
        
        return [
            { value: 1, label: 'Huerfanos', color: '#FF0000', lineWidth: 2, lineStyle: 1 },
            { value: 1.50, label: '', color: '#FFFFFF', lineWidth: 3, lineStyle: 1 },
            { value: 2, label: 'Otros', color: '#FF0000', lineWidth: 2, lineStyle: 1 },
        ];
    }

    if (gameType === 'TiersDuCylindre') {
        if (chartType === 'VerticalColumn') {
            return [
                { value: 18, label: '', color: '#D9A425', lineWidth: 3, lineStyle: 1 },
            ];
        }

        return [
            { value: 1, label: 'Tercios', color: '#FF0000', lineWidth: 2, lineStyle: 1 },
            { value: 1.50, label: '', color: '#FFFFFF', lineWidth: 3, lineStyle: 1 },
            { value: 2, label: 'Otros', color: '#FF0000', lineWidth: 2, lineStyle: 1 },
        ];
    }

    if (gameType === 'PlayZero') {
        if (chartType === 'VerticalColumn') {
            return [
                { value: 18, label: '', color: '#D9A425', lineWidth: 3, lineStyle: 1 },
            ];
        }

        return [
            { value: 1, label: 'Juego del Cero', color: '#FF0000', lineWidth: 2, lineStyle: 1 },
            { value: 1.50, label: '', color: '#FFFFFF', lineWidth: 3, lineStyle: 1 },
            { value: 2, label: 'Otros', color: '#FF0000', lineWidth: 2, lineStyle: 1 },
        ];
    }

    return []
};
