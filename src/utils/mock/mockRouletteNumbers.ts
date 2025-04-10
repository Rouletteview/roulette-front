import { useEffect, useState } from "react";

type RouletteItem = {
    value: number;
    color: "red" | "white" | "green";
};

const redNumbers = [0, 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

const getRandomNumber = (): number => Math.floor(Math.random() * 37);

const getColor = (num: number): RouletteItem["color"] => {
    if (num === 0) return "green";
    if (redNumbers.includes(num)) return "red";
    return "white";
};

export const useRouletteNumbers = (count = 15): RouletteItem[] => {
    const [numbers, setNumbers] = useState<RouletteItem[]>([]);

    useEffect(() => {
        const generated = Array.from({ length: count }, () => {
            const value = getRandomNumber();
            return {
                value,
                color: getColor(value),
            };
        });
        setNumbers(generated);
    }, [count]);

    return numbers;
};
