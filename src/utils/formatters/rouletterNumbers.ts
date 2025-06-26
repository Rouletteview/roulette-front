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
