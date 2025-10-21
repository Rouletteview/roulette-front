import { RouletteItem } from "../../utils/formatters/rouletterNumbers";

interface Props {
    numbers: RouletteItem[];
    loading?: boolean;
}

const colorClasses = {
    red: "border-red-600 ",
    white: "border-white ",
    green: "border-green-600 ",
};

const placeholderColors = ['red', 'white', 'green', 'red', 'white', 'green', 'red', 'white', 'green', 'red', 'white', 'green', 'red', 'white'];

const NumbersDisplay = ({ numbers, loading }: Props) => {
    const lastNumbers = numbers;

    return (
        <div className="mb-4">
            <ul className="flex flex-wrap gap-2 bg-black/30 p-2 rounded">
                {loading
                    ? placeholderColors.map((color, i) => (
                        <li
                            key={i}
                            className={`w-8 h-8 lg:w-7 lg:h-7 rounded-full border-3 flex items-center justify-center font-medium text-white text-[10px] md:text-xs bg-gray-700 animate-pulse ${colorClasses[color as keyof typeof colorClasses]}`}
                        >
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                        </li>
                    ))
                    : lastNumbers.length === 0
                        ? placeholderColors.map((color, i) => (
                            <li
                                key={i}
                                className={`w-8 h-8 lg:w-7 lg:h-7 rounded-full border-3 flex items-center justify-center font-medium text-white text-[10px] md:text-xs bg-gray-600/50 ${colorClasses[color as keyof typeof colorClasses]}`}
                            >
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </li>
                        ))
                        : lastNumbers.map((item, i) => (
                            <li
                                key={i}
                                className={`w-8 h-8 lg:w-7 lg:h-7 rounded-full border-3 flex items-center justify-center font-medium text-white text-[10px] md:text-xs ${colorClasses[item.color]}`}
                            >
                                {item.value}
                            </li>
                        ))}
            </ul>
        </div>
    )
}

export default NumbersDisplay
